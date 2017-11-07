
import config from '../config';
import {loader} from '../loader';

const top = 120;

export default class Card{
	constructor(props){
		//console.log("new card", props);
		for(let i in props){
			this[i] = props[i];
		}
		
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
		
		this.redraw();

		container.x = offset + index * interval;
		container.y = top;
		//rect.y = 80;
		
		const t = new createjs.Text(data.num, "32px Arial");
		t.x = 12;
		t.y = 12;
		
		container.addChild(rect);
		container.addChild(t);
		
		
		container.addEventListener("click", (evt)=>{
			card_manager.resetRect();
			if( self.bs.status.selected !== data.type){
				return;
			}
			
			if(card_manager.selected === index){
				container.y = top;
				card_manager.selected = undefined;
				
				self.bs.onSelectCard(data);
			}else{
				const anime = () => {
					if(rect.y > 0){
						container.y -= 50;
					}else{
						container.y = 0;
						createjs.Ticker.removeEventListener("tick", anime);
						//console.log("tickers", createjs.Ticker._listeners.tick.length)

						card_manager.anime = undefined;
					}
				}
				card_manager.anime = anime;

				card_manager.selected = index
				stage.setChildIndex(container, 8);
				//console.log("add tick event listener");
				createjs.Ticker.addEventListener("tick", anime);
			}

		});
		
		this.container = container;
		this.rect = rect;

		this.stage = stage;
		stage.addChild(container);
	}

	reset(){
		const stage = this.stage;
		const container = this.container;
		container.y = top;
		stage.setChildIndex(container, 8);
	}

	redraw(){
		//console.log("redraw", this);
		const g = this.rect.graphics;
		const data = this.data;
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

	
}
