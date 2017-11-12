
import config from '../../config';
const life_max = config.FPS * 2;

export default function showTurn(stage, turn, callback){
	
	const board = new createjs.Container();
	
	const width = config.ScreenWidth;
	const height = config.ScreenHeight;
	
	
	const text = turn.toUpperCase() + " PHASE";
	const text_shape = new createjs.Text(text, "64px Arial");
	text_shape.x = (width  - 420) / 2;
	text_shape.y = (height - 60) / 2;

	const rect = new createjs.Shape();
	rect.graphics.beginFill("rgba(127,127,127,0.4)")
		.drawRect(0, 0, width, height);

	board.addChild(rect);
	board.addChild(text_shape);

	stage.addChild(board);
	
	let life = life_max;

	const tick = ()=>{
		life--;
		const p = life / (life_max * 2);
		const g = rect.graphics;
		g.clear();
		g.beginFill("rgba(127,127,127, " + p + ")")
			.drawRect(0, 0, width, height);


		if(life <= 0){
			stage.removeChild(board);
			createjs.Ticker.removeEventListener("tick", tick);
			
			if( typeof(callback) === "function" ){
				callback();
			}
		}
	};
	createjs.Ticker.addEventListener("tick", tick);
	
};
