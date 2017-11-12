
import config from '../config';
import Button from './button';

export default class JesterButton{
	constructor(props){
		this.card_manager = props.card_manager;
		
		this.button = new Button({
			x: 12,
			y: 80,
			text: "jester",
			font: "20px Arial",
			tx: 12,
			ty: 14,
		});
	}
	
	setEnabled(value){
		this.button.setEnabled(value);
	}
	
	draw(stage){
		this.button.draw(stage);
	}
}
