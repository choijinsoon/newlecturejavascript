import Missile from "./ball.js";
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
    move(x, y){ 
        if(arguments.length == 1){ 
            var dir = x;

            switch(dir) {
                case "Left":
                    this.#flagW = true;
                    this.#vx = -1;
                    this.#imgIndex = 0;
                break;
                case "Right":
                    this.#flagE = true;
                    this.#vx = 1;
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

        else if(arguments.length == 2){ 
            this.#dx = x;
            this.#dy = y;

            var w = this.#dx - this.x;
            var h = this.#dy - this.y;
            var d = Math.sqrt(w*w + h*h);
            this.#vx = (this.#dx-this.x) / d*this.#speed;
            this.#vy = (this.#dy-this.y) / d*this.#speed;
        }

    }
    stop(x){
        switch(x) {
            case "Left":
                this.#flagW = false;
                this.#vx = 0;
                this.#imgIndex = 3;
                break;
            case "Right":
                this.#flagE = false;
                this.#vx = 0;
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
        return new Missile(this.x, this.y);
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