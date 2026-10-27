# Panel c: day 9 YL32 box plot with every mouse; ggplot2 statistics and the fixed-seed jitter are unchanged.
source(file.path(dirname(normalizePath(sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE)[1]))), "..", "theme.R"))
suppressPackageStartupMessages(library(ggplot2))
d <- read.csv(file.path(DATA, "panel_c", "dataset.csv"), check.names = FALSE)
stopifnot(nrow(d) == 16)
d$condition <- factor(d$condition, levels = GROUPS)
# Full names on alternating lines (no rotation): the second and fourth label get a leading line break.
stagger <- setNames(ifelse(seq_along(GROUPS) %% 2 == 0, paste0("\n", GROUPS), GROUPS), GROUPS)
p <- ggplot(d, aes(condition, .data[["log10 YL32"]])) +
  geom_boxplot(aes(fill = condition), width = .6, linewidth = gg_lw(TH$lw_pt$box), outlier.shape = NA,
               median.linewidth = gg_lw(TH$lw_pt$median), colour = "black", alpha = .35) +
  geom_point(aes(fill = condition, shape = condition), position = position_jitter(width = .09, height = 0, seed = 31),
             size = gg_size(TH$marker_mm), stroke = gg_stroke(TH$lw_pt$marker_edge), colour = "black") +
  scale_fill_manual(values = PAL) + scale_shape_manual(values = PCH) +
  scale_x_discrete(labels = stagger) +
  scale_y_continuous(limits = TH$limits$log10_YL32, breaks = TH$ticks$log10_YL32, expand = c(0, 0)) +
  coord_cartesian(clip = "off") +
  annotate("text", x = 0.55, y = TH$limits$log10_YL32[2] - 0.08, label = "n = 4 mice per group", hjust = 0, vjust = 1,
           size = TH$size_pt$note / .pt, colour = TH$note_color, family = FONT) +
  labs(x = NULL, y = "YL32 abundance (log10)") + gg_theme() +
  theme(axis.text.x = element_text(vjust = 1, margin = margin(t = 1.1, unit = "mm")),
        axis.title.y = element_text(margin = margin(r = 1, unit = "mm")))   # 1 mm: see save_gg_panel
save_gg_panel(p, file.path(HERE, "figure.pdf"))
