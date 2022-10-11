import Fighter from "./fighter.js";
import Background from "./background.js";
import Missile from "./missile.js";
import Enemy from "./enemy.js";

function GameCanvas(){
    let enemy = new Enemy();
    enemy.x = 30;
    enemy.x++;
    console.log(enemy.x);

    this.obj = document.querySelector("canvas");
    this.obj.focus();
    this.obj.width = 1000;
    this.obj.height = 700;
    this.fighter = new Fighter(this.obj.width/2-32,this.obj.height-32);
    this.background = new Background();

    this.missiles = [];
    this.maxDelay = 10;
    this.spaceDelay = 0;

    this.enemys = [];
    this.enemyInterval = 0;
    
    var ctx = this.obj.getContext("2d");
    this.fighter.draw(ctx);
    
    //this.obj.onclick = this.clickHandler.bind(this);
    //this.obj.onmousemove = this.clickHandler.bind(this);// this 출력 this = GameCanvas.canvas
    this.obj.onkeydown = this.keyDownHandler.bind(this);
    this.obj.onkeyup = this.keyUpHandler.bind(this);

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
    },
    keyDownHandler:function(e){
        switch(e.code){
            case "ArrowLeft" :
                this.fighter.move("Left");
                break;
                
            case "ArrowRight" :
                this.fighter.move("Right");
                break;
                
            case "ArrowUp" :
                this.fighter.move("Up");
                break;
                
            case "ArrowDown" :
                this.fighter.move("Down");
                break;
                
            case "Space" :
                if(this.spaceDelay > this.maxDelay){
                    var missile = this.fighter.fire();
                    this.missiles.push(missile);
                    this.spaceDelay = 0;
                    // missile.onOutOfCanvas = function(missile){
                    //     var mi = this.missiles.indexOf(missile);
                    //     this.missiles.splice(mi, 1);
                    // }
                }
                    console.log(this.missiles.length);
                    
                    break;
            }
    },
    keyUpHandler:function(e){
        switch(e.code){
            case "ArrowLeft" :
                this.fighter.stop("Left");
                break;
                
            case "ArrowRight" :
                this.fighter.stop("Right");
                break;
            
            case "ArrowUp" :
                this.fighter.stop("Up");
                break;
                
            case "ArrowDown" :
                this.fighter.stop("Down");
                break;
        }
    },  
    run:function(){ //업데이트 엔진
        //캔버스의 상태 변경
        if(this.enemyInterval == 0){
            var enemy = new Enemy();
            enemy.move(this.fighter.x, this.fighter.y);
            this.enemys.push(enemy);
        }
        this.enemyInterval++;
        this.enemyInterval %= Math.random(20)+40;
        
        
        //상태 변경
        this.spaceDelay++;
        this.background.update();
        for(var m of this.missiles)
            m.update();
        this.fighter.update();
        for(var e of this.enemys)
            e.update();
        
        //그림 그리기
        var ctx = this.obj.getContext("2d");
        ctx.clearRect(0, 0, this.obj.width, this.obj.height);
        this.background.draw(ctx);
        for(var m of this.missiles){
            if(m.y<0) {
                var mi = this.missiles.indexOf(m);
                this.missiles.splice(mi, 1);
            }
            m.draw(ctx);
        }
        this.fighter.draw(ctx);
        for(var e of this.enemys)
            e.draw(ctx);
        
        setTimeout(this.run.bind(this), 1000/60);
    }
};

export default GameCanvas;