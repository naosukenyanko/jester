import config from '../config';
import {loader} from '../loader';


export default class Enemy{
	constructor(props){
		
		this.bs = props.bs;
		this.level = 1;
		this.status = {

		};
	}
	
	load(stage){
		this.stage = stage;
	}

	phase(){
		const bs = this.bs;
		const card_manager = this.bs.card_manager;
		
		bs.turnEnd();
	}

}
