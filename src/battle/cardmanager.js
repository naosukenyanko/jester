
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
		const cards = [];
		for(let i=0; i<8 ; i++){
			//cards.push( rand(54) );
			let index = rand(54);
			let card = new Card({ 
				"index": i,
				"card_index": index,
				"data": card_list[index],
				"bs": bs,
				"parent": this,
			});
			cards.push( card );
		}

		this.cards = cards;
		this.selected = undefined;
		this.bs = props.bs;
	}
	
	resetRect(){
		//console.log("reset");
		if(this.anime){
			createjs.Ticker.removeEventListener("tick", self.anime);
		}
			
		this.cards.forEach( (card)=>{
			card.reset();
		});
	}

	selectCharactor(type) {
		this.resetRect();

		this.cards.forEach( (card) =>{
			card.redraw();
		});
	}

	drawCards(stage){
		this.cards.forEach( (card, i) =>{
			card.draw(stage);
		});
	}

	draw(stage){
		this.drawCards(stage);

		this.drawJesterButton(stage);
		this.drawBishopButton(stage);
		this.drawEndButton(stage);

	}

	drawEndButton(stage){
		/*
		var rect = new createjs.Shape();
		rect.graphics
			.beginStroke("#a0a0a0")
			.beginFill("#f0f0f0")
			.drawPolyStar( 0, 0, 46, 6, 0);
			//.drawRect(0, 0, 80, 60);
		rect.x = 52;
		rect.y = 80 + 72 + 120;

		stage.addChild(rect);
		*/
		const endButton = new Button({
			type: "polygon",
			size: 46,
			num: 6,
			x: 52,
			y: 80 + 72 + 120,
			font: "20px Arial",
			text: "turn",
			tx: -20,
			ty: -12,

		});
		endButton.draw(stage);
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
	}

	drawBishopButton(stage){
		const bishopButton = new Button({
			x: 12,
			y: 80 + 72,
			text: "bishop",
			font: "20px Arial",
			tx: 12,
			ty: 14,
		});
		bishopButton.draw(stage);
	}

};
