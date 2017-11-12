
import config from '../config';
import Button from './button';

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
	
	draw(stage){
		const card_manager = this.card_manager;
		
		this.button.onClick = () =>{
			const selected = card_manager.selected;
			if(selected.length === 0) return;

			const data = selected.map( (index) =>{
				return card_manager.player.cards[index].data;
			});
			
			card_manager.close();
			card_manager.selected = [];

			card_manager.bs.onSelectCard(data);
		};

		
		this.button.draw(stage);

		
	}
}
