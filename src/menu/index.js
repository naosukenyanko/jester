
import config from '../config';
import manager from '../manager';

export default class Menu{
	constructor(props){
		const stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;
		
		this.stage = stage;
		this.onClick = this.onClick.bind(this);
	}
	
	load(){
		const stage = this.stage;
		this.drawMap();
		stage.update();
		
		stage.addEventListener("click", this.onClick);
	}

	clear(){
		const stage = this.stage;
		stage.removeAllChildren();
		stage.clear();
		stage.removeEventListener("click", this.onClick);
	}

	drawMap(){

		const stage = this.stage;
		var rect = new createjs.Shape();
		rect.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
		rect.x = 0;
		rect.y = 0;
		stage.addChild(rect);

	}

	onClick(evt){
		manager.show("battle");
	}
}
