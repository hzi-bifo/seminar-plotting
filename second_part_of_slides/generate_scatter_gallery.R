# Synthetic teaching examples. Run from day3-figure-game.
set.seed(825)
blue <- '#287f91'; orange <- '#bd633e'
start <- function(name) {png(paste0('assets/gallery-scatter-',name,'.png'),1100,800,res=130);par(mar=c(5,5,3,2),bty='l',las=1)}
x <- c(2,3,4,5,6,7,8,9); y <- c(12,18,15,24,21,28,36,26)
write.csv(data.frame(culture=paste0('C',1:8),biomass_mg=x,enzyme_U=y),'data/gallery-scatter-small.csv',row.names=FALSE)
for(k in 1:3){start(paste0('small-',k));plot(x,y,xlim=c(1,10),ylim=c(0,45),pch=19,cex=1.3,col=blue,xlab='Culture biomass (mg)',ylab='Enzyme activity (U)');if(k==1)lines(x,y,col=blue,lwd=2);if(k==3){points(x[7],y[7],pch=21,cex=1.7,col=orange,lwd=2);text(4.8,42,'C7: high activity for its biomass',cex=.95);arrows(6.5,40,7.9,37,length=.08,col=orange)};dev.off()}
n<-40;xx<-rnorm(n,5,1);yy<-4*xx+rnorm(n,0,2);xx[40]<-6.5;yy[40]<-37
write.csv(data.frame(culture=paste0('C',1:n),biomass_mg=xx,enzyme_U=yy),'data/gallery-scatter-labels.csv',row.names=FALSE)
for(k in 1:2){start(paste0('labels-',k));plot(xx,yy,xlim=c(2,9),ylim=c(5,43),pch=19,col=blue,xlab='Culture biomass (mg)',ylab='Enzyme activity (U)');if(k==1)text(xx,yy,paste0('C',1:n),pos=3,cex=.9) else {text(xx[40]+.2,yy[40],'C40',adj=0,col=orange);points(xx[40],yy[40],pch=19,col=orange)};dev.off()}
# Hellinger distance: Euclidean distance between square-root proportions.
counts<-matrix(rpois(16*6,40),16,6);counts[1:8,1:2]<-counts[1:8,1:2]+50;counts[9:16,5:6]<-counts[9:16,5:6]+50
rownames(counts)<-paste0('S',1:16);colnames(counts)<-paste0('Taxon',1:6)
write.csv(counts,'data/gallery-pcoa-counts.csv')
h<-sqrt(counts/rowSums(counts));fit<-cmdscale(dist(h),k=2,eig=TRUE);pct<-100*fit$eig[1:2]/sum(fit$eig[fit$eig>0]);g<-rep(1:2,each=8)
write.csv(data.frame(sample=rownames(counts),habitat=rep(c('Root','Bulk soil'),each=8),fit$points),'data/gallery-pcoa-coordinates.csv',row.names=FALSE)
for(k in 1:2){start(paste0('pcoa-',k));plot(fit$points,asp=1,pch=if(k==1)19 else c(16,17)[g],col=if(k==1)blue else c(blue,orange)[g],cex=1.3,xlab=sprintf('PCoA 1 (%.1f%%)',pct[1]),ylab=sprintf('PCoA 2 (%.1f%%)',pct[2]));if(k==2)legend('topright',c('Root','Bulk soil'),pch=c(16,17),col=c(blue,orange),bty='n');mtext('Hellinger distance; 16 soil samples',side=3,cex=.9);dev.off()}
