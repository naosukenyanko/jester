
import config from '../../config';


import showTurn from './showturn';
import summon from './summon';
import jester from './jester';

export default class Effector{
	constructor(props){
		
	}

	load(stage){
		this.stage = stage;
		//this.drawBoard(stage);
	}

	jester(callback){
		const stage = this.stage;
		jester(stage, callback);
	}
	
	summon(callback){
		const stage = this.stage;
		summon(stage, callback);
	}
	
	showTurn(turn, callback){
		const stage = this.stage;
		showTurn(stage, turn, callback);
	}
}
