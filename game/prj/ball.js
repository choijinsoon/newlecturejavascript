export default class Missile{
    constructor(x, y){
        this.#x = x || 0;
        this.#y = y || 0;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = 0;
        this.#dy = 0;
        this.#speed = 10;

        this.#img = new Image();
        this.#img.src = 'image/missile.png';

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
        var x = this.#x - 13;
        var y = this.#y - 13;
        ctx.drawImage(this.#img, 0, 0, this.#img.width, this.#img.height,
            x, y, this.#img.width/30, this.#img.height/30);
    }
    move(x, y){
        this.#dx = x;
        this.#dy = y;

        var w = this.#dx - this.#x;
        var h = this.#dy - this.#y;
        var d = Math.sqrt(w*w + h*h);
        this.#vx = (this.#dx-this.#x) / d*this.#speed;
        this.#vy = (this.#dy-this.#y) / d*this.#speed;
    }
    update(){
        this.#y -= this.#speed;
        
    }

    #x;
    #y;
    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #img;
};
