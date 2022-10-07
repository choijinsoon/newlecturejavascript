import Missile from "./missile.js";

function Fighter(x, y){ //생성자
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
    this.img.src = 'image/fighter.png';
    
}

Fighter.prototype = {
    draw:function(ctx){ //key:value(함수 선언 가능)
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
        var d = Math.sqrt(w*w + h*h);
        this.vx = (this.dx-this.x) / d*this.speed;
        this.vy = (this.dy-this.y) / d*this.speed;
    },
    fire:function(){
        return new Missile();
    },
    update:function(){ //모듈 애니메이션 현재 x,y 값을 단위벡터만큼 움직인다
        this.x += this.vx;
        this.y += this.vy;
        var rightMove = this.dx - this.x
        var leftMove = this.x - this.dx;

        if(++this.imgIndexDelay%10 == 0 )
            //this.imgIndex++;

        if(rightMove > 0 && rightMove < 200){
            this.imgIndex = 4;
        }
        if(rightMove > 200 && rightMove < 300){
            this.imgIndex = 5;
        }
        if(rightMove > 300){
            this.imgIndex = 6;
        }
        if(leftMove > 0 && leftMove < 200){
            this.imgIndex = 2;
        }
        if(leftMove > 200 && leftMove < 300){
            this.imgIndex = 1;
        }
        if(leftMove > 300){
            this.imgIndex = 0;
        }
        
        if(this.dx-5 <= this.x && this.x <= this.dx+5){ //목적지에 도달한다면 오차범위 +-2px
            this.vx = 0;
            this.vy = 0;
            this.imgIndex = 3;
        }
    }
};

export default Fighter;

//클릭 목적지 원점 조절
//clearrect로 이미지 불안정
//

