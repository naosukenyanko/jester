
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
	
	onClick(){
		const card_manager = this.card_manager;
		const bs = card_manager.bs;
		const effector = bs.effector;
		const status = bs.status;

		const newValue = !status.jester;
		status.jester = newValue;
		card_manager.resetSelected();

		if(newValue){
			effector.jester( ()=>{
				
			});
		}
	}
	
	draw(stage){
		this.button.onClick = this.onClick.bind(this);
		this.button.draw(stage);
	}
}
