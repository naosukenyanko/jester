
export default class Board(){
	constructor(graphics){
		this.graphics;
	}
	
	drawBitmap(x, y, width, height, ops){
		const g = this.graphics;
		if(ops.border) g.beginStroke(ops.border);
		if(ops.fill) g.beginFill(ops.fill);
		
		
		const matrix = new createjs.Matrix2D(
			width / 320.0, 0, 
			0, height / 400.0,
			0, 0);

	}
}
