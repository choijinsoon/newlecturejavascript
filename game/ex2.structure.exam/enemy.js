//var enemys = [];
function Enemy(x, y){
    this.x = x || 0;
    this.y = y || 0;
    this.vx = 0;
    this.vy = 5;
    this.dx = 0;
    this.dy = 1000;

    this.img = new Image();
    this.img.src = 'image/pic1.png';

}

Enemy.prototype = {
    draw:function(ctx){
        //enemys.put(enemy);
        ctx.drawImage(this.img, this.x, this.y, 30, 30);
    },
    update:function(){
        this.y += this.vy;

        if(this.y == this.dy){
            var min = Math.ceil(0);
            var max = Math.floor(300);
            this.x = Math.random()*(max-min)+min;
            this.y = 0;
        }
    }
}

export default Enemy;