# Synthetic single-cell teaching data; all versions use identical coordinates.
# Run from this directory with base R.
set.seed(87)
n <- 1600
x <- c(rnorm(1200, 45, 8), rnorm(400, 68, 6))
y <- 15 + .65*x + rnorm(n, 0, 7)
d <- data.frame(cell=seq_len(n), protein_A=x, protein_B=y)
write.csv(d, 'data/scatter-cells.csv', row.names=FALSE)
blue <- '#287f91'
scatter <- function(size, symbol, color) {
  par(mar=c(4.8,5,1.5,1), mgp=c(3,.8,0), las=1, bty='l')
  plot(x,y,xlim=c(10,95),ylim=c(10,90),xaxs='i',yaxs='i',
       xlab='Protein A fluorescence (a.u.)',ylab='Protein B fluorescence (a.u.)',
       pch=symbol,cex=size,col=color)
}
for (k in 1:5) {
  png(sprintf('assets/scatter-step-%d.png',k),width=1000,height=800,res=130)
  if (k==5) {
    layout(matrix(c(2,0,1,3),2,2,byrow=TRUE),widths=c(4,1),heights=c(1,4))
    scatter(.65,19,adjustcolor(blue,alpha.f=.15))
    hx <- hist(x,breaks=seq(10,95,5),plot=FALSE)
    par(mar=c(0,5,1,1),mgp=c(2,.6,0),las=1)
    plot(NA,xlim=c(10,95),ylim=c(0,max(hx$counts)*1.15),xaxs='i',yaxs='i',axes=FALSE,xlab='',ylab='')
    rect(head(hx$breaks,-1),0,tail(hx$breaks,-1),hx$counts,col='grey75',border='white')
    axis(2,at=c(0,200,400),cex.axis=.8);mtext('Cells',side=2,line=3,las=0,cex=.85)
    hy <- hist(y,breaks=seq(10,90,5),plot=FALSE)
    par(mar=c(4.8,0,1.5,1),mgp=c(2,.6,0),las=1)
    plot(NA,xlim=c(0,max(hy$counts)*1.15),ylim=c(10,90),xaxs='i',yaxs='i',axes=FALSE,xlab='',ylab='')
    rect(0,head(hy$breaks,-1),hy$counts,tail(hy$breaks,-1),col='grey75',border='white')
    axis(1,at=c(0,200,400),cex.axis=.8);mtext('Cells',side=1,line=2,cex=.85)
  } else {
    scatter(c(1.5,.65,.65,.65)[k],if(k==4)1 else 19,
            if(k==3)adjustcolor(blue,alpha.f=.15) else blue)
  }
  dev.off()
}
