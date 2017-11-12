
import config from '../config';
import {loader} from '../loader';

const top = 120;

export default class Card{
	constructor(props){
		//console.log("new card", props);
		for(let i in props){
			this[i] = props[i];
		}

		this.status = {
			used: false,
		};
		
		this.onClick = this.onClick.bind(this);
		this.animation = this.animation.bind(this);
	}

	animation(){
		const container = this.container;
		const rect = this.rect;
		if(rect.y > 0){
			container.y -= 50;
		}else{
			container.y = 0;
			createjs.Ticker.removeEventListener("tick", this.animation);
			//console.log("tickers", createjs.Ticker._listeners.tick.length)
			
			//card_manager.anime = undefined;
		}
	}

	onClick(){
		const self = this;
		const index = this.index;
		const card_manager = this.parent;
		const data = this.data;
		const container = this.container;
		const stage = this.stage;
		const bs = this.bs;
		const charactor_manager = this.bs.charactor_manager;

		const available = this.getAvailable();

		if( !available ) return;
		
		if( this.status.used ){
			return;
		}

		//console.log("click", data);
		if( data.num !== "1+1" && 
			charactor_manager.status.selected_index.length === 2){
			return;
		}
		
		const pos = card_manager.selected.indexOf(index);
		if(pos >= 0){
			container.y = top;
			card_manager.selected.splice(pos, 1);
			card_manager.resetRect(true);
		}else {
			if(card_manager.selected.length >= 2){
				return;
			}

			if(charactor_manager.status.selected !== "king"){
				card_manager.selected = [];
				card_manager.resetRect();
			}

			
			card_manager.selected.push( index );
			stage.setChildIndex(container, 8);
			//console.log("add tick event listener");
			createjs.Ticker.addEventListener("tick", this.animation);
		}

	}
	
	close() {
		const container = this.container;
		container.removeAllChildren();

		const width = config.CardWidth;
		const height = config.CardHeight;
		

		const rect = new createjs.Shape();
		const g = rect.graphics;
		g.beginStroke("#a0a0a0")
			.beginFill("#404040")
			.drawRect(0, 0, width, height);
		this.rect = rect;

		container.y = top;

		container.addChild(rect);

		this.container.cache(0, 0, width, height);

		this.status.used = true;
	}

	draw(stage){
		//console.log("draw", this);
		const self = this;
		const index = this.index;
		const card_manager = this.parent;
		const data = this.data;

		const width = config.CardWidth;
		const height = config.CardHeight;

		const interval = config.CardWidth / 1.8;
		const offset = 140;
		
		

		var container = new createjs.Container();
		var rect = new createjs.Shape();
		this.rect = rect;
		this.container = container;

		this.redraw();

		container.x = offset + index * interval;
		container.y = top;
		//rect.y = 80;
		
		const t = new createjs.Text(data.num, "32px Arial");
		t.x = 12;
		t.y = 12;
		
		container.addChild(rect);
		container.addChild(t);
		
		container.addEventListener("click", this.onClick);
		container.cache(0, 0, width, height);

		this.stage = stage;
		stage.addChild(container);
	}

	reset(hold){
		const stage = this.stage;
		const container = this.container;
		const card_manager = this.parent;

		//console.log("reset", this.index, card_manager.selected);
		
		if(card_manager.selected.indexOf(this.index) >= 0){
			//console.log("selected");
			container.y = 0;
		}else{
			//console.log("unselected");
			container.y = top;
		}

		stage.setChildIndex(container, 8);
		createjs.Ticker.removeEventListener("tick", this.animation);
		
	}

	getAvailable(){
		const data = this.data;
		const charactor_manager = this.bs.charactor_manager;
		const selected = charactor_manager.status.selected;
		const selected_index = charactor_manager.status.selected;
		const jester = this.bs.status.jester;
		
		if( jester ){
			return data.type === "jester" && 
				selected_index.length !== 2;
		}

		if( data.num === "1+1" ){
			return selected_index.length === 2;
		}

		return selected === data.type;
		
	}

	redraw(){
		//console.log("redraw", this);
		const g = this.rect.graphics;
		const data = this.data;
		const charactor_manager = this.bs.charactor_manager;

		const selected = this.getAvailable();

		const width = config.CardWidth;
		const height = config.CardHeight;

		if( this.status.used ) return;


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

		this.container.cache(0, 0, width, height);

	}

	
}
