import Missile from "./missile.js";
import Item from "./item.js"

export default class Fighter extends Item{
    
    constructor(x, y){ //생성자
        super();
        //부모로 옮겨 놓음
        // this.x = x || 0; //현재 위치
        // this.y = y || 0;
        this.vx = 0; //이동 단위
        this.vy = 0;
        this.dx = this.x; //목적지
        this.dy = this.y;
        this.speed = 3;
        
        this.flagE = false;
        this.flagW = false;
        this.flagS = false;
        this.flagN = false;

        this.imgIndex = 3;
        this.imgIndexDelay = 0;
        //this.img = new Image();
        this.img.src = 'image/fighter.png';
    
    }
    draw(ctx){ //key:value(함수 선언 가능)
        var w = this.img.width/7;
        var h = this.img.height;
        var hw = w/2;
        var hh = h/2;
        var x = this.x - hw;
        var y = this.y - hh;
        ctx.drawImage(
            this.img, 
            64*this.imgIndex, 0, w, h,
            x, y, w, h);
    }
    move(x, y){ //x, y를 중심으로 변경 후 this.x, this.y를 변경해야할수도있음

        if(arguments.length == 1){ //방향
            var dir = x;
            //이동은 update에서 처리
            //여기서는 방향 상태만 바꾸는 걸로

            switch(dir) {
                case "Left":
                    this.flagW = true;
                    this.vx = -1;
                    //this.x -= this.speed;
                break;
                case "Right":
                    this.flagE = true;
                    this.vx = 1;
                    //this.x += this.speed;
                break;
                case "Up":
                    this.flagN = true;
                    //this.y -= this.speed;
                break;
                case "Down":
                    this.flagS = true;
                    //this.y += this.speed;
                break;
            }
        }

        else if(arguments.length == 2){ //좌표
            this.dx = x;
            this.dy = y;

            var w = this.dx - this.x;
            var h = this.dy - this.y;
            var d = Math.sqrt(w*w + h*h);
            this.vx = (this.dx-this.x) / d*this.speed;
            this.vy = (this.dy-this.y) / d*this.speed;
        }

    }
    stop(x){
        switch(x) {
            case "Left":
                this.flagW = false;
                this.vx = 0;
                //this.x -= this.speed;
                break;
                case "Right":
                this.flagE = false;
                this.vx = 0;
                //this.x += this.speed;
                break;
                case "Up":
                this.flagN = false;
                //this.y -= this.speed;
                break;
                case "Down":
                this.flagS = false;
                //this.y += this.speed;
                break;
        }
    }
    fire(){
        return new Missile(this.x, this.y);
    }
    update(){ //모듈 애니메이션 현재 x,y 값을 단위벡터만큼 움직인다
        // this.x += this.vx; //마우스로 이동할 때 사용
        // this.y += this.vy;
        super.update();

        if(this.flagW == true && this.x > 32) //keydown 시 true, keyup 시 false 설정 true 일때 이동
            this.x -= this.speed;

        if(this.flagE == true && this.x < 1000-32)
            this.x += this.speed;     

        if(this.flagN == true && this.y > 32)
            this.y -= this.speed;

        if(this.flagS == true && this.y < 700-32)
            this.y += this.speed;

        if(++this.imgIndexDelay%5 == 0 ){ //비행기 기울기 설정
            //this.imgIndex++;
            if(this.vx > 0 && this.imgIndex < 6)
                this.imgIndex++;

            if(this.vx == 0 && this.imgIndex > 3)
                this.imgIndex--;

            if(this.vx < 0 && this.imgIndex > 0)
                this.imgIndex--;

            if(this.vx == 0 && this.imgIndex < 3)
                this.imgIndex++;
        }

        // if(this.dx-2 <= this.x && this.x <= this.dx+2){ //목적지에 도달한다면 오차범위 +-2px
        //     this.vx = 0;
        //     this.vy = 0;
        // }
    }
    get width(){
        return super.width/7;
    }
}


//클릭 목적지 원점 조절
//clearrect로 이미지 불안정
//

