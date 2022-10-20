import Item from "./item.js"

export default class Enemy extends Item{
    constructor(x, y){
        super();
        // this.#x = x || 0; //현재 위치
        // this.#y = y || -70;
        this.#vx = 0; //이동 단위
        this.#vy = 0;
        this.#dx = this.x; //목적지
        this.#dy = this.y;
        this.#speed = 3;

        this.#imgIndex = 3;
        this.#imgIndexDelay = 0;
        //this.#img = new Image();
        this.img = document.getElementById("enemy");
        this.img.src = 'image/enemy.png';
        this.imgExp1.src = 'image/explosion.jpg';

        this.#ex = 0; //colision 좌표
        this.#ey = 0;

        console.log("w"+ this.img.width);


    }
    // get x(){
    //     return this.#x;
    // }
    // set x(x){
    //     this.#x = x;
    // }
    // get y(){
    //     return this.#y;
    // }
    // set y(y){
    //     this.#y = y;
    // }
    deleteItem(){

    }
    draw(ctx){
        let x = this.x-24;
        let y = this.y-32;    
        console.log(this.isHit)    
        if(!this.isHit)
            ctx.drawImage(
                this.img, 
                this.x, this.y);
        if(this.isHit)
            ctx.drawImage(
                this.imgExp1, 
                160*this.#ex, 120*this.#ey, 160, 120, 
                this.x-this.width, this.y-this.height, 160, 120);
    }
    move(x, y){
            this.#dx = x;
            this.#dy = y;
            
    }
    update(){
        super.update(); 
        //this.x += this.#speed;
            this.y += this.#speed;

        if(this.isHit)
            if(++this.#imgIndexDelay%2 == 0)
                if(++this.#ex > 3){
                    this.#ey++;
                    this.#ex = 0;
                }
        
        if(this.y > 700)
            this.deleteItem();
            


        // if(this.#dx-2 <= this.#x && this.#x <= this.#dx+2){ //목적지에 도달한다면 오차범위 +-2px
        //     this.#x = 0;
        //     this.#y = 0;
        // }


    }
    
    #vx;
    #vy;
    #dx;
    #dy
    #speed
    #imgIndex;
    #imgIndexDelay;
    #ex;
    #ey;
}

