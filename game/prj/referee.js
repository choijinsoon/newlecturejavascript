import Item from "./item.js";
import Card from "./card.js";

export default class Referee extends Item{
    constructor(x, y, c){
        super();
        this.#type = 'R';
        this.x = x || 0; 
        this.y = y || 0;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = this.x; 
        this.#dy = this.y;
        this.#speed = 2;
        
        this.#imgIndex = 3;
        this.#imgIndexDelay = 0;
        this.#YELLOW_ATTACK = 1;
        this.#RED_ATTACK = 2;
        this.#YELLOW_LIFE =1;
        this.#RED_LIFE = 2;
        
        this.#color = c;

        this.card = new Card(this.x, this.y, this.#color);
        
        
        if(this.#color == 'Y'){
            this.#life = this.#YELLOW_LIFE;
            this.#attack = this.#YELLOW_ATTACK;
            this.img.src = './image/refereeY1.png';
        }
        
        if(this.#color == 'R'){
            this.#life = this.#RED_LIFE;
            this.#attack = this.#RED_ATTACK;
            this.img.src = './image/refereeR1.png';
        }
    }
    draw(ctx){
        let x = this.x-190/3/2;
        let y = this.y-300/3/2;
        
        super.update();
        
        if(!this.isHitBtwRaB){
            if(this.#color == 'Y'){
                ctx.drawImage(
                    this.img, 
                    0, 0, 401, 1674,
                    x, y, 40, 160);
            }
            
            
            if(this.#color == 'R'){
                ctx.drawImage(
                    this.img, 
                    0, 0, 589, 1674,
                    x, y, 50, 150);
            }
        }
        
        if(this.isHitBtwRaB){
            this.#type = "C";
            ctx.drawImage(
                this.card.img,
                0, 0, 172, 255,
                x+20, y+30, 20, 30);
        }
    }
    move(x, y){
        this.#dx = x;
        this.#dy = y;
        
        let w = this.#dx - this.x;
        let h = this.#dy - this.y;
        let d = Math.sqrt(w*w + h*h);
        this.#vx = (this.#dx-this.x) / d*this.#speed;
        this.#vy = (this.#dy-this.y) / d*this.#speed;
        
    }
    
    update(){
        if(this.y>800)
            this.deleteItem();
        super.update();
        this.y += this.#speed;
    }
    
    get life(){
        return this.#life;
    }
    set life(life){
        this.#life = life;
    }
    get color(){
        return this.#color;
    }
    set color(c){
        this.#color = c;
    }
    get attack(){
        return this.#attack;
    }
    set attack(a){
        this.#attack = a;
    }
    get type (){
        return this.#type;
    }
    get width(){
        return 190/3;
    }
 
    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #imgIndex;
    #imgIndexDelay;
    #life;
    #color
    #YELLOW_LIFE;
    #RED_LIFE;
    #YELLOW_ATTACK;
    #RED_ATTACK ;
    #attack;
    #type;
    #width;
}

