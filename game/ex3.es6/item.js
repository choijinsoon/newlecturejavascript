import context from "./itemContext.js";

export default class Item{
    #x;
    #y;
    #img;
    #imgExp1;
    #isHit;
    #width;
    #height;

    constructor(x=0, y=0, w=100, h=100){
        this.#x = x;
        this.#y = y;
        this.#img = new Image();
        this.#imgExp1 = new Image();
        this.#isHit = false;
        this.#width = w;
        this.#height = h;
    }
    
    update(){
        for(let item of context.items){
            if(item === this)
                continue;
            
            //나와 items 내 있는 다른 item 과의 거리 
            let d = Math.sqrt((item.x-this.#x)*(item.x-this.#x)+(item.y-this.#y)*(item.y-this.#y));
            let sumR = this.width/2 + item.width/2; //getter 사용

            if(d <= sumR) {
                //console.log("충돌검사");
                this.hit();
            } 
        
        }

    }
    draw(ctx){

    }   
    hit(){
        this.#isHit = true;
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
    get img(){
        return this.#img;
    }
    set img(img){
        this.#img = img;
    }
    get imgExp1(){
        return this.#imgExp1;
    }
    set imgExp1(imgExp1){
        this.#imgExp1 = imgExp1;
    }
    get isHit(){
        return this.#isHit;
    }
    set isHit(isHit){
        this.#isHit = isHit;
    }
    get width(){
        return this.#img.width;
    }
    get height(){
        return this.#img.height;
    }
}