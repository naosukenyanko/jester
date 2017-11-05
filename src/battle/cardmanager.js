
import config from '../config';

const default_card = {
	image: "",
	type: "",
	num: ""
};

function makeCardList(){
	const copy = (obj) => {
		return JSON.parse( JSON.stringify(obj) );
	};
	const list = [];
	for(let i=0; i<54 ; i++){
		list.push( copy(default_card) );
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
	}


	draw(stage){
		const self = this;
		const width = config.CardWidth;
		const height = config.CardHeight;

		const interval = config.CardWidth / 1.8;
		const offset = 140;
		const top = config.MapHeight;

		var rect_list = [];
		this.cards.forEach( (card, i) =>{
			var rect = new createjs.Shape();
			rect.graphics
				.beginStroke("#a0a0a0")
				.beginFill("#f0f0f0")
				.drawRect(0, 0, width, height);

			rect.x = offset + i * interval;
			rect.y = top;
			
			rect.addEventListener("click", (evt)=>{
				self.resetRect();
				if(self.selected === i){
					rect.y = top;
					self.selected = undefined;
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
			console.log("reset")
			rect_list.forEach( (rect) => {
				stage.setChildIndex(rect, 8);
				rect.y = top;
			});
		};
	}

};
