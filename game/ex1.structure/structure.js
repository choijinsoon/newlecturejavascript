//플랫폼이 제공하는 환경을 이용
function Box(x, y, w, h){
    this.x = x || 50;
    this.y = y || 50;
    this.width = w || 50;
    this.height = h || 50;

}    

Box.prototype = {
    draw:function(){
        var iw = this.width/2;
        var ih = this.height/2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x+iw/2, this.y+ih/2, iw, ih);
    }
};

var boxes = [];
var index = 0;
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
canvas.onclick = function(e){
    ctx.clearRect(0, 0, 500, 500);
    
    var box = new Box(e.x, e.y);

    boxes.push(box);
    console.log(boxes);
    for(var i of boxes)
        i.draw();   
}
