import context from "./itemContext.js";

export default class Item{
    #x;
    #y;

    constructor(x=0, y=0){
        this.#x = x;
        this.#y = y;
    }
    
    update(){
        console.log("충돌검사");
        for(let item of context.items){
            if(item === this)
                continue;
            let d = Math.sqrt((item.x-this.x)*(item.x-this.x)+(item.y-this.y)*(item.y-this.y));
            // if(this.)
        }

    }
    draw(ctx){

    }
    get x(){
        return this.#x;
    }
    set x(x){
        this.#x = x;
    }
    get y(){
        return this.#y;
    }
    set y(y){
        this.#y = y;
    }
}