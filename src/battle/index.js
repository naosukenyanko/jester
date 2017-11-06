
import config from '../config';
import manager from '../manager';
import Map from './map';
import CardManager from './cardmanager';
import Charactor from './charactor';


export default class BattleStage{
	constructor(props){
		const stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;
		
		this.stage = stage;
		//this.onClick = this.onClick.bind(this);
		
		this.createMap();
		this.createCards();
		this.createCharactors();

		
		this.events = [
			"tick",
			"mousedown",
			"pressmove",
		];

		this.events.forEach( (name) => {
			this[name] = this[name].bind(this);
		});
	}
	
	createMap(){
		const stage = this.stage;
		this.map = new Map();
		this.map_s = new createjs.Shape();
		stage.addChild(this.map_s);
	}

	createCards(){
		this.card_manager = new CardManager({bs: this});
	}

	createCharactors(){
		const charactors = [];
		charactors.push(new Charactor({
			x:  7, y: 2.5, imageID: "bishop"}));
		charactors.push(new Charactor({
			x:  9, y: 2.5, imageID: "jester"}));

		charactors.push(new Charactor({
			x:  8, y: 1, imageID: "king"}));
		charactors.push(new Charactor({
			x:  6, y: 1, imageID: "knight1"}));
		charactors.push(new Charactor({
			x: 10, y: 1, imageID: "knight2"}));
		
		charactors.forEach( (chara, i)=>{
			chara.index = i;
		});
		
		this.charactors = charactors;
	}

	selectCharactor(index){
		this.charactors.forEach((chara, i) =>{
			chara.selected = (index === i)
		});

		this.drawMap();
		this.drawCharactors();
		
	}
	
	load(){

		const stage = this.stage;
		this.drawMap();
		this.drawCharactors();
		this.card_manager.draw(stage);

		stage.addEventListener("mousedown", this.mousedown );
		stage.addEventListener("pressmove", this.pressmove );
		createjs.Ticker.addEventListener("tick", this.tick);
	}

	onSelectCard(card){
		console.log("card select", card);
	}

	drawMap(){
		const stage = this.stage;

		this.map.draw(this.map_s.graphics);
	}

	drawCharactors(){
		const self = this;
		this.charactors.forEach( (chara)=>{
			chara.draw(self.map_s.graphics, self.map);
		});
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
		

		//const map = this.map.draw(this.map_s.graphics);
		this.drawMap();
		this.drawCharactors();

		evt.preventDefault();
	}

	/*
	onClick(evt){
		manager.show("menu");
	}
	*/
}
