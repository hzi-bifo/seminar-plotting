# Same-data biology comparisons. Base R only; run from this directory.
# All measurements are synthetic teaching data, not published findings.
blue<-'#287f91';orange<-'#bd633e'
start<-function(name,w=1000,h=650){png(paste0('assets/',name,'.png'),width=w,height=h,res=130);par(mar=c(4.5,5,3.5,2),las=1,bty='l',mgp=c(3,.8,0))}
finish<-function()dev.off()
# Two bacterial populations in the same units. Independent axes suggest a crossing.
bacteria<-data.frame(hour=0:5,species_A=c(300,400,500,600,700,800),species_B=c(6,8,10,12,14,16))
write.csv(bacteria,'data/bacterial-counts.csv',row.names=FALSE)
start('biology-dual-a');par(mar=c(4.5,5,3.5,5));plot(bacteria$hour,bacteria$species_A,type='b',pch=19,col=blue,lwd=2,ylim=c(0,1000),xlab='Hour',ylab='Species A (cells/mL)',main='Two bacterial populations');par(new=TRUE);plot(bacteria$hour,bacteria$species_B,type='b',pch=17,col=orange,lwd=2,ylim=c(5,17),axes=FALSE,xlab='',ylab='');axis(4,at=seq(5,17,3),col.axis=orange);mtext('Species B (cells/mL)',side=4,line=3,las=0,col=orange);legend('topleft',c('A: left axis','B: right axis'),col=c(blue,orange),lty=1,pch=c(19,17),bty='n');finish()
start('biology-dual-b');plot(bacteria$hour,bacteria$species_A,type='b',pch=19,col=blue,lwd=2,ylim=c(0,1000),xlab='Hour',ylab='Cell count (cells/mL)',main='Two bacterial populations');lines(bacteria$hour,bacteria$species_B,type='b',pch=17,col=orange,lwd=2);legend('topleft',c('Species A','Species B'),col=c(blue,orange),lty=1,pch=c(19,17),bty='n');finish()
# Biological overlapping categories, not a partition of cells.
markers<-data.frame(marker=c('Marker X','Marker Y','Marker Z'),positive=c(70,50,30));write.csv(markers,'data/cell-markers.csv',row.names=FALSE)
start('biology-markers-a');pie(markers$positive,labels=paste0(markers$marker,': ',markers$positive,'%'),col=c(blue,orange,'#a7a063'),main='Marker-positive cells');finish()
start('biology-markers-b');par(mar=c(4.5,7,3.5,2));barplot(rev(markers$positive),names.arg=rev(markers$marker),horiz=TRUE,col=blue,xlim=c(0,100),xlab='Positive cells (% of 100 cells)',main='Marker-positive cells');finish()
# A legitimate composition: ranking is difficult in many small sectors.
taxa<-data.frame(taxon=paste('Taxon',LETTERS[1:10]),percent=c(28,19,13,10,8,7,5,4,3,3));write.csv(taxa,'data/microbial-composition.csv',row.names=FALSE)
start('biology-taxa-a',1100,750);pie(taxa$percent,labels=paste0(taxa$taxon,': ',taxa$percent,'%'),col=hcl.colors(10,'Set 3'),main='Read composition of one microbiome sample');finish()
start('biology-taxa-b',1100,750);par(mar=c(4.5,7,3.5,3));pos<-barplot(rev(taxa$percent),names.arg=rev(taxa$taxon),horiz=TRUE,col=blue,xlim=c(0,32),xlab='Assigned reads (%)',main='Read composition of one microbiome sample');text(rev(taxa$percent)+.5,pos,paste0(rev(taxa$percent),'%'),adj=0);finish()
# Absolute and relative growth answer different biological questions.
growth<-data.frame(line=c('Line A','Line B','Line C'),before=c(100,500,1000),after=c(200,750,1200));write.csv(growth,'data/cell-growth.csv',row.names=FALSE)
start('biology-growth-a');barplot(t(as.matrix(growth[,c('before','after')])),beside=TRUE,names.arg=growth$line,col=c('#b8c2c7',blue),ylim=c(0,1450),ylab='Cell count',main='Three cell lines before and after culture');legend('topleft',c('Before','After'),fill=c('#b8c2c7',blue),bty='n',horiz=TRUE);finish()
start('biology-growth-b');pct<-(growth$after-growth$before)/growth$before*100;barplot(pct,names.arg=growth$line,col=blue,ylim=c(0,120),ylab='Increase from starting count (%)',main='Relative growth of three cell lines');finish()
# Paired cytokine values: same values as earlier water example, now explicit assay context.
p<-data.frame(sample=paste('Donor',1:4),before=c(12,18,25,30),after=c(8,12,19,24));write.csv(p,'data/cytokine-pairs.csv',row.names=FALSE)
start('biology-cytokines-a');barplot(c(mean(p$before),mean(p$after)),names.arg=c('Before','After'),col=c('#b8c2c7',blue),ylim=c(0,35),ylab='Cytokine concentration (ng/mL)',main='Four donors, before and after stimulation');finish()
start('biology-cytokines-b');par(mar=c(4.5,7,3.5,2));plot(NA,xlim=c(0,35),ylim=c(.5,4.5),yaxt='n',xlab='Cytokine concentration (ng/mL)',ylab='',main='Four donors, before and after stimulation');axis(2,1:4,rev(p$sample),tick=FALSE);segments(p$after,4:1,p$before,4:1,lwd=2,col='#b8c2c7');points(p$before,4:1,pch=1,cex=1.5);points(p$after,4:1,pch=19,cex=1.5,col=blue);legend('topright',c('Before','After'),pch=c(1,19),col=c('black',blue),horiz=TRUE,bty='n');finish()
