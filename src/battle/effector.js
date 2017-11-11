
import config from '../config';
import {loader} from '../loader';

export default class Effector{
	constructor(props){
		
	}

	load(stage){
		
		this.drawBoard(stage);
	}
	
	drawBoard(stage){
		this.stage = stage;
		const board = new createjs.Container();
		
		this.board = board;
		board.visible = false;
		
		stage.addChild(board);
	}
	
	showTurn(turn, callback){
		const self = this;
		const board = this.board;
		const stage = this.stage;
		const width = config.ScreenWidth;
		const height = config.ScreenHeight;
		
		stage.setChildIndex(board, stage.children.length);

		board.removeAllChildren();
		board.visible = true;
		
		const text = turn.toUpperCase() + " PHASE";
		const text_shape = new createjs.Text(text, "64px Arial");
		text_shape.x = (width  - 420) / 2;
		text_shape.y = (height - 60) / 2;

		const rect = new createjs.Shape();
		rect.graphics.beginFill("rgba(127,127,127,0.4)")
			.drawRect(0, 0, width, height);

		board.addChild(rect);
		board.addChild(text_shape);

		const life_max = config.FPS * 3;
		let life = life_max;

		const tick = ()=>{
			life--;
			const p = life / (life_max * 2);
			const g = rect.graphics;
			g.clear();
			g.beginFill("rgba(127,127,127, " + p + ")")
				.drawRect(0, 0, width, height);


			if(life <= 0){
				board.removeAllChildren();
				board.visible = false;
				createjs.Ticker.removeEventListener("tick", tick);
				if( typeof(callback) === "function" ){
					callback();
				}
			}
		};
		createjs.Ticker.addEventListener("tick", tick);
	}
}
