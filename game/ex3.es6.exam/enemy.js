export default class Enemy{
    #x;
    #y;
    #vx;
    #vy;
    #dx;
    #dy
    #speed
    #imgIndex;
    #imgIndexDelay;
    #img;
    constructor(x, y){
        this.#x = x || 0; //현재 위치
        this.#y = y || 0;
        this.#vx = 0; //이동 단위
        this.#vy = 0;
        this.#dx = this.#x; //목적지
        this.#dy = this.#y;
        this.#speed = 3;

        this.#imgIndex = 3;
        this.#imgIndexDelay = 0;
        this.#img = new Image();
        this.#img.src = 'image/enemy.png';
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
    draw(ctx){
        let x = this.#x-24;
        let y = this.#y-32;
        ctx.drawImage(
            this.#img, 
            0, 0, 48, 64,
            x, y, 48, 64);
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
        this.#x += this.#vx*this.#speed;
        this.#y += this.#vy*this.#speed;

        // if(this.#dx-2 <= this.#x && this.#x <= this.#dx+2){ //목적지에 도달한다면 오차범위 +-2px
        //     this.#x = 0;
        //     this.#y = 0;
    // }

    }
}

