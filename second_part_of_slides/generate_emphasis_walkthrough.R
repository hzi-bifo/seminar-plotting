# Synthetic independent cultures assayed on four consecutive experimental days.
# Cultures are not tracked from day to day; each assay lasts eight hours.
set.seed(302)
d <- expand.grid(replicate=1:6,condition=c('Control','Treatment'),day=1:4)
d$starting_OD600 <- round(runif(nrow(d),.07,.13),3)
d$final_OD600 <- round(.8+1.7*d$starting_OD600-.3*(d$condition=='Treatment')+.04*(d$day-1)+rnorm(nrow(d),0,.06),3)
write.csv(d,'data/visual-emphasis.csv',row.names=FALSE)
daycols <- c('#c51b7d','#4d9221','#e08214','#8073ac')
seqcols <- colorRampPalette(c('#a6c8df','#084081'))(101)
for(k in 1:6){
 png(paste0('assets/emphasis-step-',k,'.png'),1100,if(k==5)950 else 780,res=130)
 par(mar=c(5,5,3,if(k %in% c(3,6))7 else 2),las=1,bty='l')
 if(k==5)par(mfrow=c(2,2),mar=c(4.5,4.5,3,1))
 for(panel in seq_len(if(k==5)4 else 1)){
  z<-if(k==5)d[d$day==panel,] else d
  plot(NA,xlim=c(.06,.14),ylim=c(.4,1.4),xlab='Starting optical density (OD600)',ylab='Optical density at 8 hours (OD600)',main=if(k==5)paste('Day',panel) else '')
  cols<-if(k==1)daycols[z$day] else if(k %in% c(3,6))seqcols[round((z$day-1)/3*100)+1] else if(k==4)c('#888888','#bd633e')[as.integer(z$condition)] else c('#287f91','#bd633e')[as.integer(z$condition)]
  shapes<-if(k %in% c(1,3,4,5,6))c(16,17)[as.integer(z$condition)] else 16
  points(z$starting_OD600,z$final_OD600,col=cols,pch=shapes,cex=if(k==5)1 else 1.3)
  if(k==1){legend('bottomleft',paste('Day',1:4),col=daycols,pch=16,bty='n',ncol=2);legend('bottomright',c('Control','Treatment'),pch=c(16,17),bty='n')}
  else if(k %in% c(3,6)){
   legend('bottomleft',c('Control','Treatment'),pch=c(16,17),bty='n')
   par(xpd=NA)
   for(j in 1:101)rect(.143,.5+(j-1)*.7/101,.146,.5+j*.7/101,col=seqcols[j],border=NA)
   text(.148,.5+(0:3)*.7/3,paste('Day',1:4),adj=0,cex=.85)
   par(xpd=FALSE)
  } else {legend('bottomleft',c('Control','Treatment'),col=if(k==4)c('#888888','#bd633e') else c('#287f91','#bd633e'),pch=if(k %in% c(4,5))c(16,17) else c(16,16),bty='n',cex=.85)}
 }
 dev.off()
}
# Summarise across days without implying that independent cultures are paired.
png('assets/emphasis-step-7.png',1100,780,res=130)
par(mar=c(5,5,3,2),las=1,bty='l')
plot(NA,xlim=c(.7,4.3),ylim=c(.4,1.4),xaxt='n',xlab='Experimental day',ylab='Optical density at 8 hours (OD600)')
axis(1,1:4,paste('Day',1:4))
for(g in 1:2){
 z<-d[d$condition==c('Control','Treatment')[g],]
 col<-c('#287f91','#bd633e')[g]
 points(z$day+rep(seq(-.09,.09,length.out=6),4),z$final_OD600,pch=c(16,17)[g],col=adjustcolor(col,.35),cex=.9)
 mn<-tapply(z$final_OD600,z$day,mean)
 lines(1:4,mn,type='b',pch=c(16,17)[g],col=col,lwd=2.5,cex=1.4,lty=g)
}
legend('topleft',c('Control mean','Treatment mean'),col=c('#287f91','#bd633e'),pch=c(16,17),lty=1:2,lwd=2,bty='n')
mtext('Faint points: individual cultures; lines connect group means only',side=3,line=.5,cex=.9)
dev.off()
# Ordered small multiples: one row, identical scales, one labelled y-axis.
png('assets/emphasis-step-8.png',width=1600,height=650,res=130)
par(mfrow=c(1,4),oma=c(4,5,2,1),mar=c(2,1,3,1),las=1,bty='l')
for(day in 1:4){
 z<-d[d$day==day,]
 plot(NA,xlim=c(.06,.14),ylim=c(.4,1.4),xaxt='n',yaxt='n',xlab='',ylab='',main=paste('Day',day))
 axis(1,at=c(.06,.1,.14),labels=c('0.06','0.10','0.14'))
 if(day==1)axis(2,at=seq(.4,1.4,.2))
 abline(h=seq(.4,1.4,.2),col='grey92',lwd=.7)
 points(z$starting_OD600,z$final_OD600,pch=c(16,17)[as.integer(z$condition)],col=c('#287f91','#bd633e')[as.integer(z$condition)],cex=1.25)
 if(day==1)legend('bottomleft',c('Control','Treatment'),col=c('#287f91','#bd633e'),pch=c(16,17),bty='n',cex=.85)
}
mtext('Starting optical density (OD600)',side=1,outer=TRUE,line=1.5)
mtext('Optical density at 8 hours (OD600)',side=2,outer=TRUE,line=2.5,las=0)
dev.off()
