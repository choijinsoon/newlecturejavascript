import Item from "./item.js";
export default class Defender extends Item{
    constructor(x, y){
        super();
        this.#type ='D';
        this.x = x || 0; 
        this.y = y || 0;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = this.x; 
        this.#dy = this.y;
        this.#speed = 3;
        this.#attack = 1;

        this.#imgIndex = 3;
        this.#imgIndexDelay = 0;
        this.img.src = 'image/defender1.png';
        this.#life = 1;
    }
    get life(){
        return this.#life;
    }
    set life(life){
        this.#life = life;
    }
    deleteItem(){}
    draw(ctx){
        let x = this.x;
        let y = this.y;
        ctx.drawImage(
            this.img, 
            0, 0, 568, 867,
            x, y, 60, 100);
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
    get type (){
        return this.#type;
    }
    get width(){
        return super.width/4;
    }
    get attack(){
        return this.#attack;
    }
    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #imgIndex;
    #imgIndexDelay;
    #life;
    #type;
    #attack;
}

