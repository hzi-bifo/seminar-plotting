# Matched less-clear / clearer versions; synthetic teaching data only.
# Run from day3-figure-game. Existing source CSVs are shared by both versions.
set.seed(1204)
blue <- '#287f91'; orange <- '#bd633e'; cols <- c(blue,orange,'#777777')
cy<-read.csv('data/gallery-dose.csv'); groups<-unique(cy$condition)
v<-read.csv('data/gallery-fluorescence.csv')$fluorescence
jit<-runif(nrow(cy),-.08,.08)
start<-function(id,k){png(sprintf('assets/repair-%s-%s.png',id,k),1100,800,res=130);par(mar=c(5,6,4,2),las=1,bty='l')}
render<-function(id,good){
 if(id=='line'){
  hours<-c(0,1,2,6,12);a<-c(2,3,4,9,12);b<-c(2,4,6,10,11)
  xx<-if(good)hours else seq_along(hours)
  plot(xx,a,type='b',ylim=c(0,15),xaxt='n',col=blue,pch=16,xlab='Time (hours)',ylab='Biomass (mg/L)',lwd=2);axis(1,xx,hours);lines(xx,b,type='b',col=orange,pch=17,lwd=2);legend('topleft',c('Culture A','Culture B'),col=cols[1:2],pch=c(16,17),lty=1,bty='n')
 }
 if(id=='histogram'){
  breaks<-seq(0,100,by=if(good)5 else 25)
  hist(v,breaks=breaks,col=blue,border='white',main='',xlim=c(0,100),xlab='Protein fluorescence (a.u.)',ylab='Cell count');rug(v,col=adjustcolor('black',.25))
 }
 if(id=='density'){
  bw<-if(good)4 else .3;d<-density(v,bw=bw,from=0,to=100)
  plot(d,main='',col=blue,lwd=2,xlab='Protein fluorescence (a.u.)',ylab='Probability density',ylim=c(0,.08));rug(v,col=adjustcolor(blue,.3));mtext(paste('Bandwidth:',bw,'a.u.'),side=3,line=1)
 }
 if(id=='ternary'){
  z<-read.csv('data/gallery-composition.csv');h<-sqrt(3)/2
  par(mar=c(3,3,3,3));plot(NA,xlim=c(-.2,1.2),ylim=c(-.18,1.04),asp=1,axes=FALSE,xlab='',ylab='');polygon(c(0,1,.5),c(0,0,h),border='grey40')
  if(good)for(q in c(.25,.5,.75)){segments(q,0,(1+q)/2,(1-q)*h,col='grey85');segments(1-q,0,(1-q)/2,(1-q)*h,col='grey85');segments(q/2,q*h,1-q/2,q*h,col='grey85');text(q,-.035,paste0((1-q)*100,'%'),cex=.7);text(q/2-.055,q*h,paste0(q*100,'%'),cex=.7);text((1+q)/2+.05,(1-q)*h,paste0(q*100,'%'),cex=.7)}
  text(0,-.11,if(good)'T cells 100%' else 'T cells');text(1,-.11,if(good)'B cells 100%' else 'B cells');text(.5,h+.07,if(good)'Monocytes 100%' else 'Monocytes')
  xx<-z$B_cells/100+.5*z$Monocytes/100;yy<-h*z$Monocytes/100;points(xx,yy,pch=19,col=blue);text(xx,yy,z$sample,pos=3,cex=.85)
 }
 if(id=='sankey'){
  mat<-matrix(c(45,15,10,30),2,byrow=TRUE);par(mar=c(2,1,3,1));plot(NA,xlim=c(-.25,1.25),ylim=c(-12,125),axes=FALSE,xlab='',ylab='')
  lb<-c(0,72);rb<-c(0,67);lo<-lb;ro<-rb;xx<-seq(.12,.88,length.out=100);u<-(xx-.12)/.76;s<-3*u^2-2*u^3
  for(i in 1:2)for(j in 1:2){n<-mat[i,j];bot<-lo[i]+(ro[j]-lo[i])*s;polygon(c(xx,rev(xx)),c(bot,rev(bot+n)),col=adjustcolor(cols[i],.55),border=NA);if(good)text(if(i==1).25 else .75,bot[if(i==1)18 else 83]+n/2,n);lo[i]<-lo[i]+n;ro[j]<-ro[j]+n}
  for(i in 1:2){rect(.08,lb[i],.12,lb[i]+rowSums(mat)[i],col=cols[i],border=NA);rect(.88,rb[i],.92,rb[i]+colSums(mat)[i],col='grey50',border=NA);text(.06,lb[i]+rowSums(mat)[i]/2,c('Low signal','High signal')[i],adj=1,cex=.85);text(.94,rb[i]+colSums(mat)[i]/2,c('Low signal','High signal')[i],adj=0,cex=.85)}
  text(c(.1,.9),120,c('Before','After'));if(good)mtext('Same 100 tracked cells; ribbon width = cell count',side=1,line=0,cex=.9)
 }
 if(id %in% c('stacked','grouped')){
  z<-matrix(c(60,30,10,120,60,20,20,50,30,80,160,160),3);percent<-sweep(z,2,colSums(z),'/')*100
  if(id=='stacked'){
   mid<-barplot(percent,col=cols,border='white',names.arg=paste('S',1:4),ylim=c(0,125),ylab='Cells (%)',xlab='Sample (1 mL each)',legend.text=c('T cells','B cells','Monocytes'),args.legend=list(x='top',horiz=TRUE,bty='n',cex=.8));if(good)text(mid,105,paste('n =',colSums(z)),cex=.9)
  }else{
   usecols<-if(good)cols else matrix(c(cols,cols[c(2,3,1)],cols[c(3,1,2)],cols),3)
   mid<-barplot(z,beside=TRUE,col=usecols,border='white',ylim=c(0,210),ylab='Cell count',names.arg=paste('S',1:4),xlab='Sample (1 mL each)');legend('top',c('T cells','B cells','Monocytes'),fill=cols,horiz=TRUE,bty='n',cex=.85)
  }
 }
 if(id=='radar'){
  r<-read.csv('data/gallery-radar.csv',row.names=1,check.names=FALSE);a<-seq(pi/2,pi/2+2*pi,length.out=6)[1:5]
  draw<-function(idx){plot(NA,xlim=c(-1.5,1.5),ylim=c(-1.4,1.4),asp=1,axes=FALSE,xlab='',ylab='');for(q in c(.25,.5,.75,1)){polygon(q*cos(a),q*sin(a),border='grey80');text(.07,q,paste0(q*100,'%'),cex=.65)};segments(0,0,cos(a),sin(a),col='grey80');text(1.22*cos(a),1.22*sin(a),colnames(r),cex=.8);for(i in idx)polygon(as.numeric(r[i,])/100*cos(a),as.numeric(r[i,])/100*sin(a),col=adjustcolor(cols[i],if(good).15 else .95),border=cols[i],lwd=2)}
  par(mar=c(2,1,3,1));if(good){par(mfrow=c(1,2));for(i in 1:2){draw(i);title(rownames(r)[i])}}else{draw(1:2);legend('bottom',rownames(r),fill=cols[1:2],horiz=TRUE,bty='n')}
 }
 if(id=='ecdf'){
  plot(NA,xlim=c(0,45),ylim=c(0,1),xlab='Cytokine concentration (ng/mL)',ylab='Fraction of samples at or below x')
  for(i in 1:3)lines(ecdf(cy$concentration[cy$condition==groups[i]]),col=cols[i],lty=if(good)i else 1,lwd=2)
  if(good)legend('bottomright',paste0(groups,' (n = 40)'),col=cols,lty=1:3,bty='n',cex=.9)
 }
 if(id=='ridgeline'){
  par(mar=c(5,8,3,2));plot(NA,xlim=c(0,45),ylim=c(.7,6),yaxt='n',xlab='Cytokine concentration (ng/mL)',ylab='');axis(2,1:3,groups,tick=FALSE)
  for(i in 3:1){den<-density(cy$concentration[cy$condition==groups[i]],bw=1,from=0,to=45);polygon(c(den$x,rev(den$x)),c(i+den$y*(if(good)4 else 20),rep(i,length(den$x))),col=adjustcolor(cols[i],.8),border=cols[i])}
  mtext('Same bandwidth; density height uses a common scale',side=3,line=.5,cex=.85)
 }
 if(id=='dot'){
  z<-read.csv('data/gallery-ranking.csv');o<-if(good)order(z$genes) else seq_len(nrow(z));par(mar=c(5,8,3,2));plot(z$genes[o],1:5,xlim=c(0,40),ylim=c(.5,5.5),yaxt='n',xlab='Number of annotated genes',ylab='',pch=19,col=blue,cex=1.4);axis(2,1:5,z$pathway[o],tick=FALSE)
 }
 if(id=='interval'){
  mn<-sapply(groups,function(g)mean(cy$concentration[cy$condition==g]));er<-sapply(groups,function(g){x<-cy$concentration[cy$condition==g];qt(.975,length(x)-1)*sd(x)/sqrt(length(x))})
  par(mar=c(5,8,4,2));plot(mn,1:3,xlim=c(0,18),ylim=c(.5,3.5),yaxt='n',xlab='Mean cytokine concentration (ng/mL)',ylab='',pch=19,col=blue);segments(mn-er,1:3,mn+er,1:3,col=blue,lwd=2);axis(2,1:3,groups,tick=FALSE);mtext(if(good)'Mean and 95% t CI; 40 independent samples per group' else 'Mean ± error',side=3,line=1,cex=.9)
 }
 if(id=='area'){
  z<-read.csv('data/gallery-area.csv');plot(NA,xlim=c(0,5),ylim=c(0,80),xlab='Time (hours)',ylab='Biomass (mg/L)');lo<-rep(0,6)
  for(i in 1:3){hi<-if(good)lo+z[[i+1]] else z[[i+1]];polygon(c(z$hour,rev(z$hour)),c(hi,rev(if(good)lo else rep(0,6))),col=cols[i],border='white');lo<-hi};legend('topleft',paste('Taxon',LETTERS[1:3]),fill=cols,bty='n')
 }
 if(id=='bubble'){
  z<-read.csv('data/gallery-bubble.csv');plot(NA,xlim=c(0,65),ylim=c(0,6),yaxt='n',xlab='Mean relative read abundance (%)',ylab='');axis(2,1:5,paste('Taxon',z$taxon),tick=FALSE);points(z$abundance,1:5,pch=21,bg=adjustcolor(blue,.5),col=blue,cex=sqrt(z$prevalence)/2);if(good){text(z$abundance+5,1:5,paste0(z$prevalence,'%'),adj=0);legend('bottomright',legend=paste0(c(10,40,95),'% samples'),pch=21,pt.bg=adjustcolor(blue,.5),pt.cex=sqrt(c(10,40,95))/2,col=blue,bty='n',cex=.8,y.intersp=2.5,x.intersp=3)}
 }
 if(id %in% c('volcano','ma')){
  z<-read.csv('data/gallery-gene-results.csv');select<-z$padj<.05 & abs(z$log2_difference)>=1;xx<-if(id=='volcano')z$log2_difference else z$mean_log2_expression;yy<-if(id=='volcano')-log10(z$padj) else z$log2_difference
  plot(xx,yy,pch=19,col=ifelse(select,blue,'grey75'),xlab=if(id=='volcano')'Mean log2 expression difference (treatment − control)' else 'Mean log2 expression',ylab=if(id=='volcano')'−log10(BH-adjusted p-value)' else 'Mean log2 expression difference')
  if(good){if(id=='volcano')abline(v=c(-1,1),h=-log10(.05),lty=2,col='grey60') else abline(h=c(-1,0,1),lty=c(2,1,2),col='grey60');mtext('Blue: BH-adjusted p < 0.05 and |difference| ≥ 1',side=3,line=1,cex=.85)}else mtext('Highlighted genes',side=3,line=1)
 }
 if(id=='correlation'){
  z<-as.matrix(read.csv('data/gallery-correlation.csv',row.names=1,check.names=FALSE));par(mar=c(5,6,3,7));pal<-colorRampPalette(c('#2166ac','white','#b2182b'))(101)
  plot(NA,xlim=c(.5,4.5),ylim=c(.5,4.5),axes=FALSE,xlab='',ylab='',xaxs='i',yaxs='i');for(i in 1:4)for(j in 1:4){rect(j-.5,4-i+.5,j+.5,4-i+1.5,col=pal[round((z[i,j]+1)*50)+1],border='white');if(good)text(j,5-i,sprintf('%.2f',z[i,j]),col=if(abs(z[i,j])>.65)'white' else 'black')};axis(1,1:4,colnames(z),tick=FALSE);axis(2,4:1,rownames(z),tick=FALSE)
  if(good){par(xpd=NA);for(j in 1:101)rect(4.7,.5+(j-1)*4/101,4.9,.5+j*4/101,col=pal[j],border=NA);text(5.05,c(.5,2.5,4.5),c('-1','0','1'),adj=0);mtext('Pearson r; six samples',side=3,line=.6,cex=.9)}
 }
 if(id=='network'){
  e<-read.csv('data/gallery-network.csv');edges<-cbind(match(e$from,LETTERS[1:6]),match(e$to,LETTERS[1:6]));xy<-if(good)rbind(c(-1,.5),c(-1,-.5),c(-.3,0),c(.3,0),c(1,.5),c(1,-.5)) else cbind(c(-1,1,0,-1,1,0),c(1,-1,.4,-1,1,-.4))
  par(mar=c(2,2,4,2));plot(xy,type='n',xlim=c(-1.4,1.4),ylim=c(-1.3,1.3),asp=1,axes=FALSE,xlab='',ylab='');segments(xy[edges[,1],1],xy[edges[,1],2],xy[edges[,2],1],xy[edges[,2],2],col='grey55',lwd=2);points(xy,pch=21,bg='white',col=blue,cex=4);text(xy,LETTERS[1:6]);mtext('Nodes: proteins; edges: undirected associations',side=3,line=.5,cex=.85)
 }
 if(id=='pca'){
  # Variance percentages recorded from the original gallery PCA fit.
  z<-read.csv('data/gallery-pca.csv');xy<-as.matrix(z[,2:3]);g<-rep(1:2,each=6)
  plot(xy,pch=if(good)c(16,17)[g] else 16,col=cols[g],cex=1.3,xlim=range(xy[,1])+c(-1,1),ylim=range(xy[,2])+c(-1,1),xlab=if(good)'PC1 (47.8% variance)' else 'PC1 score',ylab=if(good)'PC2 (7.7% variance)' else 'PC2 score');if(good){text(xy,labels=z$sample,pos=3,cex=.75);legend('top',inset=c(0,-.13),xpd=NA,horiz=TRUE,c('Control','Treatment'),pch=c(16,17),col=cols[1:2],bty='n',cex=.85)}
 }
 if(id=='survival'){
  z<-read.csv('data/gallery-survival.csv');fit<-survival::survfit(survival::Surv(time,germinated)~group,data=z,conf.type='log-log');plot(fit,col=cols[1:2],lty=1:2,lwd=2,conf.int=FALSE,mark.time=good,pch=3,xlim=c(0,16),ylim=c(0,1),xlab='Days since sowing',ylab='Probability of not yet germinating');legend('topright',c('Control','Treatment'),col=cols[1:2],lty=1:2,bty='n')
  if(good){for(g in unique(z$group)){sg<-survival::survfit(survival::Surv(time,germinated)~1,data=z[z$group==g,],conf.type='log-log');cc<-cols[match(g,c('Control','Treatment'))];lines(c(0,sg$time),c(1,sg$lower),type='s',lty=3,col=cc);lines(c(0,sg$time),c(1,sg$upper),type='s',lty=3,col=cc)};mtext('Crosses: censoring; dotted: pointwise 95% CI',side=3,line=1,cex=.85)}
 }
 if(id=='forest'){
  z<-read.csv('data/gallery-forest.csv');par(mar=c(5,8,4,2));plot(z$difference,1:4,xlim=c(-1.3,.6),ylim=c(.5,4.5),yaxt='n',pch=15,col=blue,xlab='Mean growth difference (treatment − control, mm/day)',ylab='');axis(2,1:4,z$experiment,tick=FALSE);if(good){segments(z$low,1:4,z$high,1:4,col=blue,lwd=2);abline(v=0,lty=2,col='grey50');mtext('Estimate and 95% normal-approximation interval',side=3,line=1,cex=.85)}
 }
 if(id=='blandaltman'){
  z<-read.csv('data/gallery-agreement.csv');av<-(z$method_A+z$method_B)/2;delta<-z$method_B-z$method_A;bias<-mean(delta);lim<-bias+c(-1,1)*1.96*sd(delta)
  plot(av,delta,pch=19,col=blue,xlab='Mean of methods A and B (ng/mL)',ylab='Difference: B − A (ng/mL)',ylim=c(-10,20));abline(h=0,col='grey80');if(good){abline(h=bias,lwd=2);abline(h=lim,lty=2);legend('topright',c(sprintf('Mean bias: %.1f',bias),sprintf('Limits of agreement: %.1f to %.1f',lim[1],lim[2])),lty=c(1,2),bty='n',cex=.85)}
 }
 if(id=='raincloud'){
  par(mar=c(5,8,3,2));plot(NA,xlim=c(0,45),ylim=c(.5,3.7),yaxt='n',xlab='Cytokine concentration (ng/mL)',ylab='');axis(2,1:3,groups,tick=FALSE)
  for(i in 1:3){idx<-cy$condition==groups[i];x<-cy$concentration[idx];den<-density(x,bw=1,from=min(x),to=max(x));offset<-if(good).08 else -.15;polygon(c(den$x,rev(den$x)),c(i+offset+den$y*2,rep(i+offset,length(den$x))),col=adjustcolor(cols[i],if(good).35 else .9),border=cols[i]);boxplot(x,at=i,horizontal=TRUE,add=TRUE,axes=FALSE,boxwex=if(good).08 else .3,col='white',outline=FALSE);points(x,i+if(good)-.25+jit[idx] else jit[idx],pch=19,cex=.7,col=cols[i])}
 }
 if(id=='genome'){
  z<-read.csv('data/gallery-genome.csv');layout(matrix(1:2,2),heights=c(1,1));for(i in 1:2){par(mar=c(4,6,2,2),las=1,xaxs='i');x<-z[[i+1]];plot(z$position,x,type='h',col=cols[i],ylim=c(0,if(good)65 else max(x)),xlim=c(1,1000),xlab='Position in example locus (bp)',ylab='Read depth',main=c('Control','Treatment')[i])}
 }
}
ids<-c('line','histogram','density','ternary','sankey','stacked','grouped','radar','ecdf','ridgeline','dot','interval','area','bubble','volcano','ma','correlation','network','pca','survival','forest','blandaltman','raincloud','genome')
for(id in ids)for(k in 1:2){start(id,k);render(id,k==2);dev.off()}
write.csv(data.frame(hour=c(0,1,2,6,12),culture_A=c(2,3,4,9,12),culture_B=c(2,4,6,10,11)),'data/repair-line.csv',row.names=FALSE)
