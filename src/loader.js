

const imageDir = "./images/";
const manifest = [
	{src: "king.png", id: "king"},
	{src: "knight1.png", id: "knight1"},
	{src: "knight2.png", id: "knight2"},
	{src: "bishop.png", id: "bishop"},
	{src: "jester.png", id: "jester"},

	{src: "card/king.png", id: "king_card"},
	{src: "card/knight1.png", id: "knight_card"},
	{src: "card/bishop.png", id: "bishop_card"},
	{src: "card/jester.png", id: "jester_card"},
	
];

const loader = new createjs.LoadQueue(false);

function load(callback){
	

	loader.addEventListener("complete", () => {
		callback(loader);
	});
	loader.loadManifest( manifest, true, imageDir);
	
}

export {loader, load};
