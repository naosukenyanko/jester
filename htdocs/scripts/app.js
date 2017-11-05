(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var default_card = {
	image: "",
	type: "",
	num: ""
};

function makeCardList() {
	var copy = function copy(obj) {
		return JSON.parse(JSON.stringify(obj));
	};
	var list = [];
	for (var i = 0; i < 54; i++) {
		list.push(copy(default_card));
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
	}

	_createClass(CardManager, [{
		key: "draw",
		value: function draw(stage) {
			var self = this;
			var width = _config2.default.CardWidth;
			var height = _config2.default.CardHeight;

			var interval = _config2.default.CardWidth / 1.8;
			var offset = 140;
			var top = _config2.default.MapHeight;

			var rect_list = [];
			this.cards.forEach(function (card, i) {
				var rect = new createjs.Shape();
				rect.graphics.beginStroke("#a0a0a0").beginFill("#f0f0f0").drawRect(0, 0, width, height);

				rect.x = offset + i * interval;
				rect.y = top;

				rect.addEventListener("click", function (evt) {
					self.resetRect();
					if (self.selected === i) {
						rect.y = top;
						self.selected = undefined;
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
				console.log("reset");
				rect_list.forEach(function (rect) {
					stage.setChildIndex(rect, 8);
					rect.y = top;
				});
			};
		}
	}]);

	return CardManager;
}();

exports.default = CardManager;
;

},{"../config":5}],2:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
	function Menu(props) {
		var _this = this;

		_classCallCheck(this, Menu);

		var stage = new createjs.Stage("appcontainer");
		createjs.Touch.enable(stage);
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;

		this.stage = stage;
		//this.onClick = this.onClick.bind(this);

		this.map = new _map2.default();
		this.map_s = new createjs.Shape();
		stage.addChild(this.map_s);

		this.card_manager = new _cardmanager2.default();

		this.events = ["tick", "mousedown", "pressmove"];

		this.events.forEach(function (name) {
			_this[name] = _this[name].bind(_this);
		});
	}

	_createClass(Menu, [{
		key: 'load',
		value: function load() {

			var stage = this.stage;
			this.drawMap();
			this.card_manager.draw(stage);

			stage.addEventListener("mousedown", this.mousedown);
			stage.addEventListener("pressmove", this.pressmove);
			createjs.Ticker.addEventListener("tick", this.tick);
		}
	}, {
		key: 'drawMap',
		value: function drawMap() {
			var stage = this.stage;

			this.map.draw(this.map_s.graphics);
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

			var map = this.map.draw(this.map_s.graphics);

			evt.preventDefault();
		}

		/*
  onClick(evt){
  	manager.show("menu");
  }
  */

	}]);

	return Menu;
}();

exports.default = Menu;

},{"../config":5,"../manager":6,"./cardmanager":1,"./map":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getBehindPos(base) {
	var height = _config2.default.MapHeight * 0.6;
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
			x: 0,
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
			var pos2 = getBehindPos({ x: pos1.x, y: pos1.y });
			var pos4 = this.getLocalPos({
				x: (index + 1) * width_interval,
				y: base
			});
			var pos3 = getBehindPos({ x: pos4.x, y: pos4.y });

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

},{"../config":5}],4:[function(require,module,exports){
"use strict";

var _manager = require("./manager");

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
	console.log("init");

	_manager2.default.show("battle");
}

init();

},{"./manager":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./routes":8}],7:[function(require,module,exports){
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

},{"../config":5,"../manager":6}],8:[function(require,module,exports){
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

},{"./battle":2,"./menu":7}]},{},[4]);
