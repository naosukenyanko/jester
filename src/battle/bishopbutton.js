
import config from '../config';
import Button from './button';
import {rand, wait} from '../util';

export default class BishopButton{
	constructor(props){
		this.card_manager = props.card_manager;
		
		this.button = new Button({
			x: 12,
			y: 80 + 72,
			text: "bishop",
			font: "20px Arial",
			tx: 12,
			ty: 14,
		});
	}
	
	setEnabled(value){
		this.button.setEnabled(value);
	}

	onClick(){
		const bs = this.card_manager.bs;
		const charactor_manager = bs.charactor_manager;
		const effector = bs.effector;
		
		effector.summon(()=>{
			charactor_manager.summon();
			
			wait( config.FPS * 1, ()=>{
				bs.endButton.turnEnd();
			});			
		});
	}
	
	draw(stage){
		this.button.onClick = this.onClick.bind(this);
		this.button.draw(stage);
	}
}
