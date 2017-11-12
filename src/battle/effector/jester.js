import {loader} from '../../loader';
import config from '../../config';
import {wait} from '../../util';

const life_max = config.FPS * 2;

export default function (stage, callback){
	const board = new createjs.Container();

	
	const width = config.ScreenWidth;
	const height = config.ScreenHeight;
	const image_width = 320;
	const image_height = 400;
	
	
	const rect = new createjs.Shape();
	rect.graphics.beginFill("rgba(127,127,127,0.4)")
		.drawRect(0, 0, width, height);

	const jester = new createjs.Shape();
	
	const matrix = new createjs.Matrix2D(
		image_width / 320.0, 0, 
		0, image_height / 400.0,
		0, 0);

	jester.graphics.beginBitmapFill(loader.getResult("jester"),
									null, matrix)
		.drawRect(0, 0, image_width, image_height);
	jester.x = 420;
	jester.y = 40;

	board.addChild(rect);
	board.addChild(jester);
	stage.addChild(board);

	wait(config.FPS * 1, ()=>{
		stage.removeChild(board);
		callback();
	});
}
