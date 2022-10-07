import Fighter from "./fighter.js";
import Background from "./background.js";
import Missile from "./missile.js";

function GameCanvas(){
    this.obj = document.querySelector("canvas");
    this.obj.width = 1000;
    this.obj.height = 700;
    this.fighter = new Fighter();
    this.background = new Background();
    this.missiles = [];
    
    var ctx = this.obj.getContext("2d");
    this.fighter.draw(ctx);
    
    this.obj.onclick = this.clickHandler.bind(this);// this 출력 this = GameCanvas.canvas
    this.obj.onkeydown = this.keyDownHandler;

    //this.run = this.run.bind(this);

    // var img = new Image();
    // img.src = './image/pic1.png';
    // ctx.drawImage(
        //     img, 
        //     0, 0, 300, 150,
        //     0, 0, 300/2, 150/2);
        // ctx.drawImage(
            //     img, 
            //     300, 0, 300, 150,
            //     300/2, 150/2, 300/2, 150/2);         
} //this = GameCanvas
        
GameCanvas.prototype = {
    clickHandler:function(e){ //상태 바꾸기
        this.fighter.move(e.x, e.y);
        if(e.ctrlKey){
            var missile = this.fighter.fire();
            missile.move(100,1000);
            console.log("fire");
            this.missiles.push(missile);
        }
    },
    keyDownHandler:function(){
        console.log("key down");
    },
    run:function(){ //업데이트 엔진
        //상태 변경
        this.background.update();
        this.fighter.update();
        //this.enemy.update();
        
        //그림 그리기
        var ctx = this.obj.getContext("2d");
        ctx.clearRect(0, 0, this.obj.width, this.obj.height);
        this.background.draw(ctx);
        this.fighter.draw(ctx);
        for(var m of this.missiles)
            m.draw(ctx);
        

        setTimeout(this.run.bind(this), 1000/60);
    }
};

export default GameCanvas;