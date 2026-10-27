# Panel e: YL44 SNP frequencies, 5 SNPs x 16 samples (4 mice x 4 days), values unchanged on the 0-1 scale.
source(file.path(dirname(normalizePath(sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE)[1]))), "..", "theme.R"))
d <- read.csv(file.path(DATA, "panel_e", "dataset.csv"))
stopifnot(nrow(d) == 80, all(d$value >= 0 & d$value <= 1))
snps <- unique(d$snp_id)                                           # supplied order: by genomic position
samples <- unique(d[, c("mouse_id", "day", "treatment_group")])
samples$treatment_group <- factor(samples$treatment_group, levels = GROUPS)
samples <- samples[order(samples$treatment_group, samples$day, samples$mouse_id), ]   # grouped by treatment, then day
m <- matrix(NA_real_, nrow = length(snps), ncol = nrow(samples))
for (i in seq_along(snps)) for (j in seq_len(nrow(samples)))
  m[i, j] <- d$value[d$snp_id == snps[i] & d$mouse_id == samples$mouse_id[j] & d$day == samples$day[j]]
stopifnot(!anyNA(m))
mat <- as.data.frame(m); names(mat) <- paste(samples$treatment_group, samples$day, sep = "_")
write.csv(cbind(snp_id = snps, mat), file.path(HERE, "heatmap_matrix.csv"), row.names = FALSE)

margins <- modifyList(TH$panel_mm, TH$panel_e_mm)
pw <- TH$panel_mm$width - margins$margin_left - margins$margin_right
ph <- TH$panel_mm$height - margins$margin_top - margins$margin_bottom
gap <- 1; n_blocks <- 4; per_block <- 4
cell_w <- (pw - gap * (n_blocks - 1)) / 16
strip_h <- 2; strip_gap <- 0.5
cell_h <- (ph - strip_h - strip_gap) / length(snps)
ramp <- seq_ramp(64)
col_of <- function(v) ramp[pmin(64, pmax(1, 1 + floor(v * 64)))]

open_panel(file.path(HERE, "figure.pdf"), margins)
plot(NA, xlim = c(0, pw), ylim = c(0, ph), axes = FALSE, xlab = "", ylab = "", asp = 1)
x_left <- function(j) (j - 1) * cell_w + ((j - 1) %/% per_block) * gap
for (j in seq_len(nrow(samples))) {
  g <- as.character(samples$treatment_group[j])
  x0 <- x_left(j)
  rect(x0, ph - strip_h, x0 + cell_w, ph, col = PAL[[g]], border = NA)
  for (i in seq_along(snps)) {
    y0 <- (length(snps) - i) * cell_h
    rect(x0, y0, x0 + cell_w, y0 + cell_h, col = col_of(m[i, j]), border = "white", lwd = pt_lwd(TH$lw_pt$cell_gap))
  }
  mtext(samples$day[j], side = 1, at = x0 + cell_w / 2, line = if (j %% 2 == 1) 0.2 else 1.1, cex = 1)
}
# Row labels (SNP ids as supplied), day axis title, treatment strip label.
for (i in seq_along(snps))
  mtext(snps[i], side = 2, at = (length(snps) - i + 0.5) * cell_h, line = 0.4, cex = TH$size_pt$snp_label / BASE_PT)
x_title("Study day", line = 2.16)        # below the two staggered label lines
mtext("Group", side = 2, at = ph - strip_h / 2, line = 0.4, cex = TH$size_pt$snp_label / BASE_PT)
# Horizontal colour bar centred in the bottom margin, below the day axis title: 0-1, the full range of a frequency.
bar_w <- 20; bar_h <- 2; bar_x <- (pw - bar_w) / 2; bar_y <- -11.5
for (k in 1:64) rect(bar_x + (k - 1) / 64 * bar_w, bar_y, bar_x + k / 64 * bar_w, bar_y + bar_h, col = ramp[k], border = NA, xpd = NA)
rect(bar_x, bar_y, bar_x + bar_w, bar_y + bar_h, border = "black", lwd = pt_lwd(TH$lw_pt$axis), xpd = NA)
for (t in TH$ticks$snp_frequency) {
  segments(bar_x + t * bar_w, bar_y, bar_x + t * bar_w, bar_y - 0.8, lwd = pt_lwd(TH$lw_pt$axis), xpd = NA)
  text(bar_x + t * bar_w, bar_y - 1.1, format(t), adj = c(0.5, 1), cex = 1, xpd = NA)
}
text(pw / 2, bar_y - 3.3, "SNP frequency", adj = c(0.5, 1), cex = TH$size_pt$axis_title / BASE_PT, xpd = NA)
invisible(dev.off())
