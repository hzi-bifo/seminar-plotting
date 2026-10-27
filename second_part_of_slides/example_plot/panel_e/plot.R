# Day 2 SNP heatmap: rainbow scale, small labels and samples interleaved by day.
args <- commandArgs(trailingOnly = FALSE)
here <- dirname(normalizePath(sub("^--file=", "", args[grepl("^--file=", args)][1])))
d <- read.csv(file.path(here, "dataset.csv"))
snps <- unique(d$snp_id)
samples <- unique(d[,c("mouse_id","day","treatment_group")])
samples <- samples[order(samples$day, samples$mouse_id), ]
m <- matrix(NA_real_, nrow=length(snps), ncol=nrow(samples))
for(i in seq_along(snps)) for(j in seq_len(nrow(samples)))
  m[i,j] <- d$value[d$snp_id==snps[i] & d$mouse_id==samples$mouse_id[j] & d$day==samples$day[j]]
short <- c("Control"="C", "Ciprofloxacin"="Ci", "Tetracyclin"="T", "Vancomycin"="V")
sample_labels <- paste0(short[samples$treatment_group], "/", samples$day)
draw <- function() {
  layout(matrix(c(1,2), nrow=1), widths=c(5,1))
  par(mar=c(4.5,5.3,3.1,.6), family="sans", las=1)
  colors <- rev(rainbow(40, start=0, end=.7))
  image(seq_len(nrow(samples)), seq_along(snps), t(m), col=colors, zlim=c(0,1),
        axes=FALSE, xlab="", ylab="", main="YL44 SNP frequencies", cex.main=.9)
  axis(1, at=seq_len(nrow(samples)), labels=sample_labels, las=2, cex.axis=.55, tick=FALSE)
  axis(2, at=seq_along(snps), labels=snps, cex.axis=.55, tick=FALSE)
  abline(v=seq(.5,16.5,1), h=seq(.5,5.5,1), col="white", lwd=1.2)
  mtext("C: control; Ci: cipro; T: tetra; V: vanco / day", 1, line=2.7, cex=.48)
  mtext("1 mouse/group, measured on 4 days", 1, line=3.5, cex=.52)
  par(mar=c(4.5,.3,3.1,2.6))
  image(1, seq(0,1,length.out=40), matrix(seq(0,1,length.out=40),nrow=1),
        col=colors, zlim=c(0,1), axes=FALSE, xlab="", ylab="")
  axis(4, at=c(0,.5,1), cex.axis=.65, las=1)
  mtext("SNP frequency", 4, line=1.65, cex=.6, las=0)
}
pdf(file.path(here,"figure.pdf"), width=5, height=3.6, useDingbats=FALSE)
draw()
dev.off()
png(file.path(here,"figure.png"), width=1000, height=720, res=200)
draw()
dev.off()
