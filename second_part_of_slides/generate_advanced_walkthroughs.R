# Synthetic bacterial growth, six independent cultures per condition.
# Repeated measurements belong to the same culture; base R only.
set.seed(204)
time <- c(0,2,4,6,8)
groups <- rep(c('Control','Treatment'),each=6)
y <- t(sapply(1:12,function(i) {
 base <- runif(1,.07,.12)
 base+c(0,.12,.32,.6,.85)*(if(i<=6)runif(1,.85,1.15) else runif(1,.45,.7))+c(0,rnorm(4,0,.025))
}))
d <- data.frame(culture=rep(1:12,each=5),condition=rep(groups,each=5),hour=rep(time,12),OD600=as.vector(t(y)))
write.csv(d,'data/advanced-growth.csv',row.names=FALSE)
colors <- c('#287f91','#bd633e'); gc <- rep(colors,each=6)
means <- sapply(1:2,function(g)colMeans(y[((g-1)*6+1):(g*6),]))
sds <- sapply(1:2,function(g)apply(y[((g-1)*6+1):(g*6),],2,sd))
baseplot <- function(title='')plot(NA,xlim=c(0,8),ylim=c(0,1.2),xlab='Time (hours)',ylab='Optical density (OD600)',main=title)
for(k in 1:7){
 png(paste0('assets/timecourse-step-',k,'.png'),1100,800,res=130)
 par(mar=c(5,5,4,2),las=1,bty='l')
 if(k>=6)par(mfrow=c(1,2),mar=c(5,4.5,4,1),oma=c(0,0,2,0))
 for(panel in seq_len(if(k>=6)2 else 1)) {
 baseplot(if(k>=6)c('Control','Treatment')[panel] else '')
 ids<-if(k>=6)((panel-1)*6+1):(panel*6) else 1:12
 if(k>=5)for(g in if(k>=6)panel else 1:2)polygon(c(time,rev(time)),c(means[,g]-sds[,g],rev(means[,g]+sds[,g])),col=adjustcolor(colors[g],.15),border=NA)
 for(i in ids)lines(time,y[i,],type='b',pch=if(k>=7)if(i<=6)16 else 17 else 16,cex=.6,col=if(k==1)rainbow(12)[i] else if(k>=3)adjustcolor(gc[i],.35) else gc[i],lwd=1)
 if(k>=4)for(g in if(k>=6)panel else 1:2)lines(time,means[,g],col=colors[g],lwd=3,lty=if(k>=7)g else 1)
 }
 if(k==1)legend('topleft',paste('Culture',1:12),col=rainbow(12),lty=1,bty='n',ncol=3,cex=.7)
 if(k %in% 2:5)legend('topleft',c('Control','Treatment'),col=colors,lty=1,lwd=2,bty='n')
 if(k>=5)mtext('Band: mean ± SD across 6 cultures per condition',side=3,outer=k>=6,line=if(k>=6)0 else 1,cex=.85)
 dev.off()
}
# Four complementary views of the same experiment. No panels removed.
final <- y[,5];change <- final-y[,1]
for(k in 1:8){
 png(paste0('assets/publication-step-',k,'.png'),width=1100,height=950,res=150)
 boxes <- if(k==8)list(c(0,1,.4,1),c(0,1/3,0,.4),c(1/3,2/3,0,.4),c(2/3,1,0,.4)) else if(k==1)list(c(0,.68,.48,1),c(.70,1,.55,.95),c(.05,.40,.02,.42),c(.48,.95,0,.45)) else if(k<5)list(c(0,.62,.5,1),c(.62,1,.5,1),c(0,.62,0,.5),c(.62,1,0,.5)) else list(c(0,.5,.5,1),c(.5,1,.5,1),c(0,.5,0,.5),c(.5,1,0,.5))
 for(p in 1:4){
  par(cex=if(k==8 && p>1).8 else .9)
  par(fig=boxes[[p]],new=p>1,mar=c(4.8,4.8,3,1),las=1,bty='l')
  col <- if(k>=3)colors else list(colors,c('#8b48a5','#509b40'),c('#bd633e','#287f91'),c('#426cbd','#b49536'))[[p]]
  title <- c('Growth over time','At 8 hours','Starting values','Change over 8 hours')[p]
  if(k==8 && p==4)title <- 'Change (0–8 h)'
  if(p==1){baseplot(title);for(i in 1:12)lines(time,y[i,],col=adjustcolor(col[if(i<=6)1 else 2],.3));for(g in 1:2)lines(time,means[,g],col=col[g],lwd=2,lty=g)}
  else {v<-list(NULL,final,y[,1],change)[[p]];plot(NA,xlim=c(.6,2.4),ylim=if(p==3 && k<7)c(0,.15) else c(0,1.2),xaxt='n',xlab='',ylab=if(p==4)'Change in OD600' else 'Optical density (OD600)',main=title);axis(1,1:2,c('Control','Treatment'));for(g in 1:2){idx<-((g-1)*6+1):(g*6);points(g+seq(-.12,.12,length.out=6),v[idx],pch=if(k>=3)c(16,17)[g] else 16,col=col[g]);segments(g-.2,mean(v[idx]),g+.2,mean(v[idx]),col=col[g],lwd=2)}}
  if(k<4 || p==1)legend(if(p==3)'bottomleft' else 'topleft',c('Control','Treatment'),col=col,lty=if(p==1)1:2 else c(0,0),pch=if(p==1)c(NA,NA) else if(k>=3)c(16,17) else c(16,16),bty='n',cex=.65)
  if(k>=6)mtext(LETTERS[p],side=3,line=if(k==8 && p>1)2.2 else 1,adj=0,font=2,cex=1.15)
 }
 dev.off()
}
