export default class Card{
    constructor(x, y, c){
        this.#type = "C"
        this.x = x || 0; 
        this.y = y || 0;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = this.x; 
        this.#dy = this.y;
        this.#speed = 3;
        this.#color = c; 
        
        this.img = new Image();
        if(this.#color == 'Y'){
            this.img.src = './image/yellow.png';
            this.score = 1;
        }
        if(this.#color == 'R'){
            this.img.src = './image/red.png';
            this.score = 2;
        }
        
    }
    draw(ctx){
        let x = this.x;
        let y = this.y;
        ctx.drawImage(
            this.img, 
            0, 0, 172, 255,
            x, y, 100, 100);     
    }
    update(){
        this.y += this.#speed;
    }
    get color(){
        return this.#color;
    }
    set color(color){
        this.#color = color;
    }
    get type(){
        return this.#type;
    }

    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #color;
    #type;
}