# Standalone additions. Run in this directory: Rscript generate_good_plots.R
# Reproducible synthetic data; no downloads or external packages.
dir.create('assets',showWarnings=FALSE);dir.create('data',showWarnings=FALSE)
blue <- '#236d82'; orange <- '#bd542e'; gray <- '#c9cfd2'; ink <- '#202c32'
start <- function(name,w=1100,h=700){png(paste0('assets/',name,'.png'),width=w,height=h,res=140);par(mar=c(4.5,5,4,2),mgp=c(2.8,.7,0),las=1,bty='n',col=ink,col.axis=ink,col.lab=ink,family='sans')}
end <- function()dev.off()
heading <- function(title,sub){title(main=title,adj=0,cex.main=1.25);mtext(sub,side=3,line=.6,adj=0,cex=.9,col='#555555')}
# Ranked bars, direct labels, restrained emphasis.
d <- data.frame(condition=c('Control','Low dose','Medium dose','High dose'),count=c(12,20,31,24));write.csv(d,'data/good-ranking.csv',row.names=FALSE)
start('good-ranking');par(mar=c(4.5,8,4,3));z<-d[order(d$count),];pos<-barplot(z$count,names.arg=z$condition,horiz=TRUE,col=ifelse(z$condition=='Medium dose',blue,gray),border=NA,xlim=c(0,36),xlab='Number of colonies',axes=FALSE);axis(1,seq(0,30,10));text(z$count+1,pos,z$count,adj=0);heading('Colony count by condition','One plate per condition');end()
# End labels, redundant line styles, no lookup legend.
t <- data.frame(day=0:4,Control=c(10,12,13,14,15),Treatment=c(10,15,20,24,28));write.csv(t,'data/good-lines.csv',row.names=FALSE)
start('good-lines');plot(t$day,t$Treatment,type='n',xlim=c(0,5.5),ylim=c(0,32),xaxt='n',xlab='Day',ylab='Number of colonies');abline(h=seq(0,30,10),col='#e5e5e5');axis(1,0:4);lines(t$day,t$Control,col='#666666',lwd=2,lty=2);points(t$day,t$Control,col='#666666',pch=1);lines(t$day,t$Treatment,col=blue,lwd=3);points(t$day,t$Treatment,col=blue,pch=19);text(4.15,28,'Treatment',adj=0,col=blue);text(4.15,15,'Control',adj=0);heading('Two cultures over five days','One culture per condition');end()
# Paired comparison with easy-to-follow horizontal connections.
p <- data.frame(sample=paste('Sample',1:4),before=c(12,18,25,30),after=c(8,12,19,24));write.csv(p,'data/good-pairs.csv',row.names=FALSE)
start('good-pairs');par(mar=c(4.5,7,4.5,2));plot(NA,xlim=c(0,35),ylim=c(.5,4.5),yaxt='n',xlab='Concentration (mg/L)',ylab='');axis(2,1:4,rev(p$sample),tick=FALSE);abline(v=seq(0,35,5),col='#eeeeee');segments(p$after,4:1,p$before,4:1,lwd=2,col=gray);points(p$before,4:1,pch=1,cex=1.6,lwd=2);points(p$after,4:1,pch=19,cex=1.6,col=blue);legend('topright',inset=.01,horiz=TRUE,bty='n',legend=c('Before','After'),pch=c(1,19),col=c(ink,blue));heading('Concentration before and after filtering','Four paired samples');end()
# Simple part-to-whole, with an explicit denominator.
start('good-whole');par(mar=c(4,2,4,2));plot.new();plot.window(xlim=c(0,100),ylim=c(0,1));rect(0,.35,75,.65,col=blue,border=NA);rect(75,.35,100,.65,col='#dddddd',border=NA);text(37.5,.5,'Passed: 75%',col='white',cex=1.3);text(87.5,.5,'Failed: 25%',cex=1.05);axis(1,at=c(0,25,50,75,100),labels=paste0(c(0,25,50,75,100),'%'));heading('Quality check: 75 of 100 samples passed','Each sample has one result');end()
# Signed changes: centre and units are explicit.
changes<-data.frame(sample=paste0('S',1:5),change=c(-6,-3,0,4,8));write.csv(changes,'data/good-changes.csv',row.names=FALSE)
for(fixed in c(FALSE,TRUE)){
 start(if(fixed)'good-changes' else 'negative-first');plot(1:5,changes$change,type='n',ylim=if(fixed)c(-10,10) else c(0,10),xaxt='n',xlab='Sample',ylab='After minus before (mg/L)');axis(1,1:5,changes$sample);abline(h=0,col=ink,lwd=1.5);segments(1:5,0,1:5,changes$change,lwd=7,col=ifelse(changes$change<0,blue,orange));points(1:5,changes$change,pch=19,col=ink);heading('Concentration change after filtering','Five paired samples');end()
}
# Small-multiple growth profiles with common scales.
profiles<-data.frame(day=0:4,A=c(2,4,6,8,10),B=c(2,2,3,3,4),C=c(2,8,10,7,5));write.csv(profiles,'data/good-panels.csv',row.names=FALSE)
start('good-panels',1400,650);par(mfrow=c(1,3),mar=c(4.5,4,3,1),oma=c(0,0,2,0));for(n in c('A','B','C')){plot(profiles$day,profiles[[n]],type='n',ylim=c(0,12),xaxt='n',xlab='Day',ylab='Number of colonies',main=paste('Culture',n));abline(h=c(0,4,8,12),col='#e5e5e5');axis(1,0:4);lines(profiles$day,profiles[[n]],type='b',col=blue,pch=19,lwd=2)};mtext('Three cultures, the same measurement scale',outer=TRUE,cex=1.2);end()
# Overplotting: identical values must remain countable.
values<-c(8,8,8,8,8,12,12,12,12,12);write.csv(data.frame(id=1:10,value=values),'data/overlap-points.csv',row.names=FALSE)
for(fixed in c(FALSE,TRUE)){
 start(if(fixed)'overlap-points-fixed' else 'overlap-points-first');xx<-if(fixed)rep(seq(.8,1.2,length.out=5),2) else rep(1,10);plot(xx,values,xlim=c(.5,1.5),ylim=c(0,16),xaxt='n',xlab='',ylab='Concentration (mg/L)',pch=21,bg=blue,cex=1.6);axis(1,1,'Sample group');heading('Ten concentration measurements',if(fixed)'Points spread horizontally only; vertical values unchanged' else 'One point drawn for each observation');end()
}
# Excess chart decoration versus restrained reference lines.
for(fixed in c(FALSE,TRUE)){
 start(if(fixed)'grid-fixed' else 'grid-first');plot(t$day,t$Treatment,type='n',ylim=c(0,32),xaxt='n',xlab='Day',ylab='Number of colonies');axis(1,0:4);if(fixed)abline(h=seq(0,30,10),col='#e5e5e5') else {abline(h=0:32,col='#333333',lwd=1.5);abline(v=seq(0,4,.1),col='#333333',lwd=1.5)};lines(t$day,t$Treatment,col=blue,pch=19,type='b',lwd=2);heading('Colony count over time','Five measurements');end()

}
