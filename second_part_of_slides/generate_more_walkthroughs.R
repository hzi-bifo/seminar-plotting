# Synthetic teaching data. Base R; run from this directory.
set.seed(42)
blue <- '#287f91'
start <- function(name) { png(paste0('assets/',name,'.png'),1000,750,res=130); par(mar=c(5,5,3,2),las=1,bty='l') }
# Two distributions with the same mean but different shapes.
a <- rnorm(80,10,1.8); a <- a-mean(a)+10
b <- c(rnorm(40,6,0.8),rnorm(40,14,0.8)); b <- b-mean(b)+10
write.csv(data.frame(cell=1:160,condition=rep(c('A','B'),each=80),signal=c(a,b)), 'data/walkthrough-distribution.csv',row.names=FALSE)
j <- runif(160,-.13,.13)
for(k in 1:4) {
 start(paste0('distribution-step-',k))
 if(k==1) barplot(c(mean(a),mean(b)),names.arg=c('A','B'),ylim=c(0,18),col=blue,ylab='Reporter signal (a.u.)',xlab='Condition')
 if(k==2) boxplot(a,b,names=c('A','B'),ylim=c(0,18),col='grey90',ylab='Reporter signal (a.u.)',xlab='Condition')
 if(k>=3) {
  plot(NA,xlim=c(.5,2.5),ylim=c(0,18),xaxt='n',xlab='Condition',ylab='Reporter signal (a.u.)'); axis(1,1:2,c('A','B'))
  # Same bandwidth and width rule for both groups; trim to observed range.
  for(i in 1:2) { v <- list(a,b)[[i]]; d <- density(v,bw=.65,from=min(v),to=max(v)); w <- d$y*.95
   polygon(c(i-w,rev(i+w)),c(d$x,rev(d$x)),col='grey90',border='grey45') }
  if(k==4) { points(rep(1:2,each=80)+j,c(a,b),pch=19,cex=.7,col=adjustcolor(blue,.65)); segments(c(.8,1.8),c(median(a),median(b)),c(1.2,2.2),c(median(a),median(b)),lwd=2) }
 }
 dev.off()
}
# Paired participants: mixed response despite a lower overall mean.
before <- c(12,18,25,30,16,22,28,35)
after <- before+c(-7,3,-8,-9,2,-6,4,-11)
write.csv(data.frame(donor=1:8,before=before,after=after),'data/walkthrough-paired.csv',row.names=FALSE)
for(k in 1:4) {
 start(paste0('paired-step-',k))
 if(k==1) barplot(c(mean(before),mean(after)),names.arg=c('Before','After'),ylim=c(0,40),col=blue,ylab='Cytokine concentration (ng/mL)')
 if(k %in% c(2,3)) {
  plot(NA,xlim=c(.6,2.4),ylim=c(0,40),xaxt='n',xlab='',ylab='Cytokine concentration (ng/mL)');axis(1,1:2,c('Before','After'))
  if(k==3) segments(1,before,2,after,col='grey55',lwd=1.5)
  points(rep(1:2,each=8),c(before,after),pch=19,col=blue,cex=1.1)
 }
 if(k==4) { par(mar=c(5,6,3,2));plot(after-before,1:8,xlim=c(-12,6),ylim=c(.5,8.5),yaxt='n',xlab='Change: after − before (ng/mL)',ylab='',pch=19,col=blue,cex=1.2);axis(2,1:8,paste('Donor',1:8));abline(v=0,lty=2,col='grey50');segments(0,1:8,after-before,1:8,col=blue) }
 dev.off()
}
# Log2 fold changes relative to a reference; no row scaling at any stage.
m <- rbind(c(-2,-1.8,-2.3,1.8,2,2.3),c(-1,-.8,-1.2,1,1.4,1.1),c(2,2.5,2.2,-1.8,-2,-2.3),c(1.2,1,.8,-1.2,-.8,-1),c(-.2,.1,.3,0,-.1,.2),c(.4,.1,0,-.2,.2,-.1))
rownames(m)<-paste('Gene',LETTERS[1:6]);colnames(m)<-c('Control 1','Control 2','Control 3','Treated 1','Treated 2','Treated 3')
write.csv(m,'data/walkthrough-heatmap.csv',row.names=TRUE)
for(k in 1:4) {
 start(paste0('heatmap-step-',k));par(mar=c(7,6,3,7))
 order <- if(k<3)c(1,4,2,5,3,6) else 1:6
 cols <- if(k<3)c(1,4,2,5,3,6) else 1:6
 z<-m[order,cols]; pal<-if(k==1)rainbow(101) else colorRampPalette(c('#2166ac','white','#b2182b'))(101)
 plot(NA,xlim=c(.5,6.5),ylim=c(.5,6.5),axes=FALSE,xlab='',ylab='',xaxs='i',yaxs='i')
 for(i in 1:6)for(j in 1:6){ color<-pal[round((z[i,j]+3)/6*100)+1];rect(j-.5,6-i+.5,j+.5,6-i+1.5,col=color,border='white');if(k==4)text(j,7-i,sprintf('%.1f',z[i,j]),col=if(abs(z[i,j])>=1.8)'white' else 'black',cex=.9) }
 axis(1,1:6,colnames(z),las=2,tick=FALSE);axis(2,6:1,rownames(z),tick=FALSE)
 if(k>=3)abline(v=3.5,lwd=2)
 # Explicit colour key, fixed [-3,3] in every version.
 par(xpd=NA)
 for(j in 1:101)rect(6.8,.5+(j-1)*6/101,7.05,.5+j*6/101,col=pal[j],border=NA)
 text(7.2,c(.5,3.5,6.5),c('-3','0','3'),adj=0,cex=.85)
 mtext('log2 fold change',side=4,line=4,las=0)
 dev.off()
}
# Alternative after ordering: seven discrete bins, not seven new measurements.
start('heatmap-step-5');par(mar=c(7,6,3,10))
breaks <- c(-3,-2,-1,-.5,.5,1,2,3)
bincols <- colorRampPalette(c('#2166ac','white','#b2182b'))(7)
bins <- matrix(findInterval(m,breaks,rightmost.closed=TRUE),nrow=6)
plot(NA,xlim=c(.5,6.5),ylim=c(.5,6.5),axes=FALSE,xlab='',ylab='',xaxs='i',yaxs='i')
for(i in 1:6)for(j in 1:6)rect(j-.5,6-i+.5,j+.5,6-i+1.5,col=bincols[bins[i,j]],border='grey85')
axis(1,1:6,colnames(m),las=2,tick=FALSE);axis(2,6:1,rownames(m),tick=FALSE);abline(v=3.5,lwd=2)
par(xpd=NA)
labels <- c('[-3, -2)','[-2, -1)','[-1, -0.5)','[-0.5, 0.5)','[0.5, 1)','[1, 2)','[2, 3]')
for(j in 1:7){lo<-.5+(j-1)*6/7;rect(6.8,lo,7.1,lo+6/7,col=bincols[j],border='grey85');text(7.2,lo+3/7,labels[j],adj=0,cex=.8)}
text(6.8,6.9,'log2 fold change',adj=0,cex=.85)
dev.off()
