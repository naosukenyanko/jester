
export default class Button {
	constructor(props){
		//console.log("button", props);
		for(let i in props){
			this[i] = props[i];
		}

		this.status = {
			enabled: true,
		};
	}
	
	setEnabled(value){
		this.cover.visible = !value;
		this.status.enabled = value;
		//console.log("set enable ", value);
	}

	draw(stage){
		const self = this;
		//console.log("draw button", this);
		const border = this.border || "#a0a0a0";
		const fill = this.fill || "#f0f0f0";
		const width = this.width || 80;
		const height = this.height || 60;
		const type = this.type || "rect";
		const cache = this.cache === undefined ? true: this.cache;

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

		var cover = new createjs.Shape();
		cover.graphics.beginFill("rgba(127,127,127,0.7)")
			.drawRect(0, 0, width, height);
		this.cover = cover;
		this.cover.visible = !this.status.enabled;
		container.addChild(cover);

		if(type === "rect"){
			//container.cache(0, 0, width, height);
		}
		if(type === "polygon"){
			//container.cache(-width, -height, width * 2, height * 2);
		}
		
		container.addEventListener("click", () => {
			if( !this.status.enabled ) return;
			if(self.onClick){
				self.onClick();
			}
		});

		stage.addChild(container);
		this.shape = shape;
	}
	
};
