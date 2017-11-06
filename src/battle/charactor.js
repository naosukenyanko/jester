
import config from '../config';
import {loader} from '../loader';

export default class Charactor{
	constructor(props){
		for(var i in props){
			this[i] = props[i];
		}

	}
	
	draw(g, map){

		const pos = map.getGlobalPos(this.x, this.y);
		console.log("chara", this, pos);
		const width = 100;
		const height = 160;

		const base = {
			x: pos.x - (width /2),
			y: pos.y
		};
		
		const chara = new createjs.Shape();
		const matrix = new createjs.Matrix2D(
			width / 320.0, 0, 
			0, height / 400.0,
			base.x, base.y);
		
		g.beginStroke("#f0f0f0");
		g.beginBitmapFill(loader.getResult(this.imageID), null, matrix)
			.drawRect(base.x, base.y - height, width, height);
		
	}
}
