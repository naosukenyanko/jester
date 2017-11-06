

import Manager from './manager';
import {load} from './loader';

function init(){
	console.log("init");

	createjs.Ticker.setFPS(12);
	
	load( (err) =>{
		Manager.show("battle");
	});
}

init();
