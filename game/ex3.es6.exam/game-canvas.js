import Fighter from "./fighter.js";
import Background from "./background.js";
import Missile from "./missile.js";
import Enemy from "./enemy.js";

export default function GameCanvas(){
    this.obj = document.querySelector("canvas");
    this.obj.focus();
    this.obj.width = 1000;
    this.obj.height = 700;

    this.fighter = new Fighter(this.obj.width/2-32,this.obj.height-32);

    this.background = new Background();

    this.missiles = [];
    this.maxDelay = 20;
    this.spaceDelay = 0;

    this.enemies = [];
    this.enemyInterval = 0;
    this.randAppearGap = 0;
    
    var ctx = this.obj.getContext("2d");
    this.fighter.draw(ctx);
    
    //this.obj.onclick = this.clickHandler.bind(this);
    //this.obj.onmousemove = this.clickHandler.bind(this);// this 출력 this = GameCanvas.canvas
    this.obj.onkeydown = this.keyDownHandler.bind(this);
    this.obj.onkeyup = this.keyUpHandler.bind(this);
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
            var ex = Math.floor(Math.random()*this.obj.width);
            var ey = Math.floor(Math.random()*this.obj.height);
            
            if( ex<10 || ex>this.obj.width-10 || ey<10 || ey>this.obj.height-10 ){
                var enemy = new Enemy(ex, ey);
                enemy.move(this.fighter.x, this.fighter.y);
                this.enemies.push(enemy);
                this.randAppearGap = Math.floor(Math.random()*5);
                console.log("enemy");
                
            }
            // console.log("x"+ex);
            // console.log("y"+ey);
            
        }
        //this.enemyInterval++;
        //this.enemyInterval %= this.randAppearGap;
        
        for (var e of this.enemies){
            // 적기가 나 따라옴
            e.move(this.fighter.x, this.fighter.y);

            //적기가 나랑 부딪히면 터짐
            if (parseInt(e.x) > this.fighter.x-32 && parseInt(e.x) < this.fighter.x+32 &&
                parseInt(e.y) > this.fighter.y-5 && parseInt(e.y) < this.fighter.y+5){ //목적지에 도달한다면 오차범위 +-2px
                var ei = this.enemies.indexOf(e);
                this.enemies.splice(ei, 1);
            }
        }

        //미사일 적 맞추기
        for (var m of this.missiles){
            for (var e of this.enemies){
                m.move(e.x, e.y);
                if (parseInt(m.x) > parseInt(e.x)-32 && parseInt(m.x) < parseInt(e.x)+32 &&
                    parseInt(m.y) > parseInt(e.y)-5 && parseInt(m.y) < parseInt(e.y)+5){
                    var ei = this.enemies.indexOf(e);
                    var mi = this.missiles.indexOf(m);
                    this.enemies.splice(ei, 1);
                    this.missiles.splice(mi, 1);
                }
            }
        }
        
        //상태 변경
        this.spaceDelay++;
        this.background.update();
        for(var m of this.missiles)
            m.update();
        this.fighter.update();
        for(var e of this.enemies)
            e.update();

        
        //미사일 유도탄

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
        for(var e of this.enemies)
            e.draw(ctx);
        
        setTimeout(this.run.bind(this), 1000/60);
    }
};
