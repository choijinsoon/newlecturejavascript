export default class Item{
    constructor(x=100,y=100){
        this.#x = x;
        this.#y = y;
       
    }

    update(){

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
    #x;#y;
}
