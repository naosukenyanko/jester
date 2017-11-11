
import config from '../config';

function getBehindPos(base, pos){
	//const height = config.MapHeight * 0.6;
	const height = config.MapHeight * pos;
	const distance = 800;

	const center_pos = {
		x: config.ScreenWidth / 2,
		y: config.MapHeight
	};

	const diff = center_pos.x - base.x;
	const theta = Math.atan( distance / diff );
	
	return {
		x : base.x + height / Math.tan(theta),
		y: base.y - height,
	}
}

export default class Map{
	constructor(props){
		
		this.viewpoint = {
			x: -config.ScreenWidth / 2,
			y: 0,
		};
	}
	
	setViewPoint(x){

		const width = config.MapWidth;
		const max = width * 0.2;
		const min = -width * 0.66;

		//console.log("view point", x, max, min);

		if(x > max) x = max;
		if(x < min) x = min;
		
		this.viewpoint.x = x;
		
	}

	getLocalPos(pos){
		const viewpoint = this.viewpoint;
		return {
			x: pos.x + viewpoint.x,
			y: pos.y + viewpoint.y,
		};
	}

	getGlobalPos(x, y){
		const viewpoint = this.viewpoint;
		const height = config.MapHeight;
		const width = config.MapWidth;
		const div = config.DivideX;
		const base = height * 0.8;		
		
		const width_interval = width * 1.0 / div;
		const pos = {
			x: (x + 0.5) * width_interval + viewpoint.x, 
			y: base,
		};
		return getBehindPos(pos, 0.1 * (y+1) );
	}

	getCharactorPos(x){
		const height = config.MapHeight;
		const width = config.MapWidth;
		const div = config.DivideX;

		const width_interval = width * 1.0 / div;

		return x * width_interval;
		
	}

	drawPanel(g, index, border, fill){
		const viewpoint = this.viewpoint;
		const height = config.MapHeight;
		const width = config.MapWidth;
		const div = config.DivideX;
		
		const width_interval = width * 1.0 / config.DivideX;

		const base = height * 0.8;

		let pos1 = this.getLocalPos({
			x: index * width_interval,
			y: base
		});
		let pos2 = getBehindPos({x: pos1.x, y: pos1.y}, 0.6);
		let pos4 = this.getLocalPos({
			x: (index+1) * width_interval,
			y: base
		});
		let pos3 = getBehindPos({x: pos4.x, y: pos4.y}, 0.6);

		//console.log(index, pos1);

		g.beginStroke(border);
		g.beginFill(fill);

		g.moveTo(pos1.x, pos1.y);
		g.lineTo(pos2.x, pos2.y);
		g.lineTo(pos3.x, pos3.y);
		g.lineTo(pos4.x, pos4.y);
		g.lineTo(pos1.x, pos1.y);
	}

	draw(g){
		//console.log("draw", this.viewpoint, parent);
		const self = this;
		
		const container = new createjs.Container();
		
		//const g = new createjs.Graphics();
		g.clear();
		g.setStrokeStyle(1);
		g.beginStroke("#c0c0c0");		

		// stripes
		[2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14].forEach( (p) => {
			self.drawPanel(g, p, '#a0a0a0', '#fafafa');
		});
		// center panel
		self.drawPanel(g, 8, '#30c0c0', '#f0ffff');
		// edge panel
		[0, 1, 15, 16].forEach( (p) => {
			self.drawPanel(g, p, '#c0c030', '#fffff0');
		});

		const rect = new createjs.Shape(g);
		//console.log("add child");
		container.addChild(rect);

		return rect;
	}
}
