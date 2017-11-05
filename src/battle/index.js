
import config from '../config';
import manager from '../manager';
import Map from './map';

export default class Menu{
	constructor(props){
		const stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;
		
		this.stage = stage;
		//this.onClick = this.onClick.bind(this);
		
		this.map = new Map();
		this.map_s = new createjs.Shape();
		stage.addChild(this.map_s);
		
		
		this.events = [
			"tick",
			"mousedown",
			"pressmove",
		];

		this.events.forEach( (name) => {
			this[name] = this[name].bind(this);
		});
	}
	
	load(){

		const stage = this.stage;
		this.drawMap();

		stage.addEventListener("mousedown", this.mousedown );
		stage.addEventListener("pressmove", this.pressmove );
		createjs.Ticker.addEventListener("tick", this.tick);
	}

	drawMap(){
		const stage = this.stage;


		this.map.draw(this.map_s.graphics);
	}

	clear(){
		const stage = this.stage;
		createjs.Ticker.removeEventListener("tick", this.tick);
		stage.removeAllChildren();
		stage.removeAllEventListener();
		stage.clear();

	}
	
	tick(){
		const stage = this.stage;
		//console.log("update");
		stage.update();
	}

	mousedown(evt){
		var vp = this.map.viewpoint;
		this.offset = (vp.x - evt.stageX ) ;
		//console.log(this.offset);
		evt.preventDefault();
	}

	pressmove(evt){
		//console.log("pressmove");
		const stage = this.stage;

		const vp = this.map.viewpoint;
		this.map.setViewPoint( (this.offset + evt.stageX) );
		
		const map = this.map.draw(this.map_s.graphics);

		evt.preventDefault();
	}

	/*
	onClick(evt){
		manager.show("menu");
	}
	*/
}
