var length = 8, height = 9, qsize = 64;
var queen_1_x = 0, queen_1_y = 0, queen_1_show = "#FF4500";
var queen_2_x = 7, queen_2_y = 8, queen_2_show = "#45FF00";
var thiscanvas, draw;
function cnvs_getCoordinates(e) {
    x = Math.floor(e.clientX / qsize);
    y = Math.floor(e.clientY / qsize);
    document.getElementById("xycoordinates").innerHTML = "Coordinates: (" + x + "," + y + ")";
}
function cnvs_clearCoordinates() {
    document.getElementById("xycoordinates").innerHTML = "";
}
function fillqueen(x, y, color) {
    draw.fillStyle = color;
    draw.fillRect(x * qsize, y * qsize, x * qsize + qsize - 1, y * qsize + qsize - 1);
}
function queengame() {
    thiscanvas = document.getElementById("queen_game");
    draw = thiscanvas.getContext("2d");
    draw.fillStyle = "#5757AF";
    draw.fillRect(0, 0, length * qsize - 1, height * qsize - 1);
    fillqueen(queen_1_x, queen_1_y, queen_1_show);
    fillqueen(queen_2_x, queen_2_y, queen_2_show);
}
