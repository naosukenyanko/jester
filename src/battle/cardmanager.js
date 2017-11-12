
import config from '../config';
import {loader} from '../loader';
import Card from './card';
//import Button from './button';
import BishopButton from './bishopbutton';
import JesterButton from './jesterbutton';
import DrawButton from './drawbutton';

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

		this.bishopButton = new BishopButton({card_manager: this});
		this.jesterButton = new JesterButton({card_manager: this});
		this.drawButton = new DrawButton({card_manager: this});
	}

	load(stage){
		const container = new createjs.Container();
		container.y = config.CardHeight;
		container.x = 0;
		this.container = container;
		stage.addChild(container);
	}

	make_card(i){
		const index = rand(54);
		const bs = this.bs;
		return new Card({ 
			"index": i,
			"card_index": index,
			"data": card_list[index],
			"bs": bs,
			"parent": this,
		});
	}

	removeUsedCard(turn){
		const cards = this[turn].cards;
		for(let i=cards.length-1; i>=0 ; i--){
			if( cards[i].status.used ){
				//console.log("splice", i);
				cards.splice(i, 1);
			}
		}
	}

	addLackCard(turn){
		const cards = this[turn].cards;
		for(let i=cards.length; i<8 ; i++){
			//cards.push( rand(54) );
			const card = this.make_card(i);
			//console.log("push", i, card);
			cards.push( card );
		}
	}

	resetIndex(turn){
		const cards = this[turn].cards;
		cards.forEach((card, i)=>{
			card.index = i;
		});
	}
	
	supply( turn ){
		//console.log("supply", turn, cards);
		this.removeUsedCard(turn);
		this.addLackCard(turn);
		this.resetIndex(turn);

		this.selected = [];
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

	resetSelected(){
		this.selected = [];
		this.resetRect();

		this.player.cards.forEach( (card) =>{
			card.redraw();
		});		
	}
	

	selectCharactor(type) {
		this.resetSelected();
	}

	drawCards(turn){
		const stage = this.container;
		this[ turn ].cards.forEach( (card, i) =>{
			card.draw(stage);
		});
	}

	draw(turn){
		const stage = this.container;
		//console.log("draw card manager", turn);
		stage.removeAllChildren();
		this.drawCards(turn);
		this.jesterButton.draw(stage);
		this.bishopButton.draw(stage);
		this.drawButton.draw(stage);

	}


};
