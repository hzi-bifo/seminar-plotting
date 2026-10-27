# Base R: deliberately heavy lines, serif text, boxed axes and a separate legend.
args <- commandArgs(trailingOnly = FALSE)
here <- dirname(normalizePath(sub("^--file=", "", args[grepl("^--file=", args)][1])))
d <- read.csv(file.path(here, "dataset.csv"), check.names=FALSE)
draw <- function() {
  par(mar=c(4.4,4.6,3.2,1), family="serif", las=1, lwd=1.8)
  groups <- c("Control", "Ciprofloxacin", "Tetracyclin", "Vancomycin")
  colors <- c("#e53935", "#2962ff", "#23a34a", "#a323aa")
  plot(NA, xlim=c(0,79), ylim=c(8,13.1), xlab="Study day", ylab="YL44 abundance (log10)",
       main="Akkermansia abundance over time", cex.main=1.05, cex.lab=1.1)
  for(i in seq_along(groups)) {
    sub <- d[d$condition == groups[i], ]
    s <- aggregate(sub[["log10 YL44"]], list(day=sub$day), mean)
    lines(s$day, s$x, col=colors[i], lwd=c(3.5,2.5,4,2)[i], type="b", pch=15+i, cex=.65)
  }
  legend("topright", legend=groups, col=colors, pch=16:19, lwd=3, cex=.60, bty="o", ncol=2)
  mtext("Group means; 3-4 mice/group/day; repeated measurements", side=3, line=.25, cex=.60)
}
pdf(file.path(here, "figure.pdf"), width=5.5, height=3.8, useDingbats=FALSE)
draw()
dev.off()
png(file.path(here, "figure.png"), width=1100, height=760, res=200)
draw()
dev.off()
