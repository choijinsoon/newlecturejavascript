function Missile(x, y){
    this.x = x || 0;
    this.y = y || 0;
    this.vx = 0;
    this.vx = 0;
    this.dx = 0;
    this.dy = 0;
    this.speed = 10;
    this.onOutOfCanvas = null;

    this.imgIndex = 3;
    this.imgIndexDelay = 0;
    this.img = new Image();
    this.img.src = 'image/missile.png';

}

Missile.prototype = {
    draw:function(ctx){
        var x = this.x - this.img.width/2;
        var y = this.y - this.img.height/2
        ctx.drawImage(this.img, x, y);
    },
    move:function(x, y){
        this.dx = x;
        this.dy = y;

        var w = this.dx - this.x;
        var h = this.dy - this.y;
        var d = Math.sqrt(w*w + h*h);
        this.vx = (this.dx-this.x) / d*this.speed;
        this.vy = (this.dy-this.y) / d*this.speed;
    },
    update:function(){
        this.y -= this.speed;
        console.log(this.y);
        if(this.y < 0)
            this.onOutOfCanvas = function(){};
    }
};

export default Missile;
