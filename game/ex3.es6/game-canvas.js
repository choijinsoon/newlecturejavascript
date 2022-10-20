import Fighter from "./fighter.js";
import Background from "./background.js";
import Missile from "./missile.js";
import Enemy from "./enemy.js";
import context from "./itemContext.js";


function GameCanvas(){
    this.obj = document.querySelector("canvas");
    this.obj.focus();
    this.obj.width = 1000;
    this.obj.height = 700;
    this.fighter = new Fighter(this.obj.width/2-32,this.obj.height-32);
    context.items.push(this.fighter);

    this.background = new Background();
    this.missiles = [];
    this.maxDelay = 10;
    this.spaceDelay = 0;

    this.enemies = [];
    this.enemyInterval = 0;
    this.randAppearGap =0;
    
    
    var ctx = this.obj.getContext("2d");
    this.fighter.draw(ctx);
    
    //this.obj.onclick = this.clickHandler.bind(this);
    //this.obj.onmousemove = this.clickHandler.bind(this);// this 출력 this = GameCanvas.canvas
    this.obj.onkeydown = this.keyDownHandler.bind(this);
    this.obj.onkeyup = this.keyUpHandler.bind(this);
}
        
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
                    //this.missiles.push(missile);
                    context.items.push(missile);
                    this.spaceDelay = 0;                    
                }                    
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
            //enemy.move(this.fighter.x, this.fighter.y);
            //this.enemies.push(enemy);
            context.items.push(enemy);
            this.randAppearGap = Math.floor(Math.random()*20);
        }
        this.enemyInterval++;
        this.enemyInterval %= this.randAppearGap + 90;

        for(var e of this.enemies){
            if(e.y>700){               
                var ei = this.enemies.indexOf(e);
                this.enemies.splice(ei, 1);
            }
        }
        

        for(var item of context.items){
            item.deleteItem = function(){
                let ii = context.items.indexOf(item);
                context.items.splice(ii, 1);

            }            
        }
        console.log(context.items.length)


        //상태 변경
        this.spaceDelay++;
        this.background.update();
        for(var item of context.items)
            item.update();
        // this.fighter.update();
        // for(var m of this.missiles)
        //     m.update();
        // for(var e of this.enemies)
        //     e.update();
        
        //그림 그리기
        var ctx = this.obj.getContext("2d");
        ctx.clearRect(0, 0, this.obj.width, this.obj.height);
        this.background.draw(ctx);
        for(var item of context.items)
            item.draw(ctx);
        // for(var m of this.missiles){
        //     if(m.y<0) {
        //         var mi = this.missiles.indexOf(m);
        //         this.missiles.splice(mi, 1);
        //     }
        //     m.draw(ctx);
        // }
        // this.fighter.draw(ctx);
        // for(var e of this.enemies)
        //         e.draw(ctx);

        setTimeout(this.run.bind(this), 1000/60);
    }
};

export default GameCanvas;