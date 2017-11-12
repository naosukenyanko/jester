
import Button from './button';
import config from '../config';

export default class EndButton {
	constructor(props){
		
		this.bs = props.bs;
		
	}

	turnEnd(){
		const self = this;
		const bs = this.bs;
		const turn = bs.status.turn;
		const nextTurn = (turn === "player" ? "enemy": "player");
		bs.status.turn = nextTurn;
		
		console.log("turn end");
		

		//this.status.selected_index = [];
		//this.status.selected = "";
		//this.status.hold = "";
		bs.charactor_manager.resetStatus();
		bs.status.jester = false;

		bs.card_manager.supply( nextTurn );
		bs.card_manager.draw(nextTurn);
		
		bs.effector.showTurn(nextTurn, ()=>{
			if(nextTurn === "enemy"){
				bs.enemy.phase();
			}
			
		});
	}
	
	load(stage){
		const self = this;
		const button = new Button({
			type: "polygon",
			size: 40,
			num: 6,
			x: config.ScreenWidth - 60,
			y: 40,
			font: "20px Arial",
			text: "turn",
			tx: -20,
			ty: -12,
		});
		
		button.draw(stage);
		
		button.onClick = ()=>{
			self.turnEnd();
		};
	}
}
