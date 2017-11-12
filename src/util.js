
export function rand(num){
	return Math.floor( Math.random() * num );
}

export function wait(life, callback){
	
	const tick = ()=>{
		life--;
		
		if(life <= 0){
			createjs.Ticker.removeEventListener("tick", tick);
			callback();
		}
	};
	createjs.Ticker.addEventListener("tick", tick);
}

