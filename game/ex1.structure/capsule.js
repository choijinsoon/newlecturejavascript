function print(){
    console.log(this);
}

function Box(x, y, w, h){
    console.log(this);
    this.x = x || 50;
    this.y = y || 50;
    this.w = w || 50;
    this.h = h || 50;

}    

Box.prototype = {
    draw:function(){

    }, 
    aa:function(){

    }
};

var box = new Box(); 
console.log(box.draw);

var box1 = new Box();
console.log(box1.draw);