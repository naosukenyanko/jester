
import config from '../config';
import {loader} from '../loader';

export default class Charactor{
	constructor(props){
		for(var i in props){
			this[i] = props[i];
		}
	}

	move(mx){
		const charactor = this;
		let x = charactor.x - mx;
		if(x < 0) x = 0;
		if(x > 16) x = 16;
		if(this.id === "king"){
			const knight1 = this.parent.getCharactor("knight1");
			if(knight1.x >= x){
				x = knight1.x + 1;
			}
		}
		
		charactor.x = x;

	}

	redraw(stage, map, status){
		const self = this;
		const pos = map.getGlobalPos(this.x, this.y);
		//console.log("chara", this, pos);
		const width = 100;
		const height = 160;

		const base = {
			x: pos.x - (width /2),
			y: pos.y - height,
		};
		
		const rect = this.rect;
		rect.x = base.x;
		rect.y = base.y;

		const matrix = new createjs.Matrix2D(
			width / 320.0, 0, 
			0, height / 400.0,
			0, 0);

		const g = rect.graphics;
		g.clear();

		if(this.selected){
			g.beginStroke("#d0d000");
		}else{
			g.beginStroke("transparent");
		}
		
		g.beginBitmapFill(loader.getResult(this.imageID), 
									   null, matrix)
			.drawRect(0, 0, width, height);
		

	}

	draw(stage, map){
		const self = this;
		const pos = map.getGlobalPos(this.x, this.y);
		//console.log("chara", this, pos);
		const width = 100;
		const height = 160;

		const base = {
			x: pos.x - (width /2),
			y: pos.y - height,
		};
		
		const matrix = new createjs.Matrix2D(
			width / 320.0, 0, 
			0, height / 400.0,
			0, 0);

		const rect = new createjs.Shape();
		const g = rect.graphics;

		if(this.selected){
			g.beginStroke("#d0d000");
		}else{
			g.beginStroke("transparent");
		}
		
		g.beginBitmapFill(loader.getResult(this.imageID), 
									   null, matrix)
			.drawRect(0, 0, width, height);

		rect.x = base.x;
		rect.y = base.y;

		rect.addEventListener("click", function(){
			//const index = self.selected ? undefined : self.index;
			self.parent.selectCharactor(self.index);
		});

		stage.addChild(rect);
		this.rect = rect;
			
	}
	
	/*
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
		
	}
	*/
}
