export default class Post{
    constructor(x){
        this.x = x||150;
        this.y = 0;
        this.speed = 2;
    
        this.img = new Image();
        this.img.src = "image/goalpost.png";
        this.rangeOn=true;
    }

    draw(ctx){
        ctx.drawImage(this.img,
            0,0,960,662,
            this.x,this.y,200,100);
    }

    update(){
        if(this.x==250)
            this.rangeOn = true;
        if(this.x==50)
            this.rangeOn = false;
        if(this.rangeOn == true)
            this.x-=this.speed;
        if(this.rangeOn == false)
            this.x+=this.speed;
    }
}