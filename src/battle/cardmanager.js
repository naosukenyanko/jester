
import config from '../config';
import {loader} from '../loader';

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
		const cards = [];
		for(let i=0; i<8 ; i++){
			cards.push( rand(54) );
		}

		this.cards = cards;
		this.selected = undefined;
		this.bs = props.bs;
	}

	drawCard(g, data){
		const selected = (this.bs.status.selected === data.type);
		const width = config.CardWidth;
		const height = config.CardHeight;

		const matrix = new createjs.Matrix2D(
			width / 320.0, 0, 
			0, height / 400.0,
			0, 0);


		if(selected){
			g.beginStroke("#ffa0a0");
		}else{
			g.beginStroke("#a0a0a0");
		}
		
		g.beginStroke("#a0a0a0")
			.beginFill("#f0f0f0")
			.beginBitmapFill(loader.getResult(data.imageID),
							 null, matrix)
			.drawRect(0, 0, width, height);
		
		if(!selected){
			g.beginFill("rgba(127, 127, 127, 0.7)")
				.drawRect(0, 0, width, height);
		}
		
	}


	draw(stage){
		const self = this;
		const width = config.CardWidth;
		const height = config.CardHeight;

		const interval = config.CardWidth / 1.8;
		const offset = 140;
		
		//const top = config.MapHeight;
		const top = 120;

		
		var rect_list = [];
		this.cards.forEach( (card, i) =>{
			const data = card_list[ card ];
			
			var container = new createjs.Container();
			var rect = new createjs.Shape();
			this.drawCard(rect.graphics, data);

			container.x = offset + i * interval;
			container.y = top;
			//rect.y = 80;
			
			const t = new createjs.Text(data.num, "32px Arial");
			t.x = 12;
			t.y = 12;
			
			container.addChild(rect);
			container.addChild(t);
			
			
			container.addEventListener("click", (evt)=>{
				self.resetRect();
				if( self.bs.status.selected !== data.type){
					return;
				}
				
				if(self.selected === i){
					container.y = top;
					self.selected = undefined;
					
					self.bs.onSelectCard(data);
				}else{
					const anime = () => {
						if(rect.y > 0){
							container.y -= 50;
						}else{
							container.y = 0;
							createjs.Ticker.removeEventListener("tick", anime);
							self.anime = undefined;
						}
					}
					self.anime = anime;

					self.selected = i;
					stage.setChildIndex(container, 8);
					createjs.Ticker.addEventListener("tick", anime);
				}

			});
			rect_list.push( {
				container: container,
				rect: rect,
			} );

			stage.addChild(container);
		});

		this.resetRect = () =>{
			//console.log("reset");
			if(self.anime){
				createjs.Ticker.removeEventListener("tick", self.anime);
			}
			rect_list.forEach( (v) => {
				stage.setChildIndex(v.container, 8);
				v.container.y = top;
			});
		};
		
		this.selectCharactor = (type)=>{
			this.resetRect();

			rect_list.forEach( (v, i) =>{
				const rect = v.rect;
				const card = this.cards[i];
				const data = card_list[ card ];
				self.drawCard(rect.graphics, data);
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
		rect.y = 80;

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
		rect.y = 80 + 72;

		stage.addChild(rect);
	}

};
