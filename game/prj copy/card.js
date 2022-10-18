export default class Card{
    constructor(x, y){
        this.#x = x || 0; 
        this.#y = y || 0;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = this.x; 
        this.#dy = this.y;
        this.#speed = 3;
        this.#color = 0; //0:yellow, 1:red

        this.#imgYellow = new Image();
        this.#imgYellow.src = 'image/yellow.png';
        this.#imgRed = new Image();
        this.#imgRed.src = 'image/red.png';

    }
    draw(ctx){
        let x = this.#x;
        let y = this.#y;
        if(this.#color == 0){
            ctx.drawImage(
                this.#imgYellow, 
                0, 0, 172, 225,
                x-10, y, 20, 30);
            }
        else if(this.#color == 1){
            ctx.drawImage(
                this.#imgRed, 
                0, 0, 172, 225,
                x-10, y, 20, 30);   
            }            
    }
    update(){
        this.#y += this.#speed;
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
    get color(){
        return this.#color;
    }
    set color(color){
        this.#color = color;
    }

    #x;
    #y;
    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #imgYellow;
    #imgRed;
    #color;
}