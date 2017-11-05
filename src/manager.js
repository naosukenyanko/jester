

import routes from './routes';

class Manager{
	constructor(props){
		var self = this;

		const stages = {};
		for(let route in routes){
			let ops = {};
			//console.log("mount", route);
			stages[route] = new routes[route](ops);

		}

		this.stages = stages;
		this.current = undefined;
		this.show = this.show.bind(this);
	}


	show(name){
		const current = this.current;
		if(current) current.clear();
		const stage = this.stages[name];
		//console.log("stage", stage, name, this.stages);

		if(stage){
			this.current = stage;
			stage.load();
		}else{
			console.error("not found", name);
		}
	}
	
}

const manager = new Manager();
export default manager;
