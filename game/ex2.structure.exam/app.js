//콘솔 화면
import GameCanvas from "./game-canvas.js";
window.onload = function(){
    var gameCanvas = new GameCanvas();
    gameCanvas.run();
    //setInterval(gameCanvas.run.bind(gameCanvas), 1000)

};

