
import config from '../config';
import {loader} from '../loader';
import BattleStage from './index';

export default class Charactor{
	constructor(props){
		for(var i in props){
			this[i] = props[i];
		}

	}
	
	draw(g, map){
		const self = this;
		const pos = map.getGlobalPos(this.x, this.y);
		//console.log("chara", this, pos);
		const width = 100;
		const height = 160;

		const base = {
			x: pos.x - (width /2),
			y: pos.y
		};
		
		const matrix = new createjs.Matrix2D(
			width / 320.0, 0, 
			0, height / 400.0,
			base.x, base.y);
		
		if(this.selected){
			g.beginStroke("#d0d000");
		}else{
			g.beginStroke("transparent");
		}
		
		const rect = g.beginBitmapFill(loader.getResult(this.imageID), 
									   null, matrix)
			.drawRect(base.x, base.y - height, width, height);
		
		/*
		rect.addEventListener("click", function(){
			BattleStage.selectCharactor(self.index);
		});
		*/
		
	}
}
