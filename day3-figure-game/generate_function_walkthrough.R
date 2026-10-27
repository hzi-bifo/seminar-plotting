# Original teaching examples: decoration and unnecessary encodings.
blue<-'#287f91';orange<-'#bd633e'
start<-function(id,k){png(sprintf('assets/%s-step-%d.png',id,k),1100,800,res=130);par(mar=c(5,5,3,2),las=1,bty='l')}
counts<-c(42,38,31,25);labels<-c('Control','Low dose','Medium dose','High dose')
write.csv(data.frame(condition=labels,colonies=counts),'data/decorative-bars.csv',row.names=FALSE)
for(k in 1:3){start('decoration',k);plot(NA,xlim=c(.4,4.6),ylim=c(0,50),xaxt='n',xlab='Condition',ylab='Colonies counted');axis(1,1:4,labels)
 abline(h=seq(0,50,10),col=if(k==1)'grey55' else 'grey90',lwd=if(k==1)1.5 else .7)
 for(i in 1:4){if(k==1){pal<-colorRampPalette(c('#08306b','#72c9d4','#fff7bc'))(100);for(j in 1:100)rect(i-.32,(j-1)*counts[i]/100,i+.32,j*counts[i]/100,col=pal[j],border=NA)}else rect(i-.32,0,i+.32,counts[i],col=if(k==3 && i!=4)'grey75' else blue,border=NA)}
 if(k==3)text(4,counts[4]+3,'25 colonies',cex=.95)
 dev.off()}
d<-read.csv('data/visual-emphasis.csv');set.seed(521);d$inoculum_uL<-sample(c(10,30,60,100),nrow(d),replace=TRUE)
write.csv(d,'data/encoding-overload.csv',row.names=FALSE)
condition<-match(d$condition,c('Control','Treatment'));cc<-c(blue,orange)[condition]
for(k in 1:3){start('overload',k);par(mar=c(5,5,5,2));plot(NA,xlim=if(k==3)c(0,110) else c(.06,.14),ylim=c(.4,1.4),xlab=if(k==3)'Inoculum volume (µL)' else 'Starting optical density (OD600)',ylab='Optical density at 8 hours (OD600)')
 points(if(k==3)d$inoculum_uL else d$starting_OD600,d$final_OD600,pch=if(k==1)c(16,17,15,18)[d$day] else c(16,17)[condition],cex=if(k==1)sqrt(d$inoculum_uL)/2.5 else 1.2,col=adjustcolor(cc,.8))
 legend('top',inset=c(0,-.13),legend=c('Control','Treatment'),col=c(blue,orange),pch=if(k==1)c(16,16) else c(16,17),bty='n',horiz=TRUE,xpd=NA)
 if(k==1){legend('bottomleft',paste('Day',1:4),pch=c(16,17,15,18),bty='n',ncol=2,cex=.75);legend('bottomright',paste(c(10,30,60,100),'µL'),pch=19,pt.cex=sqrt(c(10,30,60,100))/2.5,y.intersp=1.6,x.intersp=3.2,bty='n',cex=.75)}
 dev.off()}
