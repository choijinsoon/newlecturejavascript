export default class Enemy{
    constructor(x, y){
        this.#x = x || 0; 
        this.#y = y || 0;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = this.x; 
        this.#dy = this.y;
        this.#speed = 3;

        this.#imgIndex = 3;
        this.#imgIndexDelay = 0;
        this.#img = new Image();
        this.#img.src = 'image/enemy1.png';

        this.#life = 1;
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
    get life(){
        return this.#life;
    }
    set life(life){
        this.#life = life;
    }
    draw(ctx){
        let x = this.#x-190/3/2;
        let y = this.#y-300/3/2;
        ctx.drawImage(
            this.#img, 
            0, 0, 190, 300,
            x, y, 190/4, 300/4);
    }
    move(x, y){
        this.#dx = x;
        this.#dy = y;

        let w = this.#dx - this.#x;
        let h = this.#dy - this.#y;
        let d = Math.sqrt(w*w + h*h);
        this.#vx = (this.#dx-this.#x) / d*this.#speed;
        this.#vy = (this.#dy-this.#y) / d*this.#speed;
    }
    update(){
        this.#y += this.#speed;
    }

    #x;
    #y;
    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #imgIndex;
    #imgIndexDelay;
    #img;
    #life;
}

