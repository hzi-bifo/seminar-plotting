# Rebuild original teaching figures. Only base R is required.
# Run from this folder: Rscript generate_plots.R
set.seed(42)
dir.create('assets', showWarnings=FALSE)
dir.create('data', showWarnings=FALSE)
blue <- '#287f91'; orange <- '#ca6545'; ink <- '#223d48'
start <- function(name,w=900,h=620) {
  png(file.path('assets',paste0(name,'.png')),width=w,height=h,res=120)
  par(mar=c(4.5,4.8,3,1.5), mgp=c(2.8,.8,0), col=ink,col.axis=ink,col.lab=ink,
      family='sans',las=1,cex=1.1,bty='l')
}
finish <- function() dev.off()
# Exactly the same rows feed both versions of each comparison.
d <- data.frame(id=1:12, A=c(8,9,9,10,10,10,10,11,11,12,9,11), B=c(2,3,3,4,4,5,15,16,16,17,17,18))
p <- data.frame(id=1:10, before=c(9,12,16,20,23,28,32,36,40,44),after=c(6,9,12,16,19,24,27,30,35,48))
t <- data.frame(day=c(0,1,2,14), response=c(2,3,8,9))
h <- matrix(c(.1,.2,.1,.3,.2,.3,.2,.4,.5,.6,.5,.7,.6,.7,.6,.8),4,4)
rank <- data.frame(pathway=c('Repair','Metabolism','Signalling','Transport','Immunity','Growth'),count=c(37,42,39,34,41,36))
write.csv(d,'data/distributions.csv',row.names=FALSE);write.csv(p,'data/paired.csv',row.names=FALSE)
write.csv(t,'data/time.csv',row.names=FALSE);write.csv(h,'data/heatmap.csv',row.names=FALSE)
write.csv(rank,'data/pathways.csv',row.names=FALSE)
for (v in c('a','b')) {
 start(paste0('distribution-',v))
 if(v=='a') barplot(c(mean(d$A),mean(d$B)),names.arg=c('A','B'),col=c(blue,orange),ylim=c(0,20),ylab='Protein abundance (a.u.)',main='Two independent groups · n = 12 each')
 else {plot(c(1,2),c(0,20),type='n',xlim=c(.5,2.5),ylim=c(0,20),xaxt='n',xlab='',ylab='Protein abundance (a.u.)',main='Two independent groups · n = 12 each');axis(1,1:2,c('A','B'));for(i in 1:2){values<-d[[i+1]];offset<-ave(values,values,FUN=function(z)(seq_along(z)-(length(z)+1)/2)*.07);points(i+offset,values,pch=21,bg=c(blue,orange)[i],cex=1.3);segments(i-.18,mean(values),i+.18,mean(values),lwd=3)}}
 finish()
 start(paste0('paired-',v))
 if(v=='b') barplot(c(mean(p$before),mean(p$after)),names.arg=c('Before','After'),col=c(blue,orange),ylim=c(0,52),ylab='Marker concentration (ng/mL)',main='Repeated measurements · 10 participants')
 else {plot(c(1,2),c(0,52),type='n',xlim=c(.7,2.3),xaxt='n',xlab='',ylab='Marker concentration (ng/mL)',main='Repeated measurements · 10 participants');axis(1,1:2,c('Before','After'));for(i in 1:nrow(p)){lines(1:2,c(p$before[i],p$after[i]),col=if(i==10)orange else blue,lwd=2);points(1:2,c(p$before[i],p$after[i]),pch=19,col=if(i==10)orange else blue)}}
 finish()
 start(paste0('time-',v))
 xx<-if(v=='a')1:4 else t$day
 plot(xx,t$response,type='b',pch=19,col=blue,lwd=3,xaxt='n',xlab='Days since exposure',ylab='Response (a.u.)',ylim=c(0,10),main='Four observations of one culture');axis(1,xx,t$day)
 finish()
 start(paste0('rank-',v))
 if(v=='a') {z<-rank[order(rank$count),];par(mar=c(4.5,7,3,2));barplot(z$count,names.arg=z$pathway,horiz=TRUE,col=blue,xlim=c(0,48),xlab='Number of genes',main='Genes assigned to one pathway each')}
 else pie(rank$count,labels=paste(rank$pathway,rank$count,sep='\n'),col=hcl.colors(6,'Pastel 1'),main='Genes assigned to one pathway each')
 finish()
}
for(v in c('a','b')) {
 start(paste0('heatmap-',v),1000,600);par(mfrow=c(1,2),mar=c(6,4,4,3))
 for(k in 1:2){mat<-h[,((k-1)*2+1):(k*2)];lim<-if(v=='a')range(mat) else c(0,1)
 image(1:2,1:4,t(mat),col=hcl.colors(20,'viridis'),zlim=lim,axes=FALSE,xlab='Sample',ylab='Gene',main=paste(c('Control','Treatment')[k],sprintf('\nColour scale: %.1f–%.1f',lim[1],lim[2])));axis(1,1:2,paste0('S',((k-1)*2+1):(k*2)));axis(2,1:4,paste0('G',1:4));for(i in 1:4)for(j in 1:2)text(j,i,sprintf('%.1f',mat[i,j]),col=if((mat[i,j]-lim[1])/diff(lim)<.55)'white' else 'black')
 mtext('Low = dark purple; high = yellow',side=1,line=4.4,cex=.8)}
 finish()
}
# Clearly flawed displays for the opening diagnostic round.
start('truncated');barplot(c(51,54),names.arg=c('Control','Treatment'),ylim=c(50,55),col=c(blue,orange),ylab='Survival (%)',main='A dramatic improvement?',xpd=FALSE);abline(h=50,col=ink);finish()
start('overlap-pie');pie(c(70,50,40),labels=c('Fatigue\n70%','Headache\n50%','Nausea\n40%'),col=c(blue,orange,'#b6a35a'),main='Symptoms reported by 100 participants');finish()
# Multi-panel composition: identical data and encodings, only layout changes.
for(v in c('a','b')) {
 start(paste0('layout-',v),1200,850)
 if(v=='a') layout(matrix(c(1,2,3,4),2,byrow=TRUE)) else layout(matrix(c(1,1,1,2,3,4),2,byrow=TRUE))
 par(mar=c(4,4.4,3,1),cex=if(v=='a')1 else .8)
 barplot(c(mean(d$A),mean(d$B)),col=c(blue,orange),names.arg=c('A','B'),ylim=c(0,20),ylab='Abundance (a.u.)',main='A  Group means · n = 12 each')
 boxplot(d$A,d$B,names=c('A','B'),col=c(blue,orange),ylim=c(0,20),ylab='Abundance (a.u.)',main='B  Distributions');stripchart(list(d$A,d$B),vertical=TRUE,method='stack',add=TRUE,pch=21,bg='white')
 plot(p$before,p$after,pch=19,col=blue,xlim=c(0,52),ylim=c(0,52),xlab='Before (ng/mL)',ylab='After (ng/mL)',main='C  Paired responses · n = 10');abline(0,1,lty=2)
 plot(t$day,t$response,type='b',pch=19,col=blue,xlab='Day',ylab='Response (a.u.)',ylim=c(0,10),main='D  One culture over time')
 finish()
}

# Short diagnostic examples: one visible problem, followed by a repair.
for (fixed in c(FALSE, TRUE)) {
 suffix <- if(fixed) 'fixed' else 'first'
 start(paste0('months-',suffix))
 order <- if(fixed) 1:4 else c(4,2,1,3)
 plot(1:4,c(10,20,30,40)[order],type='b',pch=19,lwd=3,col=blue,xaxt='n',xlab='Month',ylab='Number of samples',ylim=c(0,45),main='Samples collected')
 axis(1,1:4,c('January','February','March','April')[order]);finish()
 start(paste0('units-',suffix))
 barplot(c(12,18),names.arg=c('A','B'),col=blue,ylim=c(0,22),ylab=if(fixed)'Concentration (mg/L)' else 'Value',main='Two water samples');finish()
 start(paste0('circles-',suffix))
 par(mar=c(1,1,3,1));plot.new();plot.window(xlim=c(0,8),ylim=c(0,4),asp=1)
 symbols(c(2,6),c(2,2),circles=c(.6,if(fixed).6*sqrt(2) else 1.2),inches=FALSE,add=TRUE,bg=blue,fg=blue)
 text(c(2,6),c(.25,.25),c('A: 10 cells','B: 20 cells'));title('Cell counts');finish()
 start(paste0('ticks-',suffix))
 plot(1:4,if(fixed)c(0,10,20,100) else c(0,1,2,3),type='b',col=blue,lwd=3,pch=19,xaxt='n',yaxt='n',xlab='Day',ylab='Number of colonies',main='Colonies counted each day')
 axis(1,1:4,1:4);if(fixed)axis(2,seq(0,100,20)) else axis(2,0:3,c(0,10,20,100));finish()
 start(paste0('labels-',suffix))
 labs<-c('Untreated control','Low-dose treatment','Medium-dose treatment','High-dose treatment')
 if(fixed){par(mar=c(4,12,3,2));barplot(c(10,14,18,22),names.arg=labs,horiz=TRUE,col=blue,xlab='Number of colonies',main='Colonies by condition')}else{par(mar=c(5.5,4.8,3,2));barplot(c(10,14,18,22),names.arg=c('Untreated\ncontrol','Low-dose\ntreatment','Medium-dose\ntreatment','High-dose\ntreatment'),col=blue,ylab='Number of colonies',main='Colonies by condition',cex.names=.9)};finish()
 start(paste0('legend-',suffix))
 plot(1:4,c(2,3,4,5),type='b',pch=19,col=blue,lwd=3,ylim=c(0,10),xlab='Day',ylab='Number of colonies',main='Control and treatment cultures',xaxt='n');axis(1,1:4)
 lines(1:4,c(3,5,7,9),type='b',pch=17,col=orange,lwd=3)
 if(fixed)legend('topleft',c('Control','Treatment'),col=c(blue,orange),pch=c(19,17),lty=1,bty='n');finish()
 start(paste0('denominator-',suffix))
 vals<-if(fixed)c(10,20) else c(10,40)
 barplot(vals,names.arg=c('Lab A','Lab B'),col=c(blue,orange),ylim=c(0,45),ylab=if(fixed)'Contaminated samples (%)' else 'Contaminated samples (count)',main='Contamination in two laboratories');finish()
 start(paste0('pie-values-',suffix))
 pie(if(fixed)c(75,25) else c(50,50),labels=c('Passed: 75%','Failed: 25%'),col=c(blue,orange),main='Quality check: 100 samples');finish()
}

# More single-issue examples and repairs of the original opening cases.
start('truncated-fixed');barplot(c(51,54),names.arg=c('Control','Treatment'),ylim=c(0,100),col=c(blue,orange),ylab='Survival (%)',main='Survival by group');finish()
start('overlap-fixed');barplot(c(70,50,40),names.arg=c('Fatigue','Headache','Nausea'),ylim=c(0,100),col=blue,ylab='Participants reporting symptom (%)',main='Symptoms reported by 100 participants');finish()
for(fixed in c(FALSE,TRUE)){
 suffix<-if(fixed)'fixed' else 'first'
 start(paste0('claim-',suffix));barplot(c(10,12),names.arg=c('Before','After'),col=blue,ylim=c(0,15),ylab='Number of colonies',main=if(fixed)'Colony count increased from 10 to 12' else 'Colony count doubled!');finish()
 start(paste0('missing-',suffix));plot(1:4,c(10,12,if(fixed)NA else 0,14),type='b',pch=19,lwd=3,col=blue,ylim=c(0,16),xaxt='n',xlab='Day',ylab='Number of colonies',main='Daily colony count');axis(1,1:4);if(fixed)text(3,7,'Not measured');finish()
 start(paste0('widths-',suffix));barplot(c(20,20),width=if(fixed)c(1,1) else c(1,3),names.arg=c('A','B'),col=blue,ylim=c(0,25),ylab='Number of samples',main='Samples collected by two labs');finish()
 start(paste0('contrast-',suffix));par(mar=c(4.5,4.5,3,1));image(1:2,1:2,matrix(c(.1,.2,.8,.9),2),col=hcl.colors(20,'viridis'),zlim=c(0,1),axes=FALSE,xlab='Sample',ylab='Gene',main='Allele frequency');axis(1,1:2,c('S1','S2'));axis(2,1:2,c('G1','G2'));for(x in 1:2)for(y in 1:2){v<-matrix(c(.1,.2,.8,.9),2)[x,y];text(x,y,v,col=if(fixed&&v<.5)'white' else 'black',cex=1.7)};finish()
 start(paste0('incomplete-',suffix));pie(if(fixed)c(40,30,20,10) else c(40,30,20),labels=if(fixed)c('A: 40%','B: 30%','C: 20%','Other: 10%') else c('A: 40%','B: 30%','C: 20%'),col=c(blue,orange,'#c0ab60','#aaa'),main='Sample types: 100 samples');finish()
}
# Redraw of values printed on the real NHS birthday graphic (not raw survey data).
start('real-cake-redraw',1000,800);par(mar=c(4,17,3,2));vals<-c(37,30,23,20,19,16,10,9,4,3);labs<-c('Charity event','Ribbon or wristband','Prizes for NHS workers','School lessons','No celebration','Extra bank holiday','Hospital birthday parties',"Don't know",'Street parties','Other');barplot(rev(vals),names.arg=rev(labs),horiz=TRUE,col=blue,xlim=c(0,40),xlab='Percentage printed in original graphic',main='Preferences for the NHS 65th birthday');finish()
