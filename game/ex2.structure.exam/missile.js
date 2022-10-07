function Missile(x, y){
    this.x = x || 0;
    this.y = y || 0;
    this.vx = 0;
    this.vy = 0;
    this.dx = this.x;
    this.dy = this.y;
    this.d = 

    this.img = new Image();
    this.img.src = 'image/missile.png';
}

Missile.prototype = {
    draw:function(ctx){
        ctx.drawImage(this.img, this.x, this.y);
    },
    move:function(x, y){
        this.x = x;
        this.y = y;

        this.w = (this.dx-this.x) / d
    },
    update:function(){

    }
}

export default Missile;