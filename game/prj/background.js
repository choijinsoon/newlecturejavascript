export default class Background{
    constructor(y){
        this.y = y || 0; //canvas.height
        this.y1 = this.y;
        this.speed = 2;
        
        this.img = new Image();
        this.img.src = 'image/soccerground.png';

    }
    draw(ctx){
        ctx.drawImage(this.img, 
            0, this.y, 309, 453,
            0, 0, 309*2, 453*2);
        ctx.drawImage(this.img, 
            0, this.y+453, 309, 453,
            0, 0, 309*2, 453*2);
    }
    update(){
        this.y = this.y - this.speed;
        if(this.y <= -453){
            this.y = 0;
        }
    }
    setSpeed(speed){
        this.speed = speed;
    }
}