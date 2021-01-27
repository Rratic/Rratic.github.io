function filltable(){
var data=JSON.parse(json_data);
var temp=data.trs.size();
for(var i=0;i<temp;++i){
    document.getElementsById("tabletofill").innerhtml+="<tr><td>"+data.trs[i].name
    +"</td><td><code>"+data.trs[i].char+
    "</code></td><td>"+data.trs[i].uni+
    "</td><td><a href=\""+data.trs[i].link+"\">"+data.trs[i].lina+"</a></td></tr>";
}
}