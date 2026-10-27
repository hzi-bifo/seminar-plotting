# Original synthetic biology examples; base R, run in this directory.
blue<-'#287f91';orange<-'#bd633e';cols<-c(blue,orange,'#a6a6a6')
start<-function(name){png(paste0('assets/gallery-',name,'.png'),1000,750,res=130);par(mar=c(5,5,3,2),las=1,bty='l')}
v<-read.csv('data/gallery-fluorescence.csv')$fluorescence
for(k in 1:2){start(paste0('density-',k));den<-density(v,bw=if(k==1)2 else 6);plot(den,xlim=c(10,90),ylim=c(0,.045),main='',xlab='Protein fluorescence (a.u.)',ylab='Probability density',col=blue,lwd=3);rug(v,col=adjustcolor(blue,.25));dev.off()}
# Three components always sum to 100%. Coordinates are barycentric.
comp<-data.frame(sample=paste0('S',1:5),T_cells=c(60,20,30,45,15),B_cells=c(25,60,20,40,25),Monocytes=c(15,20,50,15,60))
write.csv(comp,'data/gallery-composition.csv',row.names=FALSE)
for(k in 1:2){start(paste0('ternary-',k));par(mar=c(3,3,3,3));h<-sqrt(3)/2;plot(NA,xlim=c(-.2,1.2),ylim=c(-.16,1.04),asp=1,axes=FALSE,xlab='',ylab='');polygon(c(0,1,.5),c(0,0,h),border='grey40')
 for(q in c(.25,.5,.75)){segments(q,0,(1+q)/2,(1-q)*h,col='grey85');segments(1-q,0,(1-q)/2,(1-q)*h,col='grey85');segments(q/2,q*h,1-q/2,q*h,col='grey85');text(q,-.035,paste0((1-q)*100,'%'),cex=.7);text(q/2-.055,q*h,paste0(q*100,'%'),cex=.7);text((1+q)/2+.05,(1-q)*h,paste0(q*100,'%'),cex=.7)}
 text(0,-.1,'T cells 100%',cex=.9);text(1,-.1,'B cells 100%',cex=.9);text(.5,h+.07,'Monocytes 100%',cex=.9)
 z<-if(k==1)comp[1,,drop=FALSE] else comp;x<-z$B_cells/100+.5*z$Monocytes/100;y<-h*z$Monocytes/100
 points(x,y,pch=19,col=blue,cex=1.5);text(x,y,z$sample,pos=3,cex=.85)
 if(k==1)mtext('S1: 60% T cells, 25% B cells, 15% monocytes',side=1,line=0,cex=.9)
 dev.off()}
# One mutually exclusive composition in two circular displays.
for(k in 1:2){start(paste0('circular-',k));par(mar=c(2,2,3,2));pie(c(60,25,15),labels=c('T cells\n60%','B cells\n25%','Monocytes\n15%'),col=cols,border='white',main='Composition of 100 classified cells',clockwise=TRUE);if(k==2){symbols(0,0,circles=.4,inches=FALSE,add=TRUE,bg='white',fg='white');text(0,0,'100\ncells')};dev.off()}
# Counts, not areas, encode set size.
for(k in 1:2){start(paste0('venn-',k));par(mar=c(2,2,3,2));plot(NA,xlim=c(0,10),ylim=c(0,7),asp=1,axes=FALSE,xlab='',ylab='');rect(.3,.3,9.7,6.5,border='grey65');symbols(c(3.8,6.2),c(3.5,3.5),circles=c(2,2),inches=FALSE,add=TRUE,bg=adjustcolor(c(blue,orange),.2),fg=c(blue,orange));text(c(2.8,5,7.2),3.5,if(k==1)c('40','20','30') else c('25','15','10'),cex=1.4);text(c(3,7),5.9,if(k==1)c('Marker A+','Marker B+') else c('Gene list A','Gene list B'));text(5,.8,if(k==1)'Neither: 10 cells' else 'Neither: 50 genes');title(if(k==1)'100 cells tested for two markers' else '100 genes tested in two comparisons');mtext('Region labels give counts; areas are not proportional',side=1,line=0,cex=.85);dev.off()}
write.csv(data.frame(example=c('markers','genes'),only_A=c(40,25),both=c(20,15),only_B=c(30,10),neither=c(10,50)),'data/gallery-sets.csv',row.names=FALSE)
# Two-stage Sankey: vertical thickness is count, shared scale at both ends.
for(k in 1:2){
 mat<-if(k==1)matrix(c(45,15,10,30),2,byrow=TRUE) else matrix(c(35,15,20,30),2,byrow=TRUE)
 left<-if(k==1)c('Low signal','High signal') else c('Blood','Tissue');right<-if(k==1)c('Low signal','High signal') else c('T cells','B cells')
 write.csv(data.frame(source=rep(left,each=2),target=rep(right,2),count=as.vector(t(mat))),paste0('data/gallery-flow-',k,'.csv'),row.names=FALSE)
 start(paste0('sankey-',k));par(mar=c(2,1,3,1));plot(NA,xlim=c(-.25,1.25),ylim=c(-12,125),axes=FALSE,xlab='',ylab='')
 lbase<-c(0,rowSums(mat)[1]+12);rbase<-c(0,colSums(mat)[1]+12);lo<-lbase;ro<-rbase
 xx<-seq(.12,.88,length.out=100);u<-(xx-.12)/.76;smooth<-3*u^2-2*u^3
 for(i in 1:2)for(j in 1:2){n<-mat[i,j];bot<-lo[i]+(ro[j]-lo[i])*smooth;polygon(c(xx,rev(xx)),c(bot,rev(bot+n)),col=adjustcolor(cols[i],.55),border=NA);text(if(i==1).25 else .75,bot[if(i==1)18 else 83]+n/2,n,cex=.9);lo[i]<-lo[i]+n;ro[j]<-ro[j]+n}
 for(i in 1:2){rect(.08,lbase[i],.12,lbase[i]+rowSums(mat)[i],col=cols[i],border=NA);rect(.88,rbase[i],.92,rbase[i]+colSums(mat)[i],col='grey50',border=NA);text(.06,lbase[i]+rowSums(mat)[i]/2,paste0(left[i],'\n',rowSums(mat)[i]),adj=1,cex=.85);text(.94,rbase[i]+colSums(mat)[i]/2,paste0(right[i],'\n',colSums(mat)[i]),adj=0,cex=.85)}
 text(c(.1,.9),120,if(k==1)c('Before','After') else c('Sample source','Cell type'),font=2)
 mtext(if(k==1)'Same 100 tracked cells; ribbons count transitions' else '100 classified cells; ribbons count category membership',side=1,line=0,cex=.85)
 dev.off()
}
