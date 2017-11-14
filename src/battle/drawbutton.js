
import config from '../config';
import Button from './button';
import CharactorManager from './charactormanager';

export default class drawButton{
	constructor(props){
		this.card_manager = props.card_manager;
		
		this.button = new Button({
			x: 12,
			y: 80 + 72 + 80,
			text: "open",
			font: "20px Arial",
			tx: 12,
			ty: 14,
		});
	}
	
	setEnabled(value){
		this.button.setEnabled(value);
	}
	
	check(){
		const card_manager = this.card_manager;
		const charactor_manager = card_manager.bs.charactor_manager;
		const turn = card_manager.bs.status.turn;
		const selected = card_manager.selected;
		if(selected.length === 0) return;
		
		const data = selected.map( (index) =>{
			return card_manager.player.cards[index].data;
		});
		
		const cm = new CharactorManager(charactor_manager);
		cm.imaginary = true;
		//console.log("check", cm, data);			
		try{
			cm.selectCard(data, turn);
		}catch(e){
			//console.log(e);
			return this.setEnabled(false);
		}
		//console.log("check2", cm);
		return this.setEnabled(true);
	}
	
	draw(stage){
		const card_manager = this.card_manager;

		this.button.onClick = () =>{
			const selected = card_manager.selected;
			if(selected.length === 0) return;

			const data = selected.map( (index) =>{
				return card_manager.player.cards[index].data;
			});

			card_manager.close();
			card_manager.bs.onSelectCard(data);
			card_manager.resetSelected();
		};

		this.button.draw(stage);

		
	}
}
