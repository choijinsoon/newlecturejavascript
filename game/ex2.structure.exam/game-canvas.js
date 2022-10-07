//fighter 생성, canvas 생성, 클릭시 함수 호출
import Fighter from "./fighter.js";
import Enemy from "./enemy.js";
import Missile from "./missile.js";
import Background from "./background.js";

function GameCanvas(){
    this.background = new Background();
    this.fighter = new Fighter();
    //this.enemy = new Enemy();

    this.obj = document.querySelector("canvas");
    this.obj.width = 1000;
    this.obj.height = 700;
    var ctx = this.obj.getContext("2d");
    this.fighter.draw(ctx);
    this.obj.onclick = this.clickHandler.bind(this);

    this.missiles = [];
    this.enemys = [];
}

GameCanvas.prototype = {
    clickHandler:function(e){
        this.fighter.move(e.x, e.y);
        if(e.ctrlKey){
            var missile = new Missile();
            this.missiles.push(missile);
        }
    },
    run:function(){
        this.background.update();
        this.fighter.update();
        this.enemys.push(enemy);
        for(var e of this.enemys)
            e.update();
        //his.missile.update();

        var ctx = this.obj.getContext("2d");
        ctx.clearRect(0, 0, this.obj.width, this.obj.height);
        this.background.draw(ctx);
        this.fighter.draw(ctx);      
        for(var m of this.missiles)
            m.draw(ctx);
        for(var e of this.enemys)
            e.draw();

        setTimeout(this.run.bind(this), 1000/60);
    }
};

export default GameCanvas;