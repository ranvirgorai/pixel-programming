var Controller = require("../../lib/E131Controller.js");

var aController = new Controller("192.168.1.52");



var i =0;



setInterval(function(){
	i++;
	i = Math.min(i, 512);
	console.log(i);
	aController.setChannel(1,i,0);
	aController.setChannel(1,i+1,0);
	aController.setChannel(1,i+2,0);
	//aController.setChannel(2,i,0);
 	
 	aController.send();
},20);