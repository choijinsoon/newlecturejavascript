function Enemy(x, y){
    this.x = x || 0; //현재 위치
    this.y = y || 0;
    this.vx = 0; //이동 단위
    this.vy = 0;
    this.dx = this.x; //목적지
    this.dy = this.y;
    this.speed = 3;

    this.imgIndex = 3;
    this.imgIndexDelay = 0;
    this.img = new Image();
    this.img.src = 'image/enemy.png';
}

Enemy.prototype ={
    draw:function(ctx){
        ctx.drawImage(this.img, 0, 0);
    },
    move:function(){

    },
    update:function(){

    }
}

export default Enemy;