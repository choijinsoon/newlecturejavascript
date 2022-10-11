import GameCanvas from "./game-canvas.js";
// import test, {test1} from "./module1.js";

// var test2 = new test1();

// test2.draw();
// function add(x, y){
//     console.log(this);
//     return x+y;
// }

// var obj = {draw:function(){console.log("draw");}};

// var result = add.call(obj,3,4);
// console.log(result);

window.onload = function(){
    var gameCanvas = new GameCanvas();

    gameCanvas.run();
    //requestAnimationFrame(gameCanvas.run);

    //setInterval(gameCanvas.run.bind(gameCanvas), 1000/60);//함수를 위임 ():함수를 호출하면 반환값이 남는다
};
