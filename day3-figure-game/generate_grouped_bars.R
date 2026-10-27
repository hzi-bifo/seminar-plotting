# Same synthetic cell counts as the stacked-bar examples.
d<-read.csv('data/gallery-stacked-counts.csv',check.names=FALSE)
m<-t(as.matrix(d[,-1]));colnames(m)<-d$sample
cols<-c('#287f91','#bd633e','#a6a6a6')
for(kind in c('absolute','relative')){
 png(paste0('assets/gallery-grouped-',kind,'.png'),1100,780,res=130)
 par(mar=c(5,5,5,2),las=1,bty='l')
 vals<-if(kind=='absolute')m else sweep(m,2,colSums(m),'/')*100
 barplot(vals,beside=TRUE,names.arg=colnames(m),col=cols,border=NA,ylim=if(kind=='absolute')c(0,180) else c(0,100),ylab=if(kind=='absolute')'Cells counted in 1 mL' else 'Composition of counted cells (%)',xlab='Sample')
 legend('top',inset=c(0,-.14),legend=c('T cells','B cells','Monocytes'),fill=cols,bty='n',horiz=TRUE,xpd=NA)
 dev.off()
}
