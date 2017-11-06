(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _loader = require('../loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = ["king", "knight", "bishop", "jester"];

var default_card = {
	imageID: "king_card",
	type: "",
	num: ""
};

function makeCardList() {
	var copy = function copy(obj) {
		return JSON.parse(JSON.stringify(obj));
	};
	var list = [];
	for (var i = 0; i < 54; i++) {
		var card = copy(default_card);
		card.type = types[rand(4)];
		card.imageID = card.type + "_card";
		list.push(card);
	}

	return list;
}

var card_list = makeCardList();

function rand(num) {
	return Math.floor(Math.random() * num);
}

var CardManager = function () {
	function CardManager(props) {
		_classCallCheck(this, CardManager);

		var cards = [];
		for (var i = 0; i < 8; i++) {
			cards.push(rand(54));
		}

		this.cards = cards;
		this.selected = undefined;
		this.bs = props.bs;
	}

	_createClass(CardManager, [{
		key: 'draw',
		value: function draw(stage) {
			var self = this;
			var width = _config2.default.CardWidth;
			var height = _config2.default.CardHeight;

			var interval = _config2.default.CardWidth / 1.8;
			var offset = 140;
			var top = _config2.default.MapHeight;

			var matrix = new createjs.Matrix2D(width / 320.0, 0, 0, height / 400.0, 0, 0);

			var rect_list = [];
			this.cards.forEach(function (card, i) {
				var data = card_list[card];

				var rect = new createjs.Shape();
				rect.graphics.beginStroke("#a0a0a0").beginFill("#f0f0f0").beginBitmapFill(_loader.loader.getResult(data.imageID), null, matrix).drawRect(0, 0, width, height);

				rect.x = offset + i * interval;
				rect.y = top;

				rect.addEventListener("click", function (evt) {
					self.resetRect();
					if (self.selected === i) {
						rect.y = top;
						self.selected = undefined;

						self.bs.onSelectCard(data);
					} else {
						self.selected = i;
						stage.setChildIndex(rect, 8);
						rect.y = top - 80;
					}
				});
				rect_list.push(rect);

				stage.addChild(rect);
			});

			this.resetRect = function () {
				//console.log("reset");
				rect_list.forEach(function (rect) {
					stage.setChildIndex(rect, 8);
					rect.y = top;
				});
			};

			this.drawJesterButton(stage);
			this.drawBishopButton(stage);
		}
	}, {
		key: 'drawJesterButton',
		value: function drawJesterButton(stage) {
			var top = _config2.default.MapHeight;
			var rect = new createjs.Shape();
			rect.graphics.beginStroke("#a0a0a0").beginFill("#f0f0f0").drawRect(0, 0, 80, 60);
			rect.x = 12;
			rect.y = top;

			stage.addChild(rect);
		}
	}, {
		key: 'drawBishopButton',
		value: function drawBishopButton(stage) {
			var top = _config2.default.MapHeight;
			var rect = new createjs.Shape();
			rect.graphics.beginStroke("#a0a0a0").beginFill("#f0f0f0").drawRect(0, 0, 80, 60);
			rect.x = 12;
			rect.y = top + 72;

			stage.addChild(rect);
		}
	}]);

	return CardManager;
}();

exports.default = CardManager;
;

},{"../config":6,"../loader":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _loader = require('../loader');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Charactor = function () {
	function Charactor(props) {
		_classCallCheck(this, Charactor);

		for (var i in props) {
			this[i] = props[i];
		}
	}

	_createClass(Charactor, [{
		key: 'draw',
		value: function draw(g, map) {
			var self = this;
			var pos = map.getGlobalPos(this.x, this.y);
			//console.log("chara", this, pos);
			var width = 100;
			var height = 160;

			var base = {
				x: pos.x - width / 2,
				y: pos.y
			};

			var matrix = new createjs.Matrix2D(width / 320.0, 0, 0, height / 400.0, base.x, base.y);

			if (this.selected) {
				g.beginStroke("#d0d000");
			} else {
				g.beginStroke("transparent");
			}

			var rect = g.beginBitmapFill(_loader.loader.getResult(this.imageID), null, matrix).drawRect(base.x, base.y - height, width, height);

			/*
   rect.addEventListener("click", function(){
   	BattleStage.selectCharactor(self.index);
   });
   */
		}
	}]);

	return Charactor;
}();

exports.default = Charactor;

},{"../config":6,"../loader":7,"./index":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _manager = require('../manager');

var _manager2 = _interopRequireDefault(_manager);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _cardmanager = require('./cardmanager');

var _cardmanager2 = _interopRequireDefault(_cardmanager);

var _charactor = require('./charactor');

var _charactor2 = _interopRequireDefault(_charactor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BattleStage = function () {
	function BattleStage(props) {
		var _this = this;

		_classCallCheck(this, BattleStage);

		var stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.stage = stage;
		//this.onClick = this.onClick.bind(this);

		this.createMap();
		this.createCards();
		this.createCharactors();

		this.events = ["tick", "mousedown", "pressmove"];

		this.events.forEach(function (name) {
			_this[name] = _this[name].bind(_this);
		});
	}

	_createClass(BattleStage, [{
		key: 'createMap',
		value: function createMap() {
			var stage = this.stage;
			this.map = new _map2.default();
			this.map_s = new createjs.Shape();
			stage.addChild(this.map_s);
		}
	}, {
		key: 'createCards',
		value: function createCards() {
			this.card_manager = new _cardmanager2.default({ bs: this });
		}
	}, {
		key: 'createCharactors',
		value: function createCharactors() {
			var charactors = [];
			charactors.push(new _charactor2.default({
				x: 7, y: 2.5, imageID: "bishop" }));
			charactors.push(new _charactor2.default({
				x: 9, y: 2.5, imageID: "jester" }));

			charactors.push(new _charactor2.default({
				x: 8, y: 1, imageID: "king" }));
			charactors.push(new _charactor2.default({
				x: 6, y: 1, imageID: "knight1" }));
			charactors.push(new _charactor2.default({
				x: 10, y: 1, imageID: "knight2" }));

			charactors.forEach(function (chara, i) {
				chara.index = i;
			});

			this.charactors = charactors;
		}
	}, {
		key: 'selectCharactor',
		value: function selectCharactor(index) {
			this.charactors.forEach(function (chara, i) {
				chara.selected = index === i;
			});

			this.drawMap();
			this.drawCharactors();
		}
	}, {
		key: 'load',
		value: function load() {

			var stage = this.stage;
			this.drawMap();
			this.drawCharactors();
			this.card_manager.draw(stage);

			stage.addEventListener("mousedown", this.mousedown);
			stage.addEventListener("pressmove", this.pressmove);
			createjs.Ticker.addEventListener("tick", this.tick);
		}
	}, {
		key: 'onSelectCard',
		value: function onSelectCard(card) {
			console.log("card select", card);
		}
	}, {
		key: 'drawMap',
		value: function drawMap() {
			var stage = this.stage;

			this.map.draw(this.map_s.graphics);
		}
	}, {
		key: 'drawCharactors',
		value: function drawCharactors() {
			var self = this;
			this.charactors.forEach(function (chara) {
				chara.draw(self.map_s.graphics, self.map);
			});
		}
	}, {
		key: 'clear',
		value: function clear() {
			var stage = this.stage;
			createjs.Ticker.removeEventListener("tick", this.tick);
			stage.removeAllChildren();
			stage.removeAllEventListener();
			stage.clear();
		}
	}, {
		key: 'tick',
		value: function tick() {
			var stage = this.stage;
			//console.log("update");
			stage.update();
		}
	}, {
		key: 'mousedown',
		value: function mousedown(evt) {
			var vp = this.map.viewpoint;
			this.offset = vp.x - evt.stageX;
			//console.log(this.offset);
			evt.preventDefault();
		}
	}, {
		key: 'pressmove',
		value: function pressmove(evt) {
			//console.log("pressmove");
			var stage = this.stage;

			var vp = this.map.viewpoint;
			this.map.setViewPoint(this.offset + evt.stageX);

			//const map = this.map.draw(this.map_s.graphics);
			this.drawMap();
			this.drawCharactors();

			evt.preventDefault();
		}

		/*
  onClick(evt){
  	manager.show("menu");
  }
  */

	}]);

	return BattleStage;
}();

exports.default = BattleStage;

},{"../config":6,"../manager":8,"./cardmanager":1,"./charactor":2,"./map":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getBehindPos(base, pos) {
	//const height = config.MapHeight * 0.6;
	var height = _config2.default.MapHeight * pos;
	var distance = 800;

	var center_pos = {
		x: _config2.default.ScreenWidth / 2,
		y: _config2.default.MapHeight
	};

	var diff = center_pos.x - base.x;
	var theta = Math.atan(distance / diff);

	return {
		x: base.x + height / Math.tan(theta),
		y: base.y - height
	};
}

var Map = function () {
	function Map(props) {
		_classCallCheck(this, Map);

		this.viewpoint = {
			x: -_config2.default.ScreenWidth / 2,
			y: 0
		};
	}

	_createClass(Map, [{
		key: 'setViewPoint',
		value: function setViewPoint(x) {

			var width = _config2.default.MapWidth;
			var max = width * 0.2;
			var min = -width * 0.66;
			//console.log("view point", x, max, min);
			if (x > max) x = max;
			if (x < min) x = min;

			this.viewpoint.x = x;
		}
	}, {
		key: 'getLocalPos',
		value: function getLocalPos(pos) {
			var viewpoint = this.viewpoint;
			return {
				x: pos.x + viewpoint.x,
				y: pos.y + viewpoint.y
			};
		}
	}, {
		key: 'getGlobalPos',
		value: function getGlobalPos(x, y) {
			var viewpoint = this.viewpoint;
			var height = _config2.default.MapHeight;
			var width = _config2.default.MapWidth;
			var div = _config2.default.DivideX;
			var base = height * 0.8;

			var width_interval = width * 1.0 / _config2.default.DivideX;
			var pos = {
				x: (x + 0.5) * width_interval + viewpoint.x,
				y: base
			};
			return getBehindPos(pos, 0.1 * (y + 1));
		}
	}, {
		key: 'drawPanel',
		value: function drawPanel(g, index, border, fill) {
			var viewpoint = this.viewpoint;
			var height = _config2.default.MapHeight;
			var width = _config2.default.MapWidth;
			var div = _config2.default.DivideX;

			var width_interval = width * 1.0 / _config2.default.DivideX;

			var base = height * 0.8;

			var pos1 = this.getLocalPos({
				x: index * width_interval,
				y: base
			});
			var pos2 = getBehindPos({ x: pos1.x, y: pos1.y }, 0.6);
			var pos4 = this.getLocalPos({
				x: (index + 1) * width_interval,
				y: base
			});
			var pos3 = getBehindPos({ x: pos4.x, y: pos4.y }, 0.6);

			//console.log(index, pos1);

			g.beginStroke(border);
			g.beginFill(fill);

			g.moveTo(pos1.x, pos1.y);
			g.lineTo(pos2.x, pos2.y);
			g.lineTo(pos3.x, pos3.y);
			g.lineTo(pos4.x, pos4.y);
			g.lineTo(pos1.x, pos1.y);
		}
	}, {
		key: 'draw',
		value: function draw(g) {
			//console.log("draw", this.viewpoint, parent);
			var self = this;

			var container = new createjs.Container();

			//const g = new createjs.Graphics();
			g.clear();
			g.setStrokeStyle(1);
			g.beginStroke("#c0c0c0");

			// stripes
			[2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14].forEach(function (p) {
				self.drawPanel(g, p, '#a0a0a0', '#fafafa');
			});
			// center panel
			self.drawPanel(g, 8, '#30c0c0', '#f0ffff');
			// edge panel
			[0, 1, 15, 16].forEach(function (p) {
				self.drawPanel(g, p, '#c0c030', '#fffff0');
			});

			var rect = new createjs.Shape(g);
			//console.log("add child");
			container.addChild(rect);

			return rect;
		}
	}]);

	return Map;
}();

exports.default = Map;

},{"../config":6}],5:[function(require,module,exports){
'use strict';

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _loader = require('./loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
	console.log("init");

	(0, _loader.load)(function (err) {
		_manager2.default.show("battle");
	});
}

init();

},{"./loader":7,"./manager":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var config = {
	ScreenWidth: 1120,
	ScreenHeight: 640,
	//MapWidth: 1120,
	MapWidth: 1120 * 2,
	MapHeight: 440,
	DivideX: 17,
	CardWidth: 200,
	CardHeight: 300
};

exports.default = config;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});


var imageDir = "./images/";
var manifest = [{ src: "king.png", id: "king" }, { src: "knight1.png", id: "knight1" }, { src: "knight2.png", id: "knight2" }, { src: "bishop.png", id: "bishop" }, { src: "jester.png", id: "jester" }, { src: "card/king.png", id: "king_card" }, { src: "card/knight1.png", id: "knight_card" }, { src: "card/bishop.png", id: "bishop_card" }, { src: "card/jester.png", id: "jester_card" }];

var loader = new createjs.LoadQueue(false);

function load(callback) {

	loader.addEventListener("complete", function () {
		callback(loader);
	});
	loader.loadManifest(manifest, true, imageDir);
}

exports.loader = loader;
exports.load = load;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
	function Manager(props) {
		_classCallCheck(this, Manager);

		var self = this;

		var stages = {};
		for (var route in _routes2.default) {
			var ops = {};
			//console.log("mount", route);
			stages[route] = new _routes2.default[route](ops);
		}

		this.stages = stages;
		this.current = undefined;
		this.show = this.show.bind(this);
	}

	_createClass(Manager, [{
		key: "show",
		value: function show(name) {
			var current = this.current;
			if (current) current.clear();
			var stage = this.stages[name];
			//console.log("stage", stage, name, this.stages);

			if (stage) {
				this.current = stage;
				stage.load();
			} else {
				console.error("not found", name);
			}
		}
	}]);

	return Manager;
}();

var manager = new Manager();
exports.default = manager;

},{"./routes":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _manager = require('../manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
	function Menu(props) {
		_classCallCheck(this, Menu);

		var stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.stage = stage;
		this.onClick = this.onClick.bind(this);
	}

	_createClass(Menu, [{
		key: 'load',
		value: function load() {
			var stage = this.stage;
			this.drawMap();
			stage.update();

			stage.addEventListener("click", this.onClick);
		}
	}, {
		key: 'clear',
		value: function clear() {
			var stage = this.stage;
			stage.removeAllChildren();
			stage.clear();
			stage.removeEventListener("click", this.onClick);
		}
	}, {
		key: 'drawMap',
		value: function drawMap() {

			var stage = this.stage;
			var rect = new createjs.Shape();
			rect.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
			rect.x = 0;
			rect.y = 0;
			stage.addChild(rect);
		}
	}, {
		key: 'onClick',
		value: function onClick(evt) {
			_manager2.default.show("battle");
		}
	}]);

	return Menu;
}();

exports.default = Menu;

},{"../config":6,"../manager":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _battle = require('./battle');

var _battle2 = _interopRequireDefault(_battle);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = {
	menu: _menu2.default,
	battle: _battle2.default
};

exports.default = routes;

},{"./battle":3,"./menu":9}]},{},[5]);
