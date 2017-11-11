

import Manager from './manager';
import {load} from './loader';
import config from './config';

function init(){
	console.log("init");

	createjs.Ticker.setFPS(config.FPS);
	
	load( (err) =>{
		Manager.show("battle");
	});
}

init();
