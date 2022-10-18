import context from "./itemContext.js";
export default class Item{
    constructor(x=0,y=0,w=0,h=0){
        this.#x = x;
        this.#y = y;
        this.#width = w;
        this.#height = h;
        this.#img = new Image();
        this.isHit = false;
    }

    update(){
        for(let item of context.items){
            if(item === this)
                continue;
            
            //나와 items 내 있는 다른 item 과의 거리 
            let d = Math.sqrt((item.x-this.#x)*(item.x-this.#x)+(item.y-this.#y)*(item.y-this.#y));
            let sumR = this.width/2 + item.width/2; 
            if(d <= sumR) {
                this.isHit = true;
            }         
        }
        //console.log(this.isHit);
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
    get width(){
        return this.#img.width;
    }
    get height(){
        return this.#img.height;
    }
    
    #x;
    #y;
    #width;
    #height;
    #img;
    
}
