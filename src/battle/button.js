
export default class Button {
	constructor(props){
		console.log("button", props);
		for(let i in props){
			this[i] = props[i];
		}

	}
	
	draw(stage){
		console.log("draw button", this);
		const border = this.border || "#a0a0a0";
		const fill = this.fill || "#f0f0f0";
		const width = this.width || 80;
		const height = this.height || 60;
		const type = this.type || "rect";

		var container = new createjs.Container();
		var shape = new createjs.Shape();
		const g = shape.graphics;

		g.beginStroke(border)
			.beginFill(fill);

		if(type === "rect"){
			g.drawRect(0, 0, width, height);
		}
		if(type === "polygon"){
			g.drawPolyStar( 0, 0, this.size, this.num, 0);
		}
		
		container.x = this.x;
		container.y = this.y;
		container.addChild(shape);

		if(this.text){
			const font = this.font || "32px Arial";
			const t = new createjs.Text(this.text, font);
			t.x = this.tx;
			t.y = this.ty;
			container.addChild(t);
		}

		stage.addChild(container);
		this.shape = shape;
	}
	
};
