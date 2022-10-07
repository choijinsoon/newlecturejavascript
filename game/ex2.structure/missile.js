function Missile(){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vx = 0;
    this.dx = 0;
    this.dy = 0;
    this.speed = 1;

    this.imgIndex = 3;
    this.imgIndexDelay = 0;
    this.img = new Image();
    this.img.src = 'image/missile.png';

}

Missile.prototype = {
    draw:function(ctx){
        ctx.drawImage(this.img, 0, 0);
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
        this.x += this.vx;
        this.y += this.vy;

        if(this.dx-3 <= this.x && this.x <= this.dx+3){ //목적지에 도달한다면 오차범위 +-2px
            this.vx = 0;
            this.vy = 0;
        }
    }
};

export default Missile;