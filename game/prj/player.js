import Ball from "./ball.js";
import Item from "./item.js";
export default class Player extends Item{
    constructor(x, y){ 
        super();
        this.x = x || 0; 
        this.y = y || 0;
        this.#vx = 0; 
        this.#vy = 0;
        this.#dx = this.x; 
        this.#dy = this.y;
        this.#speed = 3;
        
        this.#flagE = false;
        this.#flagW = false;
        this.#flagS = false;
        this.#flagN = false;

        this.#imgIndex = 3;
        this.#imgIndexDelay = 0;
        this.#img = new Image();
        this.#img.src = 'image/fighter.png';
        this.myLife =10;
        
    }
    
    draw(ctx){ 
        var imgW = this.#img.width/35;
        var imgH = this.#img.height/50;
        var x = this.x - imgW;
        var y = this.y - imgH;
        ctx.drawImage(
            this.#img, 
            0, 145*this.#imgIndex, 145, 145,
            x, y, 145/2, 145/2);
    }
    move(x){ 
        var dir = x;

        switch(dir) {
            case "Left":
                this.#flagW = true;
                this.#imgIndex = 0;
            break;
            case "Right":
                this.#flagE = true;
                this.#imgIndex = 1;
            break;
            case "Up":
                this.#flagN = true;
                this.#imgIndex = 3;
            break;
            case "Down":
                this.#flagS = true;
                this.#imgIndex = 2;
            break;
        }
        
    }
    stop(x){
        switch(x) {
            case "Left":
                this.#flagW = false;
                this.#imgIndex = 3;
                break;
            case "Right":
                this.#flagE = false;
                this.#imgIndex = 3;
                break;
            case "Up":
                this.#flagN = false;
                this.#imgIndex = 3;
                break;
            case "Down":
                this.#flagS = false;
                this.#imgIndex = 3;
                break;
        }
    }
    fire(){
        return new Ball(this.x, this.y);
    }
    update(){

        if(this.#flagW == true && this.x > 30) 
            this.x -= this.#speed;

        if(this.#flagE == true && this.x < 470)
            this.x += this.#speed;     

        if(this.#flagN == true && this.y > 700)
            this.y -= this.#speed;

        if(this.#flagS == true && this.y < 770)
            this.y += this.#speed;
    }
    get width(){
        return super.width/9;
    }


    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #flagE;
    #flagW;
    #flagS;
    #flagN;
    #imgIndex;
    #imgIndexDelay;
    #img

}