
import config from '../config';
import {loader} from '../loader';

const types = [
	"king",
	"knight",
	"bishop",
	"jester",
];

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
		card.type = types[ rand(4) ];
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
		const cards = [];
		for(let i=0; i<8 ; i++){
			cards.push( rand(54) );
		}

		this.cards = cards;
		this.selected = undefined;
		this.bs = props.bs;
	}


	draw(stage){
		const self = this;
		const width = config.CardWidth;
		const height = config.CardHeight;

		const interval = config.CardWidth / 1.8;
		const offset = 140;
		const top = config.MapHeight;

		const matrix = new createjs.Matrix2D(
			width / 320.0, 0, 
			0, height / 400.0,
			0, 0);
		
		var rect_list = [];
		this.cards.forEach( (card, i) =>{
			const data = card_list[ card ];
			
			var rect = new createjs.Shape();
			rect.graphics
				.beginStroke("#a0a0a0")
				.beginFill("#f0f0f0")
				.beginBitmapFill(loader.getResult(data.imageID),
								 null, matrix)
				.drawRect(0, 0, width, height);

			rect.x = offset + i * interval;
			rect.y = top;
			
			rect.addEventListener("click", (evt)=>{
				self.resetRect();
				if(self.selected === i){
					rect.y = top;
					self.selected = undefined;
					
					self.bs.onSelectCard(data);
				}else{
					self.selected = i;
					stage.setChildIndex(rect, 8);
					rect.y = top - 80;
				}
			});
			rect_list.push( rect );

			stage.addChild(rect);
		});

		this.resetRect = () =>{
			//console.log("reset");
			rect_list.forEach( (rect) => {
				stage.setChildIndex(rect, 8);
				rect.y = top;
			});
		};

		this.drawJesterButton(stage);
		this.drawBishopButton(stage);
	}
	
	drawJesterButton(stage){
		const top = config.MapHeight;
		var rect = new createjs.Shape();
		rect.graphics
			.beginStroke("#a0a0a0")
			.beginFill("#f0f0f0")
			.drawRect(0, 0, 80, 60);	
		rect.x = 12;
		rect.y = top;

		stage.addChild(rect);
	}

	drawBishopButton(stage){
		const top = config.MapHeight;
		var rect = new createjs.Shape();
		rect.graphics
			.beginStroke("#a0a0a0")
			.beginFill("#f0f0f0")
			.drawRect(0, 0, 80, 60);	
		rect.x = 12;
		rect.y = top + 72;

		stage.addChild(rect);
	}

};
