# Original synthetic teaching examples. Run from this directory with base R.
set.seed(120)
blue <- '#287f91'
start <- function(name){png(paste0('assets/',name,'.png'),1000,750,res=130);par(mar=c(5,5,3,2),las=1,bty='l')}
v <- c(rnorm(180,45,7),rnorm(60,68,5))
write.csv(data.frame(cell=seq_along(v),fluorescence=v),'data/gallery-fluorescence.csv',row.names=FALSE)
for(width in c(5,10)) {start(paste0('gallery-hist-',width));hist(v,breaks=seq(0,100,width),xlim=c(10,90),ylim=c(0,100),col=blue,border='white',main='',xlab='Protein fluorescence (a.u.)',ylab='Number of cells');dev.off()}
g <- rep(c('Control','Low dose','High dose'),each=40)
y <- c(rlnorm(40,2.4,.3),rlnorm(40,2.1,.35),rlnorm(40,1.8,.45))
write.csv(data.frame(sample=1:120,condition=g,concentration=y),'data/gallery-dose.csv',row.names=FALSE)
start('gallery-box');boxplot(split(y,factor(g,levels=unique(g))),col='grey90',ylim=c(0,45),xlab='Condition',ylab='Cytokine concentration (ng/mL)');stripchart(split(y,factor(g,levels=unique(g))),vertical=TRUE,method='jitter',jitter=.12,add=TRUE,pch=19,col=adjustcolor(blue,.6),cex=.6);dev.off()
start('gallery-violin');plot(NA,xlim=c(.5,3.5),ylim=c(0,45),xaxt='n',xlab='Condition',ylab='Cytokine concentration (ng/mL)');axis(1,1:3,unique(g))
for(i in 1:3){z<-y[((i-1)*40+1):(i*40)];d<-density(z,bw=1,from=min(z),to=max(z));w<-d$y*1.5;polygon(c(i-w,rev(i+w)),c(d$x,rev(d$x)),col='grey90',border='grey50');points(i+runif(40,-.12,.12),z,pch=19,col=adjustcolor(blue,.6),cex=.6)};dev.off()
