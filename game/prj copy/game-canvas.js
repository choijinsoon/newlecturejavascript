import Player from "./player.js";
import Background from "./background.js";
import Ball from "./ball.js";
import Defender from "./defender.js";
import Referee from "./referee.js";
import Post from "./goalpost.js";
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
        this.score = 0;
        this.time = 100;
        this.timeDelay = 0;

        this.balls = [];
        this.maxDelay = 20;
        this.spaceDelay = 0;
        this.enemyInterval = 0;
        this.randAppearGap = 0;
        
        this.defenders = [];
        this.referees = [];
        this.cards = [];

        this.gameover = true;
        
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
                if(this.spaceDelay > 30){
                    var ball = this.player.fire();
                    this.balls.push(ball);
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
        if(this.gameover){
        //적 랜덤으로 생성
            if(this.enemyInterval == 0){         
                var dx = Math.floor(Math.random()*(this.obj.width-60)+30);  
                var defender = new Defender(dx);
                this.defenders.push(defender);
                context.items.push(defender);
                this.randAppearGap = Math.floor(Math.random()*30);
            } 
            if(this.enemyInterval == 15)  {
                var rx = Math.floor(Math.random()*(this.obj.width-60)+30);  
                var referee = new Referee(rx,0,"Y","Y");
                this.referees.push(referee);
                context.items.push(referee);
            }
            if(this.enemyInterval == 30){
                var rx = Math.floor(Math.random()*(this.obj.width-60)+30);  
                var referee = new Referee(rx,0,"R","R");
                this.referees.push(referee);
                context.items.push(referee);
            }       
            this.enemyInterval++;
            this.enemyInterval %= this.randAppearGap+90;
            
            //적과 충돌 시 
            for (var d of this.defenders){
                if(this.player.x > d.x-20 && this.player.x < d.x+20 &&
                    this.player.y > d.y-80 && this.player.y < d.y+80){ 
                    var di = this.defenders.indexOf(d);
                    this.defenders.splice(di, 1);
                    this.player.myLife -= 1;
                }
            }
            for (var r of this.referees){
                if(this.player.x > r.x-20 && this.player.x < r.x+20 &&
                    this.player.y > r.y-80 && this.player.y < r.y+80){ 
                    var ri = this.referees.indexOf(r);
                    this.referees.splice(ri, 1);
                    this.player.myLife -= r.attack;
                }
            }

            //공과 적 충돌 시
            for (var b of this.balls){
                for (var d of this.defenders){
                    if (b.x > d.x-40 && b.x < d.x+40 &&
                        b.y > d.y && b.y < d.y+15){
                        var di = this.defenders.indexOf(d);
                        var bi = this.balls.indexOf(b);
                        d.life -= 1;
                        if(d.life == 0){
                            this.defenders.splice(di, 1);
                            this.balls.splice(bi, 1);
                        }
                    }
                }
            }

            for (var b of this.balls){
                for (var r of this.referees){
                    if (b.x > r.x-40 && b.x < r.x+40 &&
                        b.y > r.y-15 && b.y < r.y+15){
                        var ri = this.referees.indexOf(r);
                        var bi = this.balls.indexOf(b);
                        r.life -= 1;
                        if(r.life == 0){
                            var card = new Card(r.x, r.y);
                            if(r.color == "Y")
                                card.color = 0;
                            else if(r.color == "R")
                                card.color = 1;
                            this.cards.push(card);
                            this.referees.splice(ri, 1);
                        }
                        this.balls.splice(bi, 1);
                    }
                }
            }

            

            //나와 카드 충돌 시
            for(var c of this.cards){
                if(this.player.x > c.x-20 && this.player.x < c.x+20 &&
                    this.player.y > c.y-0 && this.player.y < c.y+80){ 
                    let ci = this.cards.indexOf(c);
                    if(c.color == 0)
                        this.score += 1;    
                    else if(c.color == 1)
                        this.score += 2;    
                    this.cards.splice(ci, 1);
                }
            }

            for(var item of context.items){
                if(item.y > 800){
                    let ii = context.items.indexOf(item);
                    context.items.splice(ii, 1);
                }
            }
            console.log(context.items.length)

            this.spaceDelay++;
            this.background.update();
            this.player.update();
            for(var b of this.balls)
                b.update();
            for(var d of this.defenders)
                d.update();
            for(var c of this.cards)
                c.update();
            for(var r of this.referees)
                r.update();

            //그림 그리기
            var ctx = this.obj.getContext("2d");
            ctx.clearRect(0, 0, this.obj.width, this.obj.height);
            this.background.draw(ctx);
            for(var b of this.balls){
                if(b.y<0) {
                    var bi = this.balls.indexOf(b);
                    this.balls.splice(bi, 1);
                }
                b.draw(ctx);
            }
            this.player.draw(ctx);
            for(var d of this.defenders)
                d.draw(ctx);
            for(var r of this.referees)
                r.draw(ctx);
            for(var c of this.cards)
                c.draw(ctx);
            
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
            for(let i in context.items)
                if(context.items[i].y<0)
                    context.items.splice(i,1);
            

            setTimeout(this.run.bind(this), 1000/60);
        }
        
        else{
            
        }
    }
    drawScore(ctx){
        ctx.font = "30px bold";
        ctx.fillStyle = "white";
        ctx.fillText("Score : "+this.score, 10, 30);
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

