var length = 8, height = 9, qsize = 64, mox, moy, thisq, tx, ty, ex, ey, tc, bc = "#57579F", wall = "#7F7F7F";
var queen_1_x, queen_1_y, queen_1_show = "#EF4507";
var queen_2_x, queen_2_y, queen_2_show = "#45EF07";
var thiscanvas, draw, info, map;
var onestep = [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]];
//space: 0, wall: 1, hereq: 2, pastq: 3
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
function tellwiner(infor) {
    switch (infor) {
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
    queen_1_x = 0; queen_1_y = 0; queen_2_x = length - 1; queen_2_y = height - 1; thisq = 1;
    draw.fillStyle = bc;
    draw.fillRect(0, 0, length * qsize, height * qsize);
    fillqueen(queen_1_x, queen_1_y, queen_1_show);
    fillqueen(queen_2_x, queen_2_y, queen_2_show);
    map = new Array();
    for (var i = 0; i < length; ++i) {
        map[i] = new Array();
        for (var j = 0; j < height; ++j) {
            map[i][j] = 0;
        }
    }
    map[queen_1_x][queen_1_y] = 2;
    map[queen_2_x][queen_2_y] = 2;
}
function queeninit() {
    thiscanvas = document.getElementById("queen_game");
    draw = thiscanvas.getContext("2d");
    picinit();
}
function canmove(step, x, y) {
    var tempx = tx, tempy = ty;
    for (var i = 1; i <= step; ++i) {
        tempx += x; tempy += y;
        var tempb = map[tempx][tempy];
        if (tempb == 1 || tempb == 3 || (i != step && tempb == 2)) return false;
    }
    return true;
}
function showmove(step, x, y) {
    map[tx][ty] = 3;
    fillqueen(tx, ty, wall);
    var tempx = tx, tempy = ty;
    for (var i = 1; i <= step; ++i) {
        tempx += x; tempy += y;
        map[tempx][tempy] = 1;
        fillqueen(tempx, tempy, wall);
    }
    map[mox][moy] = 2;
    fillqueen(mox, moy, tc);
}
function inbound(x, y) {
    if (x < 0 || y < 0 || x >= length || y >= height) return false;
    return true;
}
function trapped(x, y) {
    var flag = true;
    for (var i = 0; i < 8; ++i) {
        var tempx = x + onestep[i][0], tempy = y + onestep[i][1];
        if (inbound(tempx, tempy)) if (map[tempx][tempy] == 0 || map[tempx][tempy] == 2) flag = false;
    }
    if (flag) return true;
    return false;
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
    step = Math.max(tx - mox, ty - moy, mox - tx, moy - ty);
    if (!canmove(step, (mox - tx) / step, (moy - ty) / step)) {
        window.alert("你被挡住了！");
        return;
    }
    showmove(step, (mox - tx) / step, (moy - ty) / step);
    if (mox == ex && moy == ey) {
        tellwiner(thisq);
        window.alert(info);
        picinit();
        return;
    }
    if (trapped(mox, moy)) {
        tellwiner(-thisq);
        window.alert(info);
        picinit();
        return;
    }
    if (trapped(ex, ey)) {
        tellwiner(thisq - 3);
        window.alert(info);
        picinit();
        return;
    }
    if (thisq == 1) { queen_1_x = mox; queen_1_y = moy; }
    else { queen_2_x = mox; queen_2_y = moy; }
    thisq = 3 - thisq;
}
