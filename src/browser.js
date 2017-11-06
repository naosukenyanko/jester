

import Manager from './manager';
import {load} from './loader';

function init(){
	console.log("init");
	
	load( (err) =>{
		Manager.show("battle");
	});
}

init();
