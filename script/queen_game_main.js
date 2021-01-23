var length = 8, height = 9, qsize = 64, mox, moy, thisq, tx, ty, ex, ey, tc, bc = "#57579F";
var queen_1_x, queen_1_y, queen_1_show = "#EF4507";
var queen_2_x, queen_2_y, queen_2_show = "#45EF07";
var thiscanvas, draw, info;
function loadmo(e) {
    mox = Math.floor(e.clientX / qsize);
    moy = Math.floor(e.clientY / qsize);
}
function cnvs_getCoordinates(e) {
    loadmo(e);
    if (thisq == 1) info = "红";
    else info = "绿";
    document.getElementById("xycoordinates").innerHTML = "坐标：(" + mox + "," + moy + ")，轮到【" + info + "】方";
}
function cnvs_clearCoordinates() {
    document.getElementById("xycoordinates").innerHTML = "";
}
function tellwiner() {
    switch (thisq) {
        case 1: info = "红方“食用”了绿方"; break;
        case 2: info = "绿方“食用”了红方"; break;
        case -1: info = "红方无路可走"; break;
        case -2: info = "绿方无路可走"; break;
    }
    document.getElementById("gameinfo").innerHTML = info;
}
function fillqueen(x, y, color) {
    draw.fillStyle = color;
    draw.fillRect(x * qsize, y * qsize, qsize, qsize);
}
function picinit() {
    queen_1_x = 0; queen_1_y = 0; queen_2_x = 7; queen_2_y = 8; thisq = 1;
    draw.fillStyle = bc;
    draw.fillRect(0, 0, length * qsize, height * qsize);
    fillqueen(queen_1_x, queen_1_y, queen_1_show);
    fillqueen(queen_2_x, queen_2_y, queen_2_show);
}
function queeninit() {
    thiscanvas = document.getElementById("queen_game");
    draw = thiscanvas.getContext("2d");
    picinit();
}
function queenmove(e) {
    var step;
    loadmo(e);
    if (thisq == 1) { tx = queen_1_x; ty = queen_1_y; tc = queen_1_show; ex = queen_2_x; ey = queen_2_y; }
    else { tx = queen_2_x; ty = queen_2_y; tc = queen_2_show; ex = queen_1_x; ey = queen_1_y; }
    if (tx == mox && ty == moy) {
        window.alert("不允许原地不动！");
        return;
    }
    if (tx != mox && ty != moy && tx - mox != ty - moy && tx - mox != moy - ty) {
        window.alert("无效的移动！");
        return;
    }
    if (mox == ex && moy == ey) {
        tellwiner();
        window.alert(info);
        picinit();
        return;
    }
    step = Math.max(tx - mox, ty - moy, mox - tx, moy - ty);
    fillqueen(tx, ty, bc);
    fillqueen(mox, moy, tc);
    if (thisq == 1) { queen_1_x = mox; queen_1_y = moy; }
    else { queen_2_x = mox; queen_2_y = moy; }
    thisq = 3 - thisq;
}
