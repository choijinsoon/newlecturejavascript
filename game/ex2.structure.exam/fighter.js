function Fighter(x, y){
    //현재 위치
    this.x = x || 0;
    this.y = y || 0;
    this.vx = 0;
    this.vy = 0;
    this.dx = this.x;
    this.dy = this.y;
    this.speed = 10;

    this.imgIndex = 3;
    this.imgIndexDelay = 0;
    this.img = new Image();
    this.img.src = 'image/fighter.png';

    
}

Fighter.prototype = {
    draw:function(ctx){
        ctx.drawImage(
            this.img, 
            64*this.imgIndex, 0, 64, 64,
            this.x, this.y, 64, 64);
    },
    move:function(x, y){
        this.dx = x;
        this.dy = y;

        var w = this.dx - this.x;
        var h = this.dy - this.y;
        var d = Math.sqrt(w*w + h*h)
        this.vx = (this.dx - this.x) / d*this.speed;
        this.vy = (this.dy - this.y) / d*this.speed;
    },
    update:function(){
        this.x += this.vx;
        this.y += this.vy;

        // if(++this.imgIndexDelay%10 == 0)
        //     this.imgIndex++;




        if(this.dx-5 < this.x && this.x < this.dx+5){
            this.vx = 0;
            this.vy = 0;
        }
    }
};
//그림그리기

//마우스 포인터 위치 값 받아서 위치 이동

export default Fighter;