# Deliberately decorative perspective; identical counts in all three views.
v<-c(40,35,25);labs<-c('T cells','B cells','Monocytes');cols<-c('#287f91','#bd633e','#949494')
write.csv(data.frame(cell_type=labs,cells=v),'data/perspective-composition.csv',row.names=FALSE)
for(k in 1:3){
 png(paste0('assets/perspective-step-',k,'.png'),1100,800,res=130)
 par(mar=c(4,5,3,2),las=1,bty='l')
 if(k==1){
  plot(NA,xlim=c(-1.5,1.5),ylim=c(-1.25,1),asp=1,axes=FALSE,xlab='',ylab='')
  # Extrude the whole pie downwards; foreground sidewalls add apparent area.
  ends<-c(0,cumsum(v)/sum(v)*2*pi);rotation<-pi/2
  for(z in seq(-.3,0,length.out=60))for(i in 1:3){a<-seq(ends[i],ends[i+1],length.out=150)+rotation;polygon(c(0,cos(a)),c(z,.55*sin(a)+z),col=adjustcolor(cols[i],red.f=.65,green.f=.65,blue.f=.65),border=NA)}
  for(i in 1:3){a<-seq(ends[i],ends[i+1],length.out=150)+rotation;polygon(c(0,cos(a)),c(0,.55*sin(a)),col=cols[i],border='white')}
  mid<-(head(ends,-1)+tail(ends,-1))/2+rotation
  text(1.25*cos(mid),ifelse(sin(mid)<0,.85*sin(mid)-.25,.8*sin(mid)+.04),paste0(labs,'\n',v,'%'),cex=1)
 } else if(k==2){pie(v,labels=paste0(labs,'\n',v,'%'),col=cols,border='white',init.angle=90,clockwise=FALSE)} else {
  par(mar=c(5,8,3,2));pos<-barplot(rev(v),names.arg=rev(labs),horiz=TRUE,col=rev(cols),border=NA,xlim=c(0,50),xlab='Cells (% of 100 classified cells)');text(rev(v)+1,pos,paste0(rev(v),'%'),adj=0)
 }
 dev.off()
}
