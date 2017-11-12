import config from '../config';
import {loader} from '../loader';
import {rand, wait} from '../util';
const FPS = config.FPS;


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
			bs.endButton.turnEnd();
		});
		
	}

	selectCharactor(id){
		console.log("select", id);

		const card_manager = this.bs.card_manager;
		const charactor_manager = this.bs.charactor_manager;
		const map = this.bs.map;

		const chara = charactor_manager.getCharactor(id);
		charactor_manager.selectCharactor( chara.index );
		const pos = map.getCharactorPos( chara.x );
		const width = config.ScreenWidth / 2;

		console.log("set focus", id, chara.x, pos);
		this.bs.map.setFocus( -pos + width );
	}

	selectCard(index, callback){
		const bs = this.bs;
		const card_manager = this.bs.card_manager;
		const charactor_manager = this.bs.charactor_manager;
		const map = this.bs.map;
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
		
		this.selectCharactor(id);

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
