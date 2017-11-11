
import config from '../config';
import manager from '../manager';
import Map from './map';
import CardManager from './cardmanager';
import CharactorManager from './charactormanager';
import Button from './button';
import Effector from './effector';
import Enemy from './enemy';

export default class BattleStage{
	constructor(props){
		const stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.status = {
			//hold: "",
			jester: false,
			//selected: "",
			//selected_index: [],
			turn: "player",
		};
		
		this.stage = stage;
		//this.onClick = this.onClick.bind(this);
		
		this.createMap();
		this.createCards();
		//this.createCharactors();
		
		this.charactor_manager = new CharactorManager({bs: this});
		this.effector = new Effector();
		this.enemy = new Enemy({bs: this});

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
		const self = this;
		const turn = self.status.turn;
		const nextTurn = (turn === "player" ? "enemy": "player");
		self.status.turn = nextTurn;

		console.log("turn end");
		

		//this.status.selected_index = [];
		//this.status.selected = "";
		//this.status.hold = "";
		this.charactor_manager.resetStatus();

		self.card_manager.supply( nextTurn );
		self.card_manager.draw(this.card_s, nextTurn);
		
		self.effector.showTurn(nextTurn, ()=>{
			if(nextTurn === "enemy"){
				self.enemy.phase();
			}
			
		});
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

	load(){
		const turn = this.status.turn;
		this.card_manager.supply( turn );
		
		const stage = this.stage;
		
		this.drawMap();
		//this.drawCharactors();
		this.effector.load(stage);
		this.charactor_manager.load();

		this.card_manager.draw(this.card_s, turn);
		this.drawEndButton(stage);
		
		stage.addEventListener("mousedown", this.mousedown );
		stage.addEventListener("pressmove", this.pressmove );

		//console.log("add tick event listener");
		createjs.Ticker.addEventListener("tick", this.tick);


		this.effector.showTurn(this.status.turn);
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

	onSelectCard(cards){
		const self = this;
		const turn = this.status.turn;

		const charactor_manager = this.charactor_manager;

		charactor_manager.selectCard(cards, turn);

		this.drawMap();
		charactor_manager.redrawCharactors();
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
		

		//const map = this.map.draw(this.map_s.graphics);
		this.drawMap();
		this.charactor_manager.redrawCharactors();

		evt.preventDefault();
	}

	/*
	onClick(evt){
		manager.show("menu");
	}
	*/
}
