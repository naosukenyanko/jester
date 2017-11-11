
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
	
	showTurn(turn){
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
		
		let life = 12 * 5;
		const tick = ()=>{
			life--;
			if(life <= 0){
				board.removeAllChildren();
				board.visible = false;
				createjs.Ticker.removeEventListener("tick", tick);
			}
		};
		createjs.Ticker.addEventListener("tick", tick);
	}
}
