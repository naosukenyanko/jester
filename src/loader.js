

const imageDir = "./images/";
const manifest = [
	{src: "king.png", id: "king"},
	{src: "knight.png", id: "knight"},
	{src: "bishop.png", id: "bishop"},
	{src: "jester.png", id: "jester"},
	
];

const loader = new createjs.LoadQueue(false);

function load(callback){
	

	loader.addEventListener("complete", () => {
		callback(loader);
	});
	loader.loadManifest( manifest, true, imageDir);
	
}

export {loader, load};
