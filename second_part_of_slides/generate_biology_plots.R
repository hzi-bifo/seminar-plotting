# Original teaching data, inspired by cited visualization guidance.
# Run from this directory with base R: Rscript generate_biology_plots.R
cols<-c('#287f91','#c2683e','#785a98')
d<-data.frame(mouse=rep(c('Mouse 1','Mouse 2','Mouse 3'),each=4),signal=c(8,9,10,11,18,19,20,21,28,29,30,31))
write.csv(d,'data/cell-replicates.csv',row.names=FALSE)
for(v in c('a','b')){
 png(paste0('assets/biology-replicates-',v,'.png'),width=950,height=650,res=130)
 par(mar=c(4.5,5,4,1),las=1,bty='l',mgp=c(3,.8,0))
 plot(rep(1,12),d$signal,type='n',xlim=c(.6,1.4),ylim=c(0,38),xaxt='n',xlab='',ylab='Fluorescence (a.u.)',main='Twelve cells from three mice')
 axis(1,1,'Treated group')
 points(1+rep(c(-.06,-.02,.02,.06),3),d$signal,pch=if(v=='a')rep(19,12) else rep(c(16,17,15),each=4),col=if(v=='a')'#555555' else rep(cols,each=4),cex=1.3)
 if(v=='b')legend('topleft',legend=c('Mouse 1','Mouse 2','Mouse 3'),pch=c(16,17,15),col=cols,bty='n',cex=.9)
 dev.off()
}
z<-c(6,8,10,10,12,14);write.csv(data.frame(culture=1:6,protein=z),'data/error-bars.csv',row.names=FALSE)
for(v in c('a','b')){
 png(paste0('assets/biology-errors-',v,'.png'),width=950,height=650,res=130)
 par(mar=c(4.5,5,4,1),las=1,bty='l',mgp=c(3,.8,0))
 spread<-if(v=='a')sd(z)/sqrt(length(z)) else sd(z)
 plot(1,mean(z),xlim=c(.6,1.4),ylim=c(0,17),xaxt='n',xlab='',ylab='Protein abundance (a.u.)',pch=19,col='#287f91',cex=1.5,main=if(v=='a')'Mean ± standard error' else 'Mean ± standard deviation')
 axis(1,1,'Six independent cultures');arrows(1,mean(z)-spread,1,mean(z)+spread,angle=90,code=3,length=.12,lwd=2,col='#287f91')
 mtext('Same six measurements in both versions',side=3,line=.4,cex=.9)
 dev.off()
}
# Show every independent culture, including the two observations at 10.
png('assets/biology-errors-raw.png',width=950,height=650,res=130)
par(mar=c(4.5,5,4,1),las=1,bty='l',mgp=c(3,.8,0))
plot(1+c(-.07,.04,-.04,.06,-.01,.02),z,xlim=c(.6,1.4),ylim=c(0,17),xaxt='n',xlab='',ylab='Protein abundance (a.u.)',pch=19,col='#287f91',cex=1.4,main='All six cultures')
axis(1,1,'Six independent cultures')
segments(.85,mean(z),1.15,mean(z),lwd=2,col='grey35')
legend('topleft',legend=c('One culture','Mean = 10'),pch=c(19,NA),lty=c(NA,1),col=c('#287f91','grey35'),bty='n',cex=.9)
mtext('Horizontal jitter separates dots; abundance is unchanged',side=3,line=.4,cex=.85)
dev.off()
