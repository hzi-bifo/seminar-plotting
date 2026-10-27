# Synthetic counted cells; same observations in absolute and relative displays.
m <- matrix(c(60,30,10,120,60,20,20,50,30,80,160,160),nrow=3)
rownames(m)<-c('T cells','B cells','Monocytes');colnames(m)<-paste('Sample',1:4)
write.csv(data.frame(sample=colnames(m),t(m),check.names=FALSE),'data/gallery-stacked-counts.csv',row.names=FALSE)
cols<-c('#287f91','#bd633e','#a6a6a6')
for(kind in c('absolute','relative')) {
 png(paste0('assets/gallery-stacked-',kind,'.png'),1100,780,res=130)
 par(mar=c(5,5,5,2),las=1,bty='l')
 vals<-if(kind=='absolute')m else sweep(m,2,colSums(m),'/')*100
 pos<-barplot(vals,col=cols,border='white',ylim=if(kind=='absolute')c(0,450) else c(0,112),ylab=if(kind=='absolute')'Cells counted in 1 mL' else 'Composition of counted cells (%)',xlab='',names.arg=colnames(m))
 legend('top',inset=c(0,-.13),legend=rownames(m),fill=cols,bty='n',horiz=TRUE,xpd=NA)
 text(pos,colSums(vals)+if(kind=='absolute')12 else 4,if(kind=='absolute')paste0('n = ',colSums(m)) else '100%',cex=.9)
 dev.off()
}
