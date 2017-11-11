
import config from '../config';
import {loader} from '../loader';
import Card from './card';
import Button from './button';

const types = [
	"king",
	"knight",
	"bishop",
	"jester",
];

const num_list = {
	"king": [1],
	"knight": [1, "1+1"],
	"bishop": [1, 2, 3],
	"jester": [1, 2, 3, 4, 5, "M"],
}

const default_card = {
	imageID: "king_card",
	type: "",
	num: ""
};

function makeCardList(){
	const copy = (obj) => {
		return JSON.parse( JSON.stringify(obj) );
	};
	const list = [];
	for(let i=0; i<54 ; i++){
		let card = copy(default_card);
		let type = types[ rand(4) ];
		card.type = type;
		let num_array = num_list[type];
		card.num = num_array[ rand( num_array.length ) ];
		card.imageID = card.type + "_card";
		list.push( card );
	}

	return list;
}

const card_list = makeCardList();

function rand(num){
	return Math.floor(Math.random()*num);
}

export default class CardManager{
	constructor(props){
		const bs = props.bs;


		//this.cards = cards;
		this.selected = [];
		this.bs = props.bs;
		
		this.player = {
			cards: [],
		}

		this.enemy = {
			cards: [],
		}
	}
	
	supply( turn ){

		const cards = this[turn].cards;
		const bs = this.bs;

		//console.log("supply", turn, cards);
		
		const make_card = (i)=>{
			const index = rand(54);
			return new Card({ 
				"index": i,
				"card_index": index,
				"data": card_list[index],
				"bs": bs,
				"parent": this,
			});
		};

		for(let i=cards.length-1; i>=0 ; i--){
			if( cards[i].status.used ){
				//console.log("splice", i);
				cards.splice(i, 1);
			}
		}

		for(let i=cards.length; i<8 ; i++){
			//cards.push( rand(54) );
			const card = make_card(i);
			//console.log("push", i, card);
			cards.push( card );
		}
		
		cards.forEach((card, i)=>{
			card.index = i;
		});

		this.selected = [];

		//console.log("cards", cards);
		this[turn].cards = cards;
	}
	
	close(){
		const selected = this.selected;

		selected.forEach( (index) => {
			const card = this.player.cards[ index ];
			//console.log("close", card);
			
			//card.status.used = true;
			card.close();
		});

		this.selected = [];
		this.resetRect();
	}
	
	resetRect(hold){
		const cards = this.player.cards;
		const selected = this.selected;
		
		cards.filter((card, i)=>{
			return selected.indexOf(i) < 0;
		}).forEach( (card)=>{
			card.reset(hold);
		});
		
		cards.filter((card, i)=>{
			return selected.indexOf(i) >= 0;
		}).forEach( (card)=>{
			card.reset(hold);
		});

	}

	selectCharactor(type) {
		this.selected = [];
		this.resetRect();

		this.player.cards.forEach( (card) =>{
			card.redraw();
		});
	}

	drawCards(stage, turn){
		this[ turn ].cards.forEach( (card, i) =>{
			card.draw(stage);
		});
	}

	draw(stage, turn){
		//console.log("draw card manager", turn);
		stage.removeAllChildren();
		this.drawCards(stage, turn);
		this.drawJesterButton(stage);
		this.drawBishopButton(stage);
		this.drawDrawButton(stage);

	}

	
	drawJesterButton(stage){
		const jesterButton = new Button({
			x: 12,
			y: 80,
			text: "jester",
			font: "20px Arial",
			tx: 12,
			ty: 14,
		});
		jesterButton.draw(stage);
		
		this.jesterButton = jesterButton;
	}

	drawBishopButton(stage){
		const bs = this.bs;
		const bishopButton = new Button({
			x: 12,
			y: 80 + 72,
			text: "bishop",
			font: "20px Arial",
			tx: 12,
			ty: 14,
		});


		bishopButton.draw(stage);
		this.bishopButton = bishopButton;
		
	}

	drawDrawButton(stage){
		const self = this;
		
		const drawButton = new Button({
			x: 12,
			y: 80 + 72 + 80,
			text: "open",
			font: "20px Arial",
			tx: 12,
			ty: 14,
		});

		drawButton.onClick = () =>{
			const selected = self.selected;
			if(selected.length === 0) return;

			const data = selected.map( (index) =>{
				return self.player.cards[index].data;
			});
			
			self.close();
			self.selected = [];

			self.bs.onSelectCard(data);
		};
		
		drawButton.draw(stage);
	}


};
