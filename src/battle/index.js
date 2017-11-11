
import config from '../config';
import manager from '../manager';
import Map from './map';
import CardManager from './cardmanager';
import Charactor from './charactor';
import Button from './button';
import Effector from './effector';


export default class BattleStage{
	constructor(props){
		const stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.status = {
			hold: "",
			selected: "",
			selected_index: [],
		};
		
		this.stage = stage;
		//this.onClick = this.onClick.bind(this);
		
		this.createMap();
		this.createCards();
		this.createCharactors();
		
		this.effector = new Effector();
		
		this.events = [
			"tick",
			"mousedown",
			"pressmove",
		];

		this.events.forEach( (name) => {
			this[name] = this[name].bind(this);
		});
	}

	turnEnd(){
		console.log("turn end");
		this.status.hold = "";
		this.card_manager.supply();
	}
	
	createMap(){
		const stage = this.stage;
		this.map = new Map();
		this.map_s = new createjs.Shape();
		stage.addChild(this.map_s);
	}

	createCards(){
		const container = new createjs.Container();
		container.y = config.CardHeight;
		container.x = 0;
		const stage = this.stage;
		this.card_s = container;
		stage.addChild(container);
		this.card_manager = new CardManager({bs: this});
	}

	createCharactors(){
		const self = this;
		const charactors = [];
		charactors.push(new Charactor({
			x:  9, y: 3.2, imageID: "jester", type:"jester", id:"jester"}));

		charactors.push(new Charactor({
			x:  7, y: 2.2, imageID: "bishop", type:"bishop", id:"bishop"}));

		charactors.push(new Charactor({
			x:  8, y: 1, imageID: "king", type:"king", id:"king"}));
		charactors.push(new Charactor({
			x:  6, y: 1, imageID: "knight1", type:"knight", id:"knight1"}));
		charactors.push(new Charactor({
			x: 10, y: 1, imageID: "knight2", type:"knight", id:"knight2"}));
		
		charactors.forEach( (chara, i)=>{
			chara.index = i;
			chara.parent = self;
		});
		
		this.charactors = charactors;
	}

	selectCharactor(index){
		const self = this;
		console.log("select charactor", index, this.status);
		const charactor = this.charactors[index];
		const selected = this.status.selected;
		const selected_index = this.status.selected_index;
		const hold = this.status.hold;

		if(hold && hold !== charactor.type){
			return;
		}

		if( index === undefined){
			this.selected_index = [];
		}else if( charactor && selected === charactor.type ){
			const pos = selected_index.indexOf(index);
			console.log(pos, index, selected_index);
			if( pos < 0){
				console.log("add", index);
				this.status.selected_index.push( index );
			}else{
				console.log("delete", pos);
				this.status.selected_index.splice( pos, 1 );
			}
		}else{
			console.log("set");
			this.status.selected_index = [index];
		}
		console.log(this.status.selected_index);
		
		this.charactors.forEach((chara, i) =>{
			chara.selected = (self.status.selected_index.indexOf(i) >= 0);
		});
		
		
		let type;
		if(this.status.selected_index.length > 0){
			const first = this.status.selected_index[0];
			type = this.charactors[first].type;
		}else{
			type = "";
		}
		this.status.selected = type;
		//this.status.selected_index = [index];
			
		this.card_manager.selectCharactor(type);

		this.drawMap();
		this.redrawCharactors();
		
	}
	
	load(){

		const stage = this.stage;
		this.drawMap();
		this.drawCharactors();
		this.card_manager.draw(this.card_s);
		this.drawEndButton(stage);

		this.effector.load(stage);

		stage.addEventListener("mousedown", this.mousedown );
		stage.addEventListener("pressmove", this.pressmove );

		console.log("add tick event listener");
		createjs.Ticker.addEventListener("tick", this.tick);


		this.effector.showTurn("player");
	}

	drawEndButton(stage){
		const self = this;
		const endButton = new Button({
			type: "polygon",
			size: 40,
			num: 6,
			x: config.ScreenWidth - 60,
			y: 40,
			font: "20px Arial",
			text: "turn",
			tx: -20,
			ty: -12,

		});
		endButton.draw(stage);

		endButton.onClick = ()=>{
			self.turnEnd();
		};

	}

	
	getCharactor(id){
		for(let i in this.charactors){
			let charactor = this.charactors[i];
			if(id === charactor.id){
				return charactor;
			}
		}
		return undefined;
	}

	onSelectCard(cards){
		const self = this;
		const index = this.status.selected_index;
		this.status.hold = this.status.selected;
		
		if(cards.length === 1){
			const card = cards[0];

			if(index.length === 1){
				const charactor = this.charactors[index];
				console.log("card select", card, index);
			
				if(card.num === "M"){
					charactor.x = 8;
				}else if(card.num === "1+1"){
					charactor.move(2);
				}else{
					charactor.move(card.num);
				}
			}else{
				index.forEach(function(i){
					const charactor = self.charactors[i];
					charactor.move(1);
				});
			}

		}else{
			const king = this.getCharactor("king");
			const knight1 = this.getCharactor("knight1");
			const knight2 = this.getCharactor("knight2");
			knight1.move(1);
			king.move(1);
			knight2.move(1);
		}
		this.drawMap();
		this.redrawCharactors();
	}

	drawMap(){
		const stage = this.stage;

		this.map.draw(this.map_s.graphics);
	}

	drawCharactors(){
		const self = this;
		this.charactors.forEach( (chara)=>{
			chara.draw(self.stage, self.map);
		});
	}

	redrawCharactors(){
		const self = this;
		this.charactors.forEach( (chara)=>{
			chara.redraw(self.stage, self.map, this.status);
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
		this.redrawCharactors();

		evt.preventDefault();
	}

	/*
	onClick(evt){
		manager.show("menu");
	}
	*/
}
