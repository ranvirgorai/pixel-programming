// sendSimple.js

var Canvas = require("canvas");
var CanvastoE131 = require("../");

var canvas = new Canvas.Canvas(200,210);

//create a simple canvas with an image on it
var context = canvas.getContext('2d');
context.fillStyle="green";
//context.fillRect(0,0,1,2);
context.fillRect(0,0,500,500);



// connect the canvas to the sender with mapping
var output = new CanvastoE131(canvas, {host: "192.168.1.52"});


output.send();


process.on ("SIGINT", function(){
    output.close();
    process.exit(1);
});

