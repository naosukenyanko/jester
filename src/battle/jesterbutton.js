
import config from '../config';
import Button from './button';

let counter = 0;

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
	
	animation(){
		const card_manager = this.card_manager;
		const bs = card_manager.bs;
		const target = this.button.shape;
		
		if( bs.status.jester ){
			console.log("animation");
			counter ++;
			if( counter >= 5) counter = 0;
			target.scaleX = (1 + 0.01 * counter);
			target.scaleY = (1 + 0.01 * counter);
			target.x =  - (0.005 * 80 * counter);
			target.y =  - (0.005 * 60 * counter);
		}
	}
	
	draw(stage){
		createjs.Ticker.addEventListener("tick", 
										 this.animation.bind(this));

		this.button.onClick = this.onClick.bind(this);
		this.button.draw(stage);
	}
}
