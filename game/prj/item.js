import context from "./itemContext.js";
import Player from "./player.js";
import Card from "./card.js";
export default class Item{
    constructor(x,y){
        this.#x = x;
        this.#y = y;
        this.#img = new Image();
        this.#isHitBtwRaP = false;
        this.#isHitBtwRaB = false;
        this.#isHitBtwDaB = false;
        
    }
    deleteItem(){}
    update(){
        for(let item of context.items){
            if(item === this)
                continue;
            //나와 items 내 있는 다른 item 과의 거리 
            let w = item.x-this.#x;
            let h = item.y-this.#y;
            let d = Math.sqrt(w*w+h*h);
            let sumR = this.width/2 + item.width/2; 
            if(d < sumR) {
                
                if(this.type == 'P'&& item.type !='B'){
                    item.deleteItem();
                    this.myLife -= item.attack;
                }

                if(this.type == 'D'&& item.type =='B'){
                    item.deleteItem();
                    this.deleteItem();
                }
                
                if(this.type == 'R'&& item.type =='B'){
                    this.life -= 1;
                    item.deleteItem();
                    if(this.life == 0){
                        this.#isHitBtwRaB = true;
                    }
                }

                if(this.type == 'P'&& item.type == 'C'){
                    this.myScore += item.card.score;
                }
            }
        }
    }    
    draw(){

    }
    get x(){
        return this.#x;
    }
    set x(x){
        this.#x= x;
    }   
    get y(){
        return this.#y;
    }
    set y(y){
        this.#y= y;
    }
    get img (){
        return this.#img;
    }
    get width(){
        return this.#img.width;
    }
    get height(){
        return this.#img.height;
    }
    get isHitBtwRaB(){
        return this.#isHitBtwRaB;
    }
    
    #x;
    #y;
    #width;
    #height;
    #img;
    #isHitBtwRaP;
    #isHitBtwRaB;
    #isHitBtwDaB;
    #isHitBtwDaP;
    
}
