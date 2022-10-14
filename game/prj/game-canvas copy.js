import Fighter from "./player.js";
import Background from "./background.js";
import Missile from "./ball.js";
import Defender from "./defender.js";
import RefereeRed from "./referee.js";
import RefereeYellow from "./refereeYellow.js";
import Post from "./goalpost.js";
import Card from "./card.js";


export default class GameCanvas{
    constructor(){
        this.obj = document.querySelector("canvas");
        this.obj.focus();
        this.obj.width = 500;
        this.obj.height = 800;

        this.fighter = new Fighter(this.obj.width/2,this.obj.height-30);

        this.background = new Background();
        this.myLife = 10;
        this.score = 0;
        this.time = 100;
        this.timeDelay = 0;

        this.missiles = [];
        this.maxDelay = 20;
        this.spaceDelay = 0;

        this.defenders = [];
        this.enemiesRed = [];
        this.refereeYellows = [];
        this.enemyInterval = 0;
        this.randAppearGap = 0;

        this.cards = [];

        this.post = new Post();
        
        var ctx = this.obj.getContext("2d");
        this.fighter.draw(ctx);
        
        this.obj.onkeydown = this.keyDownHandler.bind(this);
        this.obj.onkeyup = this.keyUpHandler.bind(this);
    } 
    clickHandler(e){ 
        this.fighter.move(e.x, e.y);
    }
    keyDownHandler(e){
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
                if(this.spaceDelay > 10){
                    var missile = this.fighter.fire();
                    this.missiles.push(missile);
                    this.spaceDelay = 0;
                }
                break;
            }
    }
    keyUpHandler(e){
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
    }
    run(){ 
        //적 랜덤으로 생성
        if(this.enemyInterval == 0){
            var dx = Math.floor(Math.random()*this.obj.width);           
            var defender = new Defender(dx);
            //defender.move(this.fighter.x, this.fighter.y);
            this.defenders.push(defender);
            this.randAppearGap = Math.floor(Math.random()*30);
        }
        if(this.enemyInterval == 15){
            var ex = Math.floor(Math.random()*this.obj.width);     
            var refereeYellow = new RefereeYellow(ex);
            this.enemiesYellow.push(refereeYellow);
        }
        if(this.enemyInterval == 30){
            var ex = Math.floor(Math.random()*this.obj.width);     
            var enemyRed = new EnemyRed(ex);
            this.enemiesRed.push(enemyRed);
        }
        this.enemyInterval++;
        this.enemyInterval %= this.randAppearGap+90;
        
        //적과 충돌 시 
        for (var e of this.enemiesDefender){
            if (parseInt(e.x) > this.fighter.x-40 && parseInt(e.x) < this.fighter.x+40 &&
                parseInt(e.y) > this.fighter.y-15 && parseInt(e.y) < this.fighter.y+15){ 
                var ei = this.enemiesDefender.indexOf(e);
                this.enemiesDefender.splice(ei, 1);
                this.myLife -= 1;
            }
        }
        for (var e of this.enemiesYellow){
            if (parseInt(e.x) > this.fighter.x-40 && parseInt(e.x) < this.fighter.x+40 &&
                parseInt(e.y) > this.fighter.y-15 && parseInt(e.y) < this.fighter.y+15){ 
                var ei = this.enemiesYellow.indexOf(e);
                this.enemiesYellow.splice(ei, 1);
                this.myLife -= 1;
            }
        }
        for (var e of this.enemiesRed){
            if (parseInt(e.x) > this.fighter.x-40 && parseInt(e.x) < this.fighter.x+40 &&
                parseInt(e.y) > this.fighter.y-15 && parseInt(e.y) < this.fighter.y+15){ 
                var ei = this.enemiesRed.indexOf(e);
                this.enemiesRed.splice(ei, 1);
                this.myLife -= 2;
            }
        }

        //미사일과 적 충돌 시
        for (var m of this.missiles){
            for (var e of this.enemiesDefender){
                if (parseInt(m.x) > parseInt(e.x)-40 && parseInt(m.x) < parseInt(e.x)+40 &&
                    parseInt(m.y) > parseInt(e.y)-15 && parseInt(m.y) < parseInt(e.y)+15){
                    var ei = this.enemiesDefender.indexOf(e);
                    var mi = this.missiles.indexOf(m);
                    e.life -= 1;
                    if(e.life == 0){
                        this.enemiesDefender.splice(ei, 1);
                        this.score++;
                    }
                    this.missiles.splice(mi, 1);
                }
            }
        }

        for (var m of this.missiles){
            for (var e of this.enemiesYellow){
                if (parseInt(m.x) > parseInt(e.x)-40 && parseInt(m.x) < parseInt(e.x)+40 &&
                    parseInt(m.y) > parseInt(e.y)-15 && parseInt(m.y) < parseInt(e.y)+15){
                    var ei = this.enemiesYellow.indexOf(e);
                    var mi = this.missiles.indexOf(m);
                    e.life -= 1;
                    if(e.life == 0){
                        var card = new Card(e.x, e.y);
                        card.color = 0;
                        this.cards.push(card);
                        this.enemiesYellow.splice(ei, 1);
                    this.missiles.splice(mi, 1);
                    }
                }
            }
        }

        for (var m of this.missiles){
            for (var e of this.enemiesRed){
                if (m.x > e.x-40 && parseInt(m.x) < parseInt(e.x)+40 &&
                    parseInt(m.y) > parseInt(e.y)-15 && parseInt(m.y) < parseInt(e.y)+15){
                    var ei = this.enemiesRed.indexOf(e);
                    var mi = this.missiles.indexOf(m);
                    e.life -= 1;
                    if(e.life == 0){
                        var card = new Card(e.x, e.y);
                        card.color = 1;
                        this.cards.push(card);
                        this.enemiesRed.splice(ei, 1);
                    }
                    this.missiles.splice(mi, 1);
                    console.log(this.score);
                }
            }
        }

        //나와 카드 충돌 시
        for(var c of this.cards){
            if(this.fighter.y > c.y-0 && this.fighter.y < c.y+80){ //this.fighter.y > c.y-10 && this.fighter.y < c.y+10
                var ci = this.cards.indexOf(c);
                if(c.color == 0)
                    this.score += 1;    
                else if(c.color == 1)
                    this.score += 2;    
                this.cards.splice(ci, 1);
            }
        }

    
    

        this.spaceDelay++;
        this.background.update();
        for(var m of this.missiles)
            m.update();
        this.fighter.update();
        for(var e of this.enemiesDefender)
            e.update();
        for(var e of this.enemiesYellow)
            e.update();
        for(var e of this.enemiesRed)
            e.update();
        for(var c of this.cards)
            c.update();

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
        for(var e of this.enemiesDefender)
            e.draw(ctx);
        for(var e of this.enemiesYellow)
            e.draw(ctx);
        for(var e of this.enemiesRed)
            e.draw(ctx);
        for(var c of this.cards)
            c.draw(ctx);
        
        this.drawScore(ctx);
        this.drawLife(ctx);
        this.drawTime(ctx);

        if(this.score > 5){
            this.post.draw(ctx);
        }
        this.post.update();

        if(this.myLife == 0 || this.time == -1)
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
        ctx.fillText("Score : "+this.score, 10, 30);
    }
    drawLife(ctx){
        ctx.font = "30px bold";
        ctx.fillStyle = "white";
        ctx.fillText("Life : "+this.myLife, 380, 30);           
    }
    drawTime(ctx){
        ctx.font = "30px bold";
        ctx.fillStyle = "white";
        ctx.fillText("Time : "+this.time, 190, 30);
    }
}

