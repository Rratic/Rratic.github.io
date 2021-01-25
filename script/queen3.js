var sx=3,sy=4,sz=5,s=48,mox,moy,moz,thisq,tx,ty,tz,ex,ey,ez,tc,bc,s1,s2,draw,info,map,tex,tey,tez;
//s地图mo鼠标t我e敌q1红q2绿c显示te暂时,0空1障2现在
var q1x,q1y,q1z,q1c="#EF4507",q2x,q2y,q2z,q2c="#45EF07";
var onestep=[[1,-1,-1],[1,-1,0],[1,-1,1],[1,0,-1],[1,0,0],[1,0,1],[1,1,-1],[1,1,0],[1,1,1],[0,-1,-1],[0,-1,0],[0,-1,1],[0,0,-1],[0,0,1],[0,1,-1],[0,1,0],[0,1,1],[-1,-1,-1],[-1,-1,0],[-1,-1,1],[-1,0,-1],[-1,0,0],[-1,0,1],[-1,1,-1],[-1,1,0],[-1,1,1],]
function d2tod3(x,y){tex=x/5;tey=x%5;tez=y;}
function d3tod2(x,y,z){tex=x*5+y;tey=z;}
function loadmo(e){tex=Math.floor(e.clientX/s);moz=Math.floor(e.clientY/s);
if(tex%5==4){return false;}mox=Math.floor(tex/5);moy=tex%5;return true;}
function showcoord(e){if(thisq==1)info="红";else info="绿";if(loadmo(e)){
document.getElementById("coord").innerHTML="("+mox+","+moy+","+moz+")，轮到【"+info+"】方";}
else document.getElementById("coord").innerHTML="出界，轮到【"+info+"】方";}
function clearcoord(){if(thisq==1)info="红";else info="绿";
document.getElementById("coord").innerHTML="轮到【"+info+"】方";}
function tellwiner(infor){switch(infor){
case 1:info="红方“食用”了绿方";++s1;break;
case 2:info="绿方“食用”了红方";++s2;break;
case-1:info="红方无路可走";++s2;break;
case-2:info="绿方无路可走";++s1;break;
}document.getElementById("gameinfo").innerHTML=s1+":"+s2;}
function fillqueen(x,y,z,c){d3tod2(x,y,z);draw.fillStyle=c;
draw.fillRect(tex*s,tey*s,s,s);}
function changeorder(){thisq=3-thisq;clearcoord();}
function clearboard(){s1=0;s2=0;tellwiner(0);}
function inbound(x,y,z){if(x<0||y<0||x>=sx||y>=sy||z<0||z>=sz)return false;return true;}
function picinit(){q1x=0;q1y=0;q1z=0;q2x=sx-1;q2y=sy-1;q2z=sz-1;thisq=1;
map=new Array();for(var i=0;i<sx;++i){map[i]=new Array();
for(var j=0;j<sy;++j){map[i][j]=new Array();for(var k=0;k<sz;++k){map[i][j][k]=0;
d3tod2(i,j,k);draw.drawImage(bc,tex*s,tey*s,s,s);}}}
fillqueen(q1x,q1y,q1z,q1c);fillqueen(q2x,q2y,q2z,q2c);
map[q1x][q1y][q1z]=2;map[q2x][q2y][q2z]=2;}

function queeninit(){var thiscanvas=document.getElementById("queen_game");draw=thiscanvas.getContext("2d");
bc=new Image();bc.src="../img/queen-space.png";s1=0;s2=0;picinit();}//初始化

function canmove(step,x,y,z){tex=tx,tey=ty,tez=tz;
for(var i=1;i<=step;++i){tex+=x;tey+=y;tez+=z;var teb=map[tex][tey][tez];
if(teb==1||(i!=step&&teb==2))return false;}return true;}
