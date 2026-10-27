# ggplot2: default grey theme, oversized points, angled labels and yet another palette.
library(ggplot2)
args <- commandArgs(trailingOnly = FALSE)
here <- dirname(normalizePath(sub("^--file=", "", args[grepl("^--file=", args)][1])))
d <- read.csv(file.path(here, "dataset.csv"), check.names=FALSE)
d$condition <- factor(d$condition, levels=c("Control", "Ciprofloxacin", "Tetracyclin", "Vancomycin"))
p <- ggplot(d, aes(condition, .data[["log10 YL32"]], fill=condition)) +
  geom_boxplot(width=.6, linewidth=.35, outlier.shape=NA) +
  geom_point(position=position_jitter(width=.09, height=0, seed=31), size=2.7, shape=21, stroke=.7) +
  scale_fill_manual(values=c("#00bfc4", "#f8766d", "#c77cff", "#7cae00")) +
  labs(title="YL32 abundance", subtitle="Day 9 | 4 mice per group",
       x="Experimental condition", y="Bacterial abundance (log10)") +
  theme_gray(base_size=10) + theme(legend.position="none", axis.text.x=element_text(angle=28,hjust=1),
       plot.title=element_text(size=14, face="plain"))
ggsave(file.path(here,"figure.pdf"), p, width=4.8, height=4.1, device="pdf", useDingbats=FALSE)
ggsave(file.path(here,"figure.png"), p, width=4.8, height=4.1, dpi=200)
