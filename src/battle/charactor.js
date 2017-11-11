
import config from '../config';
import {loader} from '../loader';

const max = (val1, val2)=>{
	return val1 < val2 ? val2 : val1;
}

const min = (val1, val2)=>{
	return val1 > val2 ? val2 : val1;
}

export default class Charactor{
	constructor(props){
		for(var i in props){
			this[i] = props[i];
		}
	}

	move(mx){
		const charactor = this;
		const turn = this.parent.status.turn;
		let x = charactor.x - mx;
		x = max( 0, min(x, 16) );
		
		const knight1 = this.parent.getCharactor("knight1");
		const knight2 = this.parent.getCharactor("knight2");
		const king = this.parent.getCharactor("king");
		
		if(this.id === "king"){
			if(knight1.x >= x){
				x = knight1.x + 1;
			}
			if(knight2.x <= x){
				x = knight2.x - 1;
			}
		}

		if(this.id === "knight1"){
			if(king.x <= x){
				x = king.x - 1;
			}
		}

		if(this.id === "knight2"){
			if(king.x >= x){
				x = king.x + 1;
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
	
	selectCharactor(index){
		this.charactor_manager.selectCharactor(index);
		this.drawMap();
	}
}
