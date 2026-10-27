# Synthetic colony counts; the 3D display is deliberately decorative.
v<-c(42,38,35,31);labs<-c('Control','Low dose','Medium dose','High dose')
write.csv(data.frame(condition=labs,colonies=v),'data/perspective-bars.csv',row.names=FALSE)
blue<-'#287f91'
for(k in 1:2){
 png(paste0('assets/perspective-bars-',k,'.png'),1100,800,res=130)
 par(mar=c(5,5,3,2),las=1,bty='l')
 if(k==1){
  # Oblique projection: screen y includes both value and decorative depth.
  plot(NA,xlim=c(-.4,5.3),ylim=c(-12,66),axes=FALSE,xlab='',ylab='')
  dx<-.7;dy<-14
  polygon(c(.3,4.7,4.7+dx,.3+dx),c(0,0,dy,dy),col='grey94',border='grey65')
  for(t in seq(0,50,10)){segments(.2,t,.2+dx,t+dy,col='grey75');text(.05,t,t,adj=1,cex=.85)}
  segments(.2,0,.2,50);text(-.3,29,'Colony count',srt=90)
  # One value per category; depth has no data meaning.
  for(i in 4:1){dep<-(i-1)*.25;x<-i+dx*dep;y<-dy*dep;w<-.56;tx<-.22;ty<-4.4
   polygon(c(x-w/2,x+w/2,x+w/2+tx,x-w/2+tx),c(y+v[i],y+v[i],y+v[i]+ty,y+v[i]+ty),col='#62a1ad',border='white')
   polygon(c(x+w/2,x+w/2+tx,x+w/2+tx,x+w/2),c(y,y+ty,y+ty+v[i],y+v[i]),col='#19525d',border='white')
   rect(x-w/2,y,x+w/2,y+v[i],col=blue,border='white')
   segments(x,y-1,x,y-3,col='grey50');text(x,y-6,labs[i],cex=.85)
  }
 }else{barplot(v,names.arg=labs,col=blue,border=NA,ylim=c(0,50),ylab='Colony count',xlab='Condition')}
 dev.off()
}
