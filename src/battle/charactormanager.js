
import config from '../config';
import Charactor from './charactor';


export default class CharactorManager{
	constructor(props){
		this.bs = props.bs;

		this.charactors = [];
		
		this.status = {
			hold: "",
			selected: "",
			selected_index: [],
		};
	}
	
	load(){
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
		this.drawCharactors();
	}

	move(id, x){
		const charactor = this.getCharactor(id);
		charactor.move(x);
	}

	setPos(id, x){
		const charactor = this.getCharactor(id);
		charactor.x = x;	
	}

	summon(){
		const index = this.status.selected_index[0];
		const bishop = this.getCharactor("bishop");
		
		this.setPos(index, bishop.x);
		this.redrawCharactors();
	}

	resetStatus(){
		this.status.hold = "";
		this.status.selected_index = [];
		this.status.selected = "";

		this.charactors.forEach((chara, i) =>{
			chara.selected = false;
		});

		this.bs.card_manager.selectCharactor("");		
		this.redrawCharactors();
		
		this.setButtons();
	}
	
	setHold(){
		this.status.hold = this.status.selected;
	}

	selectCard(cards, turn){
		const self = this;
		const index = this.status.selected_index;
		const dir = (turn === "player" ? 1 : -1);
		
		this.setHold();
		
		//console.log("select card", cards, turn);
		
		if(cards.length === 1){
			const card = cards[0];

			if(index.length === 1){
				
				if(card.num === "M"){
					this.setPos(index, 8);
				}else if(card.num === "1+1"){
					this.move(index, 2 * dir);
				}else{
					this.move(index, card.num * dir);
				}
			}else{
				index.forEach(function(i){
					self.move(i, 1 * dir);
				});
			}

		}else{

			if(turn === "player"){
				this.move("knight1", 1 * dir);
				this.move("king", 1 * dir);
				this.move("knight2", 1 * dir);
			}else{
				this.move("knight2", 1 * dir);
				this.move("king", 1 * dir);
				this.move("knight1", 1 * dir);
			}
		}

		this.setButtons();
	}

	selectCharactor(index){
		const self = this;
		//console.log("select charactor", index, this.status);
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
			//console.log(pos, index, selected_index);
			if( pos < 0){
				//console.log("add", index);
				this.status.selected_index.push( index );
			}else{
				//console.log("delete", pos);
				this.status.selected_index.splice( pos, 1 );
			}
		}else{
			//console.log("set");
			this.status.selected_index = [index];
		}
		//console.log(this.status.selected_index);
		
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
		
		this.bs.card_manager.selectCharactor(type);		
		this.redrawCharactors();
		
		this.setButtons();
		
		
	}

	getCharactor(id){
		if( typeof(id) !== "string" ){
			return this.charactors[id];
		}
		
		for(let i in this.charactors){
			let charactor = this.charactors[i];
			if(id === charactor.id){
				return charactor;
			}
		}
		return undefined;
	}

	drawCharactors(){
		const self = this;
		const bs = this.bs;
		this.charactors.forEach( (chara)=>{
			chara.draw(bs.stage, bs.map);
		});
	}
	
	redrawCharactors(){
		const self = this;
		const bs = this.bs;
		this.charactors.forEach( (chara)=>{
			chara.redraw(bs.stage, bs.map, this.status);
		});
	}

	setButtons(){

		const hold = this.status.hold;
		const selected_index = this.status.selected_index;
		const setEnabled = (button, value)=>{
			button.setEnabled(value);
		}

		const cm = this.bs.card_manager;
		const bishop = cm.bishopButton;
		const jester = cm.jesterButton;

		setEnabled(bishop, true);
		setEnabled(jester, true);

		console.log("set buttons", hold, selected_index);
		
		if(hold){
			setEnabled(bishop, false);
			setEnabled(jester, false);
			return;
		}

		if(selected_index.lenght > 1){
			setEnabled(bishop, false);
			setEnabled(jester, false);
			return;
		}

		if(selected_index.length === 0){
			setEnabled(bishop, false);
			return;
		}

		const i = selected_index[0];
		const charactor = this.charactors[ i ];
		//console.log("charactor", i);
		const knight1 = this.getCharactor("knight1");
		const knight2 = this.getCharactor("knight2");
		const king = this.getCharactor("king");
		const bs = this.getCharactor("bishop");

		if(charactor.id === "bishop"){
			setEnabled(bishop, false);
		}
		if(charactor.id === "jester"){
			setEnabled(bishop, false);
		}

		if(charactor.id === "knight2"){
			setEnabled(bishop, king.x < bs.x );
		}
		if(charactor.id === "king"){
			setEnabled(bishop, knight1.x < bs.x);
		}
		if(charactor.id === "knight1"){
			setEnabled(bishop, bs.x < king.x );
		}

	}

}
