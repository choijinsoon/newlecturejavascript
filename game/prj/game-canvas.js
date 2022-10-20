import Player from "./player.js";
import Background from "./background.js";
import Ball from "./ball.js";
import Defender from "./defender.js";
import Referee from "./referee.js";
//import Post from "./goalpost.js";
import Card from "./card.js";
import context from "./itemContext.js";

export default class GameCanvas{
    constructor(){
        this.obj = document.querySelector("canvas");
        this.obj.focus();
        this.obj.width = 500;
        this.obj.height = 800;

        this.player = new Player(this.obj.width/2,this.obj.height-30);
        context.items.push(this.player);

        this.background = new Background();
        this.time = 100;
        this.timeDelay = 0;

        this.maxDelay = 20;
        this.spaceDelay = 0;
        this.enemyInterval = 0;
        this.randAppearGap = 0;

        //this.post = new Post();
        
        var ctx = this.obj.getContext("2d");
        this.player.draw(ctx);
        
        this.obj.onkeydown = this.keyDownHandler.bind(this);
        this.obj.onkeyup = this.keyUpHandler.bind(this);
    } 
    keyDownHandler(e){
        switch(e.code){
            case "ArrowLeft" :
                this.player.move("Left");
                break;
                
            case "ArrowRight" :
                this.player.move("Right");
                break;
                
            case "ArrowUp" :
                this.player.move("Up");
                break;
                
            case "ArrowDown" :
                this.player.move("Down");
                break;
                
            case "Space" :
                if(this.spaceDelay > 10){
                    var ball = this.player.fire();
                    context.items.push(ball);
                    this.spaceDelay = 0;
                }
                break;
            }
    }
    keyUpHandler(e){
        switch(e.code){
            case "ArrowLeft" :
                this.player.stop("Left");
                break;
                
            case "ArrowRight" :
                this.player.stop("Right");
                break;
            
            case "ArrowUp" :
                this.player.stop("Up");
                break;
                
            case "ArrowDown" :
                this.player.stop("Down");
                break;
        }
    }
    run(){ 
        //적 랜덤으로 생성
        if(this.enemyInterval == 0){         
            var dx = Math.floor(Math.random()*(this.obj.width-50)+50);  
            var defender = new Defender(dx);
            context.items.push(defender);
            this.randAppearGap = Math.floor(Math.random()*30);
        } 
        if(this.enemyInterval == 15)  {
            var rx = Math.floor(Math.random()*(this.obj.width-50)+50);  
            var referee = new Referee(rx,0,'Y');
            context.items.push(referee);
        }
        if(this.enemyInterval == 30){
            var rx = Math.floor(Math.random()*(this.obj.width-50)+50);
            var referee = new Referee(rx,0,'R');
            context.items.push(referee);
        }       
        this.enemyInterval++;
        this.enemyInterval %= this.randAppearGap+300;

        /************** 객체 삭제 로직 ****************/
        context.items.forEach((element,i,arr) => {
            element.deleteItem = function(){
                arr.splice(i,1);
            }
        });

        this.spaceDelay++;
        this.background.update();
        
        for(var item of context.items)
            item.update();

        //그림 그리기
        var ctx = this.obj.getContext("2d");
        ctx.clearRect(0, 0, this.obj.width, this.obj.height);
        this.background.draw(ctx);
        
        for(var item of context.items)
            item.draw(ctx);
        
        this.drawScore(ctx);
        this.drawLife(ctx);
        this.drawTime(ctx);
        
        if(this.player.myLife == 0 || this.time == -1)
        alert("Game Over");
        
        this.timeDelay++;
        if(this.timeDelay == 60){
            this.time--;
            this.timeDelay = 0;
        }
        setTimeout(this.run.bind(this), 1000/60);
    }
    drawScore(ctx){
        ctx.font = "30px bold";
        ctx.fillStyle = "white";
        ctx.fillText("Score : "+this.player.myScore, 10, 30);
    }
    drawLife(ctx){
        ctx.font = "30px bold";
        ctx.fillStyle = "white";
        ctx.fillText("Life : "+this.player.myLife, 380, 30);           
    }
    drawTime(ctx){
        ctx.font = "30px bold";
        ctx.fillStyle = "white";
        ctx.fillText("Time : "+this.time, 190, 30);
    }
}

