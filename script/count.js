function countvisit(){
if(localStorage.pagecount)localStorage.pagecount=Number(localStorage.pagecount)+1;
else localStorage.pagecount=1;
document.getElementById("countvisit").innerHTML="<p>此页面已被访问<code>"+localStorage.pagecount+"</code>人次</p>";}
