# Synthetic sequencing counts, not absolute organism counts. Base R only.
set.seed(413)
ids<-sprintf('S%02d',1:12)
site<-rep(c('Root-associated','Bulk soil'),each=6)
depth<-c(2500,8000,4000,12000,3500,6500,10000,3000,7500,4500,11000,5500)
profiles<-rbind(c(.4,.25,.12,.08,.05,.04,.03,.03),c(.06,.08,.1,.12,.35,.2,.05,.04))
counts<-sapply(1:12,function(i){p<-profiles[if(i %in% c(5,6,7))if(i<=6)2 else 1 else if(i<=6)1 else 2,];p<-p*runif(8,.6,1.4);as.vector(rmultinom(1,depth[i],p))})
rownames(counts)<-paste('Taxon',LETTERS[1:8]);colnames(counts)<-ids
rel<-sweep(counts,2,colSums(counts),'/')
write.csv(data.frame(sample=ids,compartment=site,sequencing_reads=colSums(counts),t(counts),check.names=FALSE),'data/abundance-profiles.csv',row.names=FALSE)
# Bray-Curtis on relative abundance = sum(abs(p-q))/sum(p+q).
bc<-as.dist(outer(1:12,1:12,Vectorize(function(i,j)sum(abs(rel[,i]-rel[,j]))/sum(rel[,i]+rel[,j]))))
attr(bc,'Labels')<-ids
hc<-hclust(bc,method='average')
unordered<-c(8,2,10,5,1,12,4,7,3,11,6,9)
metadata<-order(site,ids)
within<-unlist(lapply(sort(unique(site)),function(g){idx<-which(site==g);idx[hclust(as.dist(as.matrix(bc)[idx,idx]),method='average')$order]}))
cols<-c('#287f91','#bd633e','#789a43','#9974a9','#d7ae45','#518a69','#b87791','#949494')
# Group identity is encoded by a labelled grey strip, not taxon colours.
sitecol<-ifelse(site=='Bulk soil','#dddddd','#666666')
for(k in 1:7){
 png(paste0('assets/abundance-step-',k,'.png'),1300,950,res=130)
 ord<-if(k<=3)unordered else if(k==4)metadata else if(k==6)within else hc$order
 if(k==5){layout(matrix(c(1,2),2,1),heights=c(1.2,3));par(mar=c(0,5,3,2),las=1,xaxs='i');plot(as.dendrogram(hc),leaflab='none',ylab='Bray–Curtis',main='Average-linkage clustering',axes=TRUE,xlim=c(.5,12.5))}
 par(mar=c(5,5,5,2),las=1,bty='l',xaxs='i')
 if(k<7){
 vals<-if(k==1)counts[,ord] else 100*rel[,ord]
 ymax<-if(k==1)max(colSums(counts))*1.05 else 100
 # space=0 aligns bars with dendrogram leaves at 1:12 (after shifting x limits).
 mids<-barplot(vals,col=cols,border=NA,space=0,xlim=c(0,12),ylim=c(0,ymax),names.arg=ids[ord],cex.names=.8,ylab=if(k==1)'Sequencing reads' else 'Relative read abundance (%)',xlab=if(k>=3)'' else 'Sample')
 abline(v=1:11,col='white',lwd=.6)
 legend('top',inset=c(0,-.2),legend=rownames(counts),fill=cols,bty='n',ncol=4,xpd=NA,cex=.8)
 if(k>=3){par(xpd=NA);rect(mids-.5,ymax*1.025,mids+.5,ymax*1.075,col=sitecol[ord],border='white');text(mids,ymax*1.05,ifelse(site[ord]=='Bulk soil','B','R'),col=ifelse(site[ord]=='Bulk soil','black','white'),cex=.65);mtext('Metadata strip: B = bulk soil; R = root-associated',side=1,line=3.4,cex=.8);par(xpd=FALSE)}
 } else {
 par(mar=c(5,7,5,7))
 plot(NA,xlim=c(.5,12.5),ylim=c(.5,8.5),axes=FALSE,xlab='',ylab='',xaxs='i',yaxs='i')
 pal<-colorRampPalette(c('white','#084081'))(101)
 for(i in 1:8)for(j in 1:12)rect(j-.5,8-i+.5,j+.5,8-i+1.5,col=pal[min(101,round(rel[i,ord[j]]*100/.6)+1)],border='grey90')
 axis(1,1:12,ids[ord],tick=FALSE,cex.axis=.8);axis(2,8:1,rownames(counts),tick=FALSE)
 par(xpd=NA);rect((1:12)-.5,8.7,(1:12)+.5,9.1,col=sitecol[ord],border='white');text(1:12,8.9,ifelse(site[ord]=='Bulk soil','B','R'),col=ifelse(site[ord]=='Bulk soil','black','white'),cex=.7)
 for(j in 1:101)rect(12.8,.5+(j-1)*8/101,13.1,.5+j*8/101,col=pal[j],border=NA)
 text(13.3,c(.5,4.5,8.5),c('0%','30%','60%'),adj=0,cex=.8)
 mtext('Read abundance; no row standardisation',side=3,line=3,cex=.85)
 mtext('Metadata strip: B = bulk soil; R = root-associated',side=1,line=3,cex=.8)
 }
 dev.off()
}
