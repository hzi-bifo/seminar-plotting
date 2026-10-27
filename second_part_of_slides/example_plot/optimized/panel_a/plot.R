# Panel a: YL44 time course, group means of the supplied log10 values at the actual study days.
source(file.path(dirname(normalizePath(sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE)[1]))), "..", "theme.R"))
d <- read.csv(file.path(DATA, "panel_a", "dataset.csv"), check.names = FALSE)
stopifnot(nrow(d) == 243, setequal(unique(d$condition), GROUPS))
means <- aggregate(d[["log10 YL44"]], list(condition = d$condition, day = d$day), mean)
write.csv(means[order(means$condition, means$day), ], file.path(HERE, "group_means.csv"), row.names = FALSE)

open_panel(file.path(HERE, "figure.pdf"))
plot(NA, xlim = TH$limits$day, ylim = TH$limits$log10_YL44, axes = FALSE, xlab = "", ylab = "")
for (g in GROUPS) {                                   # fixed order = legend order
  s <- means[means$condition == g, ]; s <- s[order(s$day), ]
  lines(s$day, s$x, col = PAL[[g]], lwd = pt_lwd(TH$lw_pt$line))
  points(s$day, s$x, pch = PCH[[g]], bg = PAL[[g]], col = "black",
         cex = mm_cex(TH$marker_mm_timecourse), lwd = pt_lwd(TH$lw_pt$marker_edge))
}
axis_pt(1, TH$ticks$day); axis_pt(2, TH$ticks$log10_YL44, sprintf("%.1f", TH$ticks$log10_YL44))
axis_line(1); axis_line(2)
x_title("Study day"); y_title("YL44 abundance (log10)")
note("group means, n = 3 to 4 mice per group", 1, 11.98)
invisible(dev.off())
