
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
	
	setPos(x){
		const charactor = this;
		const turn = this.parent.bs.status.turn;

		//console.log("set pos", this.id, x);
		
		if(x < 0){ throw new Error("x must be greater equal 0") };
		if(x > 16){ throw new Error("x must be less equal 16") };
		//x = max( 0, min(x, 16) );
		
		const knight1 = this.parent.getCharactor("knight1");
		const knight2 = this.parent.getCharactor("knight2");
		const king = this.parent.getCharactor("king");
		
		//console.log("king", king.x);
		//console.log("knight1", knight1.x);
		//console.log("knight2", knight2.x);
		
		if(this.id === "king"){
			if(knight1.x >= x){
				//x = knight1.x + 1;
				throw new Error("king must be right to knight1");
			}
			if(knight2.x <= x){
				//x = knight2.x - 1;
				throw new Error("king must be left to knight2");
			}
		}

		if(this.id === "knight1"){
			if(king.x <= x){
				//x = king.x - 1;
				throw new Error("king must be right to knight1");
			}
		}

		if(this.id === "knight2"){
			if(king.x >= x){
				//x = king.x + 1;
				throw new Error("king must be left to knight2");
			}
		}
		
		charactor.x = x;
	}

	move(mx){
		const x = this.x - mx;
		this.setPos(x);

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
		this.parent.selectCharactor(index);
		this.drawMap();
	}
}
