import config from '../config';
import {loader} from '../loader';

const FPS = config.FPS;

function rand(num){
	return Math.floor( Math.random() );
}

function wait(life, callback){
	
	const tick = ()=>{
		life--;
		
		if(life <= 0){
			createjs.Ticker.removeEventListener("tick", tick);
			callback();
		}
	};
	createjs.Ticker.addEventListener("tick", tick);
}

export default class Enemy{
	constructor(props){
		
		this.bs = props.bs;
		this.level = 1;
		this.status = {

		};
	}
	
	load(stage){
		this.stage = stage;
	}

	phase(){
		console.log("enemy phase");
		const bs = this.bs;
		const card_manager = this.bs.card_manager;
		
		this.selectCard( rand(7), ()=>{
			bs.turnEnd();
		});
		
	}

	selectCard(index, callback){
		const bs = this.bs;
		const card_manager = this.bs.card_manager;
		const charactor_manager = this.bs.charactor_manager;
		card_manager.selected = [index];
		const card = card_manager.enemy.cards[index];

		console.log("select", card);
		
		if( card.status.used ) {
			console.log("used");
			return callback("used");
		}
		
		const type = card.data.type;
		let id;
		if(type === "knight"){
			id = type + ( 1 + rand(2) );
		}else{
			id = type;
		}
		
		const chara = charactor_manager.getCharactor(id);
		charactor_manager.selectCharactor( chara.index );

		card.container.y = 0;


		wait(FPS * 1, (()=>{
			const data = card.data;

			//card.status.used = true;
			card.close();
			
			bs.onSelectCard( [data] ) ;
			wait(FPS * 1, ()=>{
				callback();
			});
		}).bind(this));
	}
	

}
