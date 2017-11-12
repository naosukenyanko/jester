
import config from '../config';
import manager from '../manager';
import Map from './map';
import CardManager from './cardmanager';
import CharactorManager from './charactormanager';
import Effector from './effector';
import Enemy from './enemy';
import EndButton from './endbutton'; 

export default class BattleStage{
	constructor(props){
		const stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.status = {
			jester: false,
			turn: "player",
		};
		
		this.stage = stage;
		
		this.createMap();
		this.createCards();
		
		this.charactor_manager = new CharactorManager({bs: this});
		this.effector = new Effector();
		this.enemy = new Enemy({bs: this});
		this.endButton = new EndButton({bs: this});

		this.events = [
			"tick",
		];

		this.events.forEach( (name) => {
			this[name] = this[name].bind(this);
		});
	}

	
	createMap(){
		const stage = this.stage;
		this.map = new Map({bs: this});
		this.map.load(stage);
	}

	createCards(){
		const card_manager = new CardManager({bs: this});
		this.card_manager = card_manager;
		const stage = this.stage;
		card_manager.load(stage);
	}

	load(){
		const turn = this.status.turn;
		this.card_manager.supply( turn );
		
		const stage = this.stage;
		
		this.drawMap();
		//this.drawCharactors();
		this.effector.load(stage);
		this.charactor_manager.load();

		this.card_manager.draw(turn);
		this.endButton.load(stage);

		//console.log("add tick event listener");
		createjs.Ticker.addEventListener("tick", this.tick);


		this.effector.showTurn(this.status.turn);
	}

	onSelectCard(cards){
		const self = this;
		const turn = this.status.turn;

		const charactor_manager = this.charactor_manager;

		charactor_manager.selectCard(cards, turn);

		this.drawMap();
		charactor_manager.redrawCharactors();
	}

	drawMap(){
		this.map.draw();
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

	
	



	/*
	onClick(evt){
		manager.show("menu");
	}
	*/
}
