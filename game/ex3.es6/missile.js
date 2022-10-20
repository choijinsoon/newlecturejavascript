import Item from "./item.js"

export default class Missile extends Item{
    constructor(x, y){
        super();
        this.x = x || 0;
        this.y = y || 0;
        this.vx = 0;
        this.vx = 0;
        this.dx = 0;
        this.dy = 0;
        this.speed = 10;
        this.onOutOfCanvas = null;

        this.img = new Image();
        this.img.src = 'image/missile.png';

    }
    deleteItem(){

    }
    draw(ctx){
        var x = this.x - this.img.width/2;
        var y = this.y - this.img.height/2
        console.log("m"+this.isHit)
        if(!this.isHit)
            ctx.drawImage(this.img, x, y);
        else{
            this.y == 800;
            this.speed == 0;

        }
    }
    move(x, y){
        this.dx = x;
        this.dy = y;

        var w = this.dx - this.x;
        var h = this.dy - this.y;
        var d = Math.sqrt(w*w + h*h);
        this.vx = (this.dx-this.x) / d*this.speed;
        this.vy = (this.dy-this.y) / d*this.speed;
    }
    update(){
        this.y -= this.speed;
        
        if(this.y < 0)
            this.deleteItem();
        //console.log(this.y);
        //this.onOutOfCanvas(Missile);
        
    }
}
