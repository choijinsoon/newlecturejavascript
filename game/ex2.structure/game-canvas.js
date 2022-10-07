import Fighter from "./fighter.js";
import Background from "./background.js";
import Missile from "./missile.js";

function GameCanvas(){
    this.obj = document.querySelector("canvas");
    this.obj.focus();
    this.obj.width = 1000;
    this.obj.height = 700;
    this.fighter = new Fighter(this.obj.width/2-32,this.obj.height-32);
    this.background = new Background();
    this.missiles = [];
    this.spaceDelay = 0;
    
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
                var missile = this.fighter.fire();
                this.missiles.push(missile);
                missile.onOutOfCanvas = function(missile){
                    //var a = this.missiles.indexOf(missile);
                    //this.missiles.splice(a, 1);
                    console.log(missile);
                    console.log(this.missiles);
                    console.log("space")
                    //this.missiles.shift();
                };
                
                console.log(this.missiles);
                
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
                        //상태 변경
                        this.background.update();
                        this.fighter.update();
                        for(var m of this.missiles)
                        m.update();
                        //this.enemy.update();
                        
                        //그림 그리기
                        var ctx = this.obj.getContext("2d");
                        ctx.clearRect(0, 0, this.obj.width, this.obj.height);
                        this.background.draw(ctx);
                        for(var m of this.missiles){
                            //if(++this.spaceDelay%5 == 0 )
                            m.draw(ctx);
                            // if (m.y < 0) this.missiles.onOutOfCanvas();
                            // if(m.y < 0)
            //     this.missiles.shift(m);
        }
        this.fighter.draw(ctx);

        
        setTimeout(this.run.bind(this), 1000/60);
    }
};

export default GameCanvas;