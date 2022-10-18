import Item from "./item.js";
import Card from "./card.js";

export default class Referee extends Item{
    constructor(x, y, c, a){
        super();
        this.x = x || 0; 
        this.y = y || 0;
        this.vx = 0;
        this.vy = 0;
        this.dx = this.x; 
        this.dy = this.y;
        this.speed = 2;

        this.imgIndex = 3;
        this.imgIndexDelay = 0;
        this.imgYellow = new Image();
        this.imgYellow.src = 'image/refereeY.png';
        this.imgRed = new Image();
        this.imgRed.src = 'image/refereeR.png';
        this.YELLOW_ATTACK = 1;
        this.RED_ATTACK = 2;
        this.attack = a;
        if(this.attack === "Y")
            this.attack = this.YELLOW_ATTACK;
        else if(this.attack === "R")
            this.attack = this.RED_ATTACK;

        this.YELLOW_LIFE =1;
        this.RED_LIFE = 2;
        this.color = c;
        if(this.color === "Y")
            this.life = this.YELLOW_LIFE;
        else if(this.color === "R")
            this.life = this.RED_LIFE;
    }
    
    draw(ctx){
        let x = this.x-190/3/2;
        let y = this.y-300/3/2;
        if(this.color == "Y")
            ctx.drawImage(
                this.imgYellow, 
                0, 0, 281, 452,
                x, y, 190/4, 300/4);
        else if(this.color == "R")
            ctx.drawImage(
                this.imgRed, 
                0, 0, 281, 452,
                x, y, 190/4, 300/4);
        
    }
    move(x, y){
        this.dx = x;
        this.dy = y;

        let w = this.dx - this.x;
        let h = this.dy - this.y;
        let d = Math.sqrt(w*w + h*h);
        this.vx = (this.dx-this.x) / d*this.speed;
        this.vy = (this.dy-this.y) / d*this.speed;
    }
    update(){
        super.update();
        this.y += this.speed;
        if(++this.imgIndexDelay%10000 == 0)
            this.speed += 2;
    }

}

