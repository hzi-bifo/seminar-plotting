# Synthetic gene-list membership; Euler layout shows only non-empty combinations.
# The exact same exclusive intersection counts feed both displays.
centres<-rbind(c(-.55,.55),c(.55,.55),c(-.55,-.55),c(.55,-.55));radius<-1.1
xy<-expand.grid(x=seq(-1.7,1.7,length.out=241),y=seq(-1.7,1.7,length.out=241))
distances<-sapply(1:4,function(i)sqrt((xy$x-centres[i,1])^2+(xy$y-centres[i,2])^2))
member<-distances<radius;code<-as.vector(member %*% 2^(0:3));codes<-sort(unique(code[code>0]))
positions<-t(sapply(codes,function(k){idx<-which(code==k);margin<-apply(abs(distances[idx,,drop=FALSE]-radius),1,min);as.numeric(xy[idx[which.max(margin)],])}))
sets<-t(sapply(codes,function(k)as.integer(intToBits(k))[1:4]));counts<-c(24,18,11,21,9,14,7,16,8,13,6,5,10)[seq_along(codes)]
stopifnot(!anyNA(counts))
colnames(sets)<-c('Stress','Heat','Salt','Oxidative')
write.csv(data.frame(sets,genes=counts),'data/overlap-intersections.csv',row.names=FALSE)
cols<-c('#287f91','#bd633e','#789a43','#9974a9')
png('assets/overlap-complex.png',1100,850,res=130)
par(mar=c(3,3,3,3));plot(NA,xlim=c(-2,2),ylim=c(-2,2),asp=1,axes=FALSE,xlab='',ylab='')
for(i in 1:4)symbols(centres[i,1],centres[i,2],circles=radius,inches=FALSE,add=TRUE,bg=adjustcolor(cols[i],.17),fg=cols[i])
text(positions,labels=counts,cex=1.15)
text(c(-1.1,1.1,-1.1,1.1),c(1.85,1.85,-1.85,-1.85),colnames(sets),col=cols,font=2)
mtext('Numbers count genes in each exact region; areas are not proportional',side=1,line=1,cex=.85)
dev.off()
for(k in 1:2){
 png(paste0('assets/overlap-upset-',k,'.png'),1300,850,res=130)
 layout(matrix(1:2,2),heights=c(2,1.2));o<-order(counts,decreasing=TRUE);n<-length(o)
 par(mar=c(0,6,3,2),las=1,xaxs='i');barplot(counts[o],space=0,col=if(k==2)ifelse(rowSums(sets[o,,drop=FALSE])>1,'#287f91','grey75') else '#287f91',border='white',xaxt='n',ylab='Genes in exact intersection',xlim=c(0,n),ylim=c(0,28));text((1:n)-.5,counts[o]+1,counts[o],cex=.85)
 par(mar=c(3,6,1,2),las=1,xaxs='i');plot(NA,xlim=c(.5,n+.5),ylim=c(.5,4.5),axes=FALSE,xlab='',ylab='');axis(2,1:4,colnames(sets),tick=FALSE)
 for(j in 1:n){points(rep(j,4),1:4,pch=19,col='grey85');idx<-which(sets[o[j],]==1);if(length(idx)>1)segments(j,min(idx),j,max(idx),lwd=2);points(rep(j,length(idx)),idx,pch=19)}
 mtext(if(k==1)'Filled dots identify included lists; grey dots identify excluded lists' else 'Blue bars: membership in multiple lists; grey bars: one list only',side=1,line=1,cex=.85)
 dev.off()
}
