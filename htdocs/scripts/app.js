(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BishopButton = function () {
	function BishopButton(props) {
		_classCallCheck(this, BishopButton);

		this.card_manager = props.card_manager;

		this.button = new _button2.default({
			x: 12,
			y: 80 + 72,
			text: "bishop",
			font: "20px Arial",
			tx: 12,
			ty: 14
		});
	}

	_createClass(BishopButton, [{
		key: 'setEnabled',
		value: function setEnabled(value) {
			this.button.setEnabled(value);
		}
	}, {
		key: 'onClick',
		value: function onClick() {
			var bs = this.card_manager.bs;
			var charactor_manager = bs.charactor_manager;
			var effector = bs.effector;

			effector.summon(function () {
				charactor_manager.summon();

				(0, _util.wait)(_config2.default.FPS * 1, function () {
					bs.endButton.turnEnd();
				});
			});
		}
	}, {
		key: 'draw',
		value: function draw(stage) {
			this.button.onClick = this.onClick.bind(this);
			this.button.draw(stage);
		}
	}]);

	return BishopButton;
}();

exports.default = BishopButton;

},{"../config":18,"../util":23,"./button":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
	function Button(props) {
		_classCallCheck(this, Button);

		//console.log("button", props);
		for (var i in props) {
			this[i] = props[i];
		}

		this.status = {
			enabled: true
		};
	}

	_createClass(Button, [{
		key: "setEnabled",
		value: function setEnabled(value) {
			this.cover.visible = !value;
			this.status.enabled = value;
			//console.log("set enable ", value);
		}
	}, {
		key: "draw",
		value: function draw(stage) {
			var _this = this;

			var self = this;
			//console.log("draw button", this);
			var border = this.border || "#a0a0a0";
			var fill = this.fill || "#f0f0f0";
			var width = this.width || 80;
			var height = this.height || 60;
			var type = this.type || "rect";
			var cache = this.cache === undefined ? true : this.cache;

			var container = new createjs.Container();
			var shape = new createjs.Shape();
			var g = shape.graphics;

			g.beginStroke(border).beginFill(fill);

			if (type === "rect") {
				g.drawRect(0, 0, width, height);
			}
			if (type === "polygon") {
				g.drawPolyStar(0, 0, this.size, this.num, 0);
			}

			container.x = this.x;
			container.y = this.y;
			container.addChild(shape);

			if (this.text) {
				var font = this.font || "32px Arial";
				var t = new createjs.Text(this.text, font);
				t.x = this.tx;
				t.y = this.ty;
				container.addChild(t);
			}

			var cover = new createjs.Shape();
			cover.graphics.beginFill("rgba(127,127,127,0.7)").drawRect(0, 0, width, height);
			this.cover = cover;
			this.cover.visible = !this.status.enabled;
			container.addChild(cover);

			if (type === "rect") {
				//container.cache(0, 0, width, height);
			}
			if (type === "polygon") {
				//container.cache(-width, -height, width * 2, height * 2);
			}

			container.addEventListener("click", function () {
				if (!_this.status.enabled) return;
				if (self.onClick) {
					self.onClick();
				}
			});

			stage.addChild(container);
			this.shape = shape;
			this.container = container;
		}
	}]);

	return Button;
}();

exports.default = Button;
;

},{}],3:[function(require,module,exports){
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

var top = 120;

var Card = function () {
	function Card(props) {
		_classCallCheck(this, Card);

		//console.log("new card", props);
		for (var i in props) {
			this[i] = props[i];
		}

		this.status = {
			used: false
		};

		this.onClick = this.onClick.bind(this);
		this.animation = this.animation.bind(this);
	}

	_createClass(Card, [{
		key: 'animation',
		value: function animation() {
			var container = this.container;
			var rect = this.rect;
			if (rect.y > 0) {
				container.y -= 50;
			} else {
				container.y = 0;
				createjs.Ticker.removeEventListener("tick", this.animation);
				//console.log("tickers", createjs.Ticker._listeners.tick.length)

				//card_manager.anime = undefined;
			}
		}
	}, {
		key: 'onClick',
		value: function onClick() {
			var self = this;
			var index = this.index;
			var card_manager = this.parent;
			var data = this.data;
			var container = this.container;
			var stage = this.stage;
			var bs = this.bs;
			var charactor_manager = this.bs.charactor_manager;

			var available = this.getAvailable();

			if (!available) return;

			if (this.status.used) {
				return;
			}

			//console.log("click", data);
			if (data.num !== "1+1" && charactor_manager.status.selected_index.length === 2) {
				return;
			}

			var pos = card_manager.selected.indexOf(index);
			if (pos >= 0) {
				container.y = top;
				card_manager.selected.splice(pos, 1);
				card_manager.resetRect(true);
			} else {
				if (card_manager.selected.length >= 2) {
					return;
				}

				if (charactor_manager.status.selected !== "king") {
					card_manager.selected = [];
					card_manager.resetRect();
				}

				card_manager.selected.push(index);
				stage.setChildIndex(container, 8);
				//console.log("add tick event listener");
				createjs.Ticker.addEventListener("tick", this.animation);
			}
		}
	}, {
		key: 'close',
		value: function close() {
			var container = this.container;
			container.removeAllChildren();

			var width = _config2.default.CardWidth;
			var height = _config2.default.CardHeight;

			var rect = new createjs.Shape();
			var g = rect.graphics;
			g.beginStroke("#a0a0a0").beginFill("#404040").drawRect(0, 0, width, height);
			this.rect = rect;

			container.y = top;

			container.addChild(rect);

			this.container.cache(0, 0, width, height);

			this.status.used = true;
		}
	}, {
		key: 'draw',
		value: function draw(stage) {
			//console.log("draw", this);
			var self = this;
			var index = this.index;
			var card_manager = this.parent;
			var data = this.data;

			var width = _config2.default.CardWidth;
			var height = _config2.default.CardHeight;

			var interval = _config2.default.CardWidth / 1.8;
			var offset = 140;

			var container = new createjs.Container();
			var rect = new createjs.Shape();
			this.rect = rect;
			this.container = container;

			this.redraw();

			container.x = offset + index * interval;
			container.y = top;
			//rect.y = 80;

			var t = new createjs.Text(data.num, "32px Arial");
			t.x = 12;
			t.y = 12;

			container.addChild(rect);
			container.addChild(t);

			container.addEventListener("click", this.onClick);
			container.cache(0, 0, width, height);

			this.stage = stage;
			stage.addChild(container);
		}
	}, {
		key: 'reset',
		value: function reset(hold) {
			var stage = this.stage;
			var container = this.container;
			var card_manager = this.parent;

			//console.log("reset", this.index, card_manager.selected);

			if (card_manager.selected.indexOf(this.index) >= 0) {
				//console.log("selected");
				container.y = 0;
			} else {
				//console.log("unselected");
				container.y = top;
			}

			stage.setChildIndex(container, 8);
			createjs.Ticker.removeEventListener("tick", this.animation);
		}
	}, {
		key: 'getAvailable',
		value: function getAvailable() {
			var data = this.data;
			var charactor_manager = this.bs.charactor_manager;
			var selected = charactor_manager.status.selected;
			var selected_index = charactor_manager.status.selected;
			var jester = this.bs.status.jester;

			if (jester) {
				return data.type === "jester" && selected_index.length !== 2;
			}

			if (data.num === "1+1") {
				return selected_index.length === 2;
			}

			return selected === data.type;
		}
	}, {
		key: 'redraw',
		value: function redraw() {
			//console.log("redraw", this);
			var g = this.rect.graphics;
			var data = this.data;
			var charactor_manager = this.bs.charactor_manager;

			var selected = this.getAvailable();

			var width = _config2.default.CardWidth;
			var height = _config2.default.CardHeight;

			if (this.status.used) return;

			var matrix = new createjs.Matrix2D(width / 320.0, 0, 0, height / 400.0, 0, 0);

			if (selected) {
				g.beginStroke("#ffa0a0");
			} else {
				g.beginStroke("#a0a0a0");
			}

			g.beginStroke("#a0a0a0").beginFill("#f0f0f0").beginBitmapFill(_loader.loader.getResult(data.imageID), null, matrix).drawRect(0, 0, width, height);

			if (!selected) {
				g.beginFill("rgba(127, 127, 127, 0.7)").drawRect(0, 0, width, height);
			}

			this.container.cache(0, 0, width, height);
		}
	}]);

	return Card;
}();

exports.default = Card;

},{"../config":18,"../loader":19}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//import Button from './button';


var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _loader = require('../loader');

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

var _bishopbutton = require('./bishopbutton');

var _bishopbutton2 = _interopRequireDefault(_bishopbutton);

var _jesterbutton = require('./jesterbutton');

var _jesterbutton2 = _interopRequireDefault(_jesterbutton);

var _drawbutton = require('./drawbutton');

var _drawbutton2 = _interopRequireDefault(_drawbutton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = ["king", "knight", "bishop", "jester"];

var num_list = {
	"king": [1],
	"knight": [1, "1+1"],
	"bishop": [1, 2, 3],
	"jester": [1, 2, 3, 4, 5, "M"]
};

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
		var type = types[rand(4)];
		card.type = type;
		var num_array = num_list[type];
		card.num = num_array[rand(num_array.length)];
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

		var bs = props.bs;

		//this.cards = cards;
		this.selected = [];
		this.bs = props.bs;

		this.player = {
			cards: []
		};

		this.enemy = {
			cards: []
		};

		this.bishopButton = new _bishopbutton2.default({ card_manager: this });
		this.jesterButton = new _jesterbutton2.default({ card_manager: this });
		this.drawButton = new _drawbutton2.default({ card_manager: this });
	}

	_createClass(CardManager, [{
		key: 'load',
		value: function load(stage) {
			var container = new createjs.Container();
			container.y = _config2.default.CardHeight;
			container.x = 0;
			this.container = container;
			stage.addChild(container);
		}
	}, {
		key: 'make_card',
		value: function make_card(i) {
			var index = rand(54);
			var bs = this.bs;
			return new _card2.default({
				"index": i,
				"card_index": index,
				"data": card_list[index],
				"bs": bs,
				"parent": this
			});
		}
	}, {
		key: 'removeUsedCard',
		value: function removeUsedCard(turn) {
			var cards = this[turn].cards;
			for (var i = cards.length - 1; i >= 0; i--) {
				if (cards[i].status.used) {
					//console.log("splice", i);
					cards.splice(i, 1);
				}
			}
		}
	}, {
		key: 'addLackCard',
		value: function addLackCard(turn) {
			var cards = this[turn].cards;
			for (var i = cards.length; i < 8; i++) {
				//cards.push( rand(54) );
				var card = this.make_card(i);
				//console.log("push", i, card);
				cards.push(card);
			}
		}
	}, {
		key: 'resetIndex',
		value: function resetIndex(turn) {
			var cards = this[turn].cards;
			cards.forEach(function (card, i) {
				card.index = i;
			});
		}
	}, {
		key: 'supply',
		value: function supply(turn) {
			//console.log("supply", turn, cards);
			this.removeUsedCard(turn);
			this.addLackCard(turn);
			this.resetIndex(turn);

			this.selected = [];
		}
	}, {
		key: 'close',
		value: function close() {
			var _this = this;

			var selected = this.selected;

			selected.forEach(function (index) {
				var card = _this.player.cards[index];
				//console.log("close", card);

				//card.status.used = true;
				card.close();
			});

			this.selected = [];
			this.resetRect();
		}
	}, {
		key: 'resetRect',
		value: function resetRect(hold) {
			var cards = this.player.cards;
			var selected = this.selected;

			cards.filter(function (card, i) {
				return selected.indexOf(i) < 0;
			}).forEach(function (card) {
				card.reset(hold);
			});

			cards.filter(function (card, i) {
				return selected.indexOf(i) >= 0;
			}).forEach(function (card) {
				card.reset(hold);
			});
		}
	}, {
		key: 'resetSelected',
		value: function resetSelected() {
			this.selected = [];
			this.resetRect();

			this.player.cards.forEach(function (card) {
				card.redraw();
			});
		}
	}, {
		key: 'selectCharactor',
		value: function selectCharactor(type) {
			this.resetSelected();
		}
	}, {
		key: 'drawCards',
		value: function drawCards(turn) {
			var stage = this.container;
			this[turn].cards.forEach(function (card, i) {
				card.draw(stage);
			});
		}
	}, {
		key: 'draw',
		value: function draw(turn) {
			var stage = this.container;
			//console.log("draw card manager", turn);
			stage.removeAllChildren();
			this.drawCards(turn);
			this.jesterButton.draw(stage);
			this.bishopButton.draw(stage);
			this.drawButton.draw(stage);
		}
	}]);

	return CardManager;
}();

exports.default = CardManager;
;

},{"../config":18,"../loader":19,"./bishopbutton":1,"./card":3,"./drawbutton":7,"./jesterbutton":15}],5:[function(require,module,exports){
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

var max = function max(val1, val2) {
	return val1 < val2 ? val2 : val1;
};

var min = function min(val1, val2) {
	return val1 > val2 ? val2 : val1;
};

var Charactor = function () {
	function Charactor(props) {
		_classCallCheck(this, Charactor);

		for (var i in props) {
			this[i] = props[i];
		}
	}

	_createClass(Charactor, [{
		key: 'move',
		value: function move(mx) {
			var charactor = this;
			var turn = this.parent.status.turn;
			var x = charactor.x - mx;
			x = max(0, min(x, 16));

			var knight1 = this.parent.getCharactor("knight1");
			var knight2 = this.parent.getCharactor("knight2");
			var king = this.parent.getCharactor("king");

			if (this.id === "king") {
				if (knight1.x >= x) {
					x = knight1.x + 1;
				}
				if (knight2.x <= x) {
					x = knight2.x - 1;
				}
			}

			if (this.id === "knight1") {
				if (king.x <= x) {
					x = king.x - 1;
				}
			}

			if (this.id === "knight2") {
				if (king.x >= x) {
					x = king.x + 1;
				}
			}

			charactor.x = x;
		}
	}, {
		key: 'redraw',
		value: function redraw(stage, map, status) {
			var self = this;
			var pos = map.getGlobalPos(this.x, this.y);
			//console.log("chara", this, pos);
			var width = 100;
			var height = 160;

			var base = {
				x: pos.x - width / 2,
				y: pos.y - height
			};

			var rect = this.rect;
			rect.x = base.x;
			rect.y = base.y;

			var matrix = new createjs.Matrix2D(width / 320.0, 0, 0, height / 400.0, 0, 0);

			var g = rect.graphics;
			g.clear();

			if (this.selected) {
				g.beginStroke("#d0d000");
			} else {
				g.beginStroke("transparent");
			}

			g.beginBitmapFill(_loader.loader.getResult(this.imageID), null, matrix).drawRect(0, 0, width, height);
		}
	}, {
		key: 'draw',
		value: function draw(stage, map) {
			var self = this;
			var pos = map.getGlobalPos(this.x, this.y);
			//console.log("chara", this, pos);
			var width = 100;
			var height = 160;

			var base = {
				x: pos.x - width / 2,
				y: pos.y - height
			};

			var matrix = new createjs.Matrix2D(width / 320.0, 0, 0, height / 400.0, 0, 0);

			var rect = new createjs.Shape();
			var g = rect.graphics;

			if (this.selected) {
				g.beginStroke("#d0d000");
			} else {
				g.beginStroke("transparent");
			}

			g.beginBitmapFill(_loader.loader.getResult(this.imageID), null, matrix).drawRect(0, 0, width, height);

			rect.x = base.x;
			rect.y = base.y;

			rect.addEventListener("click", function () {
				//const index = self.selected ? undefined : self.index;
				self.parent.selectCharactor(self.index);
			});

			stage.addChild(rect);
			this.rect = rect;
		}
	}, {
		key: 'selectCharactor',
		value: function selectCharactor(index) {
			this.charactor_manager.selectCharactor(index);
			this.drawMap();
		}
	}]);

	return Charactor;
}();

exports.default = Charactor;

},{"../config":18,"../loader":19}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _charactor = require('./charactor');

var _charactor2 = _interopRequireDefault(_charactor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharactorManager = function () {
	function CharactorManager(props) {
		_classCallCheck(this, CharactorManager);

		this.bs = props.bs;

		this.charactors = [];

		this.status = {
			hold: "",
			selected: "",
			selected_index: []
		};
	}

	_createClass(CharactorManager, [{
		key: 'load',
		value: function load() {
			var self = this;
			var charactors = [];
			charactors.push(new _charactor2.default({
				x: 9, y: 3.2, imageID: "jester", type: "jester", id: "jester" }));

			charactors.push(new _charactor2.default({
				x: 7, y: 2.2, imageID: "bishop", type: "bishop", id: "bishop" }));

			charactors.push(new _charactor2.default({
				x: 8, y: 1, imageID: "king", type: "king", id: "king" }));
			charactors.push(new _charactor2.default({
				x: 6, y: 1, imageID: "knight1", type: "knight", id: "knight1" }));
			charactors.push(new _charactor2.default({
				x: 10, y: 1, imageID: "knight2", type: "knight", id: "knight2" }));

			charactors.forEach(function (chara, i) {
				chara.index = i;
				chara.parent = self;
			});

			this.charactors = charactors;
			this.drawCharactors();
		}
	}, {
		key: 'move',
		value: function move(id, x) {
			var charactor = this.getCharactor(id);
			charactor.move(x);
		}
	}, {
		key: 'setPos',
		value: function setPos(id, x) {
			var charactor = this.getCharactor(id);
			charactor.x = x;
		}
	}, {
		key: 'summon',
		value: function summon() {
			var index = this.status.selected_index[0];
			var bishop = this.getCharactor("bishop");

			this.setPos(index, bishop.x);
			this.redrawCharactors();
		}
	}, {
		key: 'resetStatus',
		value: function resetStatus() {
			this.status.hold = "";
			this.status.selected_index = [];
			this.status.selected = "";

			this.charactors.forEach(function (chara, i) {
				chara.selected = false;
			});

			this.bs.card_manager.selectCharactor("");
			this.redrawCharactors();

			this.setButtons();
		}
	}, {
		key: 'setHold',
		value: function setHold() {
			this.status.hold = this.status.selected;
		}
	}, {
		key: 'selectCard',
		value: function selectCard(cards, turn) {
			var self = this;
			var index = this.status.selected_index;
			var dir = turn === "player" ? 1 : -1;

			this.setHold();

			//console.log("select card", cards, turn);

			if (cards.length === 1) {
				var card = cards[0];

				if (index.length === 1) {

					if (card.num === "M") {
						this.setPos(index, 8);
					} else if (card.num === "1+1") {
						this.move(index, 2 * dir);
					} else {
						this.move(index, card.num * dir);
					}
				} else {
					index.forEach(function (i) {
						self.move(i, 1 * dir);
					});
				}
			} else {

				if (turn === "player") {
					this.move("knight1", 1 * dir);
					this.move("king", 1 * dir);
					this.move("knight2", 1 * dir);
				} else {
					this.move("knight2", 1 * dir);
					this.move("king", 1 * dir);
					this.move("knight1", 1 * dir);
				}
			}

			this.setButtons();
		}
	}, {
		key: 'selectCharactor',
		value: function selectCharactor(index) {
			var self = this;
			//console.log("select charactor", index, this.status);
			var charactor = this.charactors[index];
			var selected = this.status.selected;
			var selected_index = this.status.selected_index;
			var hold = this.status.hold;

			if (hold && hold !== charactor.type) {
				return;
			}

			if (index === undefined) {
				this.selected_index = [];
			} else if (charactor && selected === charactor.type) {
				var pos = selected_index.indexOf(index);
				//console.log(pos, index, selected_index);
				if (pos < 0) {
					//console.log("add", index);
					this.status.selected_index.push(index);
				} else {
					//console.log("delete", pos);
					this.status.selected_index.splice(pos, 1);
				}
			} else {
				//console.log("set");
				this.status.selected_index = [index];
			}
			//console.log(this.status.selected_index);

			this.charactors.forEach(function (chara, i) {
				chara.selected = self.status.selected_index.indexOf(i) >= 0;
			});

			var type = void 0;
			if (this.status.selected_index.length > 0) {
				var first = this.status.selected_index[0];
				type = this.charactors[first].type;
			} else {
				type = "";
			}
			this.status.selected = type;
			//this.status.selected_index = [index];

			this.bs.card_manager.selectCharactor(type);
			this.redrawCharactors();

			this.setButtons();
		}
	}, {
		key: 'getCharactor',
		value: function getCharactor(id) {
			if (typeof id !== "string") {
				return this.charactors[id];
			}

			for (var i in this.charactors) {
				var charactor = this.charactors[i];
				if (id === charactor.id) {
					return charactor;
				}
			}
			return undefined;
		}
	}, {
		key: 'drawCharactors',
		value: function drawCharactors() {
			var self = this;
			var bs = this.bs;
			this.charactors.forEach(function (chara) {
				chara.draw(bs.stage, bs.map);
			});
		}
	}, {
		key: 'redrawCharactors',
		value: function redrawCharactors() {
			var _this = this;

			var self = this;
			var bs = this.bs;
			this.charactors.forEach(function (chara) {
				chara.redraw(bs.stage, bs.map, _this.status);
			});
		}
	}, {
		key: 'setButtons',
		value: function setButtons() {

			var hold = this.status.hold;
			var selected_index = this.status.selected_index;
			var setEnabled = function setEnabled(button, value) {
				button.setEnabled(value);
			};

			var cm = this.bs.card_manager;
			var bishop = cm.bishopButton;
			var jester = cm.jesterButton;

			setEnabled(bishop, true);
			setEnabled(jester, true);

			console.log("set buttons", hold, selected_index);

			if (hold) {
				setEnabled(bishop, false);
				setEnabled(jester, false);
				return;
			}

			if (selected_index.lenght > 1) {
				setEnabled(bishop, false);
				setEnabled(jester, false);
				return;
			}

			if (selected_index.length === 0) {
				setEnabled(bishop, false);
				return;
			}

			var i = selected_index[0];
			var charactor = this.charactors[i];
			//console.log("charactor", i);
			var knight1 = this.getCharactor("knight1");
			var knight2 = this.getCharactor("knight2");
			var king = this.getCharactor("king");
			var bs = this.getCharactor("bishop");

			if (charactor.id === "bishop") {
				setEnabled(bishop, false);
			}
			if (charactor.id === "jester") {
				setEnabled(bishop, false);
			}

			if (charactor.id === "knight2") {
				setEnabled(bishop, king.x < bs.x);
			}
			if (charactor.id === "king") {
				setEnabled(bishop, knight1.x < bs.x);
			}
			if (charactor.id === "knight1") {
				setEnabled(bishop, bs.x < king.x);
			}
		}
	}]);

	return CharactorManager;
}();

exports.default = CharactorManager;

},{"../config":18,"./charactor":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var drawButton = function () {
	function drawButton(props) {
		_classCallCheck(this, drawButton);

		this.card_manager = props.card_manager;

		this.button = new _button2.default({
			x: 12,
			y: 80 + 72 + 80,
			text: "open",
			font: "20px Arial",
			tx: 12,
			ty: 14
		});
	}

	_createClass(drawButton, [{
		key: 'setEnabled',
		value: function setEnabled(value) {
			this.button.setEnabled(value);
		}
	}, {
		key: 'draw',
		value: function draw(stage) {
			var card_manager = this.card_manager;

			this.button.onClick = function () {
				var selected = card_manager.selected;
				if (selected.length === 0) return;

				var data = selected.map(function (index) {
					return card_manager.player.cards[index].data;
				});

				card_manager.close();
				card_manager.selected = [];

				card_manager.bs.onSelectCard(data);
			};

			this.button.draw(stage);
		}
	}]);

	return drawButton;
}();

exports.default = drawButton;

},{"../config":18,"./button":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _showturn = require('./showturn');

var _showturn2 = _interopRequireDefault(_showturn);

var _summon2 = require('./summon');

var _summon3 = _interopRequireDefault(_summon2);

var _jester2 = require('./jester');

var _jester3 = _interopRequireDefault(_jester2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Effector = function () {
	function Effector(props) {
		_classCallCheck(this, Effector);
	}

	_createClass(Effector, [{
		key: 'load',
		value: function load(stage) {
			this.stage = stage;
			//this.drawBoard(stage);
		}
	}, {
		key: 'jester',
		value: function jester(callback) {
			var stage = this.stage;
			(0, _jester3.default)(stage, callback);
		}
	}, {
		key: 'summon',
		value: function summon(callback) {
			var stage = this.stage;
			(0, _summon3.default)(stage, callback);
		}
	}, {
		key: 'showTurn',
		value: function showTurn(turn, callback) {
			var stage = this.stage;
			(0, _showturn2.default)(stage, turn, callback);
		}
	}]);

	return Effector;
}();

exports.default = Effector;

},{"../../config":18,"./jester":9,"./showturn":10,"./summon":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (stage, callback) {
	var board = new createjs.Container();

	var width = _config2.default.ScreenWidth;
	var height = _config2.default.ScreenHeight;
	var image_width = 320;
	var image_height = 400;

	var rect = new createjs.Shape();
	rect.graphics.beginFill("rgba(127,127,127,0.4)").drawRect(0, 0, width, height);

	var jester = new createjs.Shape();

	var matrix = new createjs.Matrix2D(image_width / 320.0, 0, 0, image_height / 400.0, 0, 0);

	jester.graphics.beginBitmapFill(_loader.loader.getResult("jester"), null, matrix).drawRect(0, 0, image_width, image_height);
	jester.x = 420;
	jester.y = 40;

	board.addChild(rect);
	board.addChild(jester);
	stage.addChild(board);

	(0, _util.wait)(_config2.default.FPS * 1, function () {
		stage.removeChild(board);
		callback();
	});
};

var _loader = require('../../loader');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var life_max = _config2.default.FPS * 2;

},{"../../config":18,"../../loader":19,"../../util":23}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = showTurn;

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var life_max = _config2.default.FPS * 2;

function showTurn(stage, turn, callback) {

	var board = new createjs.Container();

	var width = _config2.default.ScreenWidth;
	var height = _config2.default.ScreenHeight;

	var text = turn.toUpperCase() + " PHASE";
	var text_shape = new createjs.Text(text, "64px Arial");
	text_shape.x = (width - 420) / 2;
	text_shape.y = (height - 60) / 2;

	var rect = new createjs.Shape();
	rect.graphics.beginFill("rgba(127,127,127,0.4)").drawRect(0, 0, width, height);

	board.addChild(rect);
	board.addChild(text_shape);

	stage.addChild(board);

	var life = life_max;

	var tick = function tick() {
		life--;
		var p = life / (life_max * 2);
		var g = rect.graphics;
		g.clear();
		g.beginFill("rgba(127,127,127, " + p + ")").drawRect(0, 0, width, height);

		if (life <= 0) {
			stage.removeChild(board);
			createjs.Ticker.removeEventListener("tick", tick);

			if (typeof callback === "function") {
				callback();
			}
		}
	};
	createjs.Ticker.addEventListener("tick", tick);
};

},{"../../config":18}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = summon;

var _loader = require('../../loader');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var life_max = _config2.default.FPS * 2;

function summon(stage, callback) {
	var board = new createjs.Container();

	stage.setChildIndex(board, stage.children.length);

	var width = _config2.default.ScreenWidth;
	var height = _config2.default.ScreenHeight;
	var image_width = 320;
	var image_height = 400;

	var rect = new createjs.Shape();
	rect.graphics.beginFill("rgba(127,127,127,0.4)").drawRect(0, 0, width, height);

	var bishop = new createjs.Shape();

	var matrix = new createjs.Matrix2D(image_width / 320.0, 0, 0, image_height / 400.0, 0, 0);
	bishop.graphics.beginBitmapFill(_loader.loader.getResult("bishop"), null, matrix).drawRect(0, 0, image_width, image_height);
	bishop.x = 420;
	bishop.y = 40;

	board.addChild(rect);
	board.addChild(bishop);
	stage.addChild(board);

	(0, _util.wait)(_config2.default.FPS * 1, function () {
		stage.removeChild(board);
		callback();
	});
}

},{"../../config":18,"../../loader":19,"../../util":23}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EndButton = function () {
	function EndButton(props) {
		_classCallCheck(this, EndButton);

		this.bs = props.bs;
	}

	_createClass(EndButton, [{
		key: 'turnEnd',
		value: function turnEnd() {
			var self = this;
			var bs = this.bs;
			var turn = bs.status.turn;
			var nextTurn = turn === "player" ? "enemy" : "player";
			bs.status.turn = nextTurn;

			console.log("turn end");

			//this.status.selected_index = [];
			//this.status.selected = "";
			//this.status.hold = "";
			bs.charactor_manager.resetStatus();
			bs.status.jester = false;

			bs.card_manager.supply(nextTurn);
			bs.card_manager.draw(nextTurn);

			bs.effector.showTurn(nextTurn, function () {
				if (nextTurn === "enemy") {
					bs.enemy.phase();
				}
			});
		}
	}, {
		key: 'load',
		value: function load(stage) {
			var self = this;
			var button = new _button2.default({
				type: "polygon",
				size: 40,
				num: 6,
				x: _config2.default.ScreenWidth - 60,
				y: 40,
				font: "20px Arial",
				text: "turn",
				tx: -20,
				ty: -12
			});

			button.draw(stage);

			button.onClick = function () {
				self.turnEnd();
			};
		}
	}]);

	return EndButton;
}();

exports.default = EndButton;

},{"../config":18,"./button":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _loader = require('../loader');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FPS = _config2.default.FPS;

var Enemy = function () {
	function Enemy(props) {
		_classCallCheck(this, Enemy);

		this.bs = props.bs;
		this.level = 1;
		this.status = {};
	}

	_createClass(Enemy, [{
		key: 'load',
		value: function load(stage) {
			this.stage = stage;
		}
	}, {
		key: 'phase',
		value: function phase() {
			console.log("enemy phase");
			var bs = this.bs;
			var card_manager = this.bs.card_manager;

			this.selectCard((0, _util.rand)(7), function () {
				bs.endButton.turnEnd();
			});
		}
	}, {
		key: 'selectCharactor',
		value: function selectCharactor(id) {
			console.log("select", id);

			var card_manager = this.bs.card_manager;
			var charactor_manager = this.bs.charactor_manager;
			var map = this.bs.map;

			var chara = charactor_manager.getCharactor(id);
			charactor_manager.selectCharactor(chara.index);
			var pos = map.getCharactorPos(chara.x);
			var width = _config2.default.ScreenWidth / 2;

			console.log("set focus", id, chara.x, pos);
			this.bs.map.setFocus(-pos + width);
		}
	}, {
		key: 'selectCard',
		value: function selectCard(index, callback) {
			var bs = this.bs;
			var card_manager = this.bs.card_manager;
			var charactor_manager = this.bs.charactor_manager;
			var map = this.bs.map;
			card_manager.selected = [index];
			var card = card_manager.enemy.cards[index];

			console.log("select", card);

			if (card.status.used) {
				console.log("used");
				return callback("used");
			}

			var type = card.data.type;
			var id = void 0;
			if (type === "knight") {
				id = type + (1 + (0, _util.rand)(2));
			} else {
				id = type;
			}

			this.selectCharactor(id);

			card.container.y = 0;

			(0, _util.wait)(FPS * 1, function () {
				var data = card.data;

				//card.status.used = true;
				card.close();

				bs.onSelectCard([data]);
				(0, _util.wait)(FPS * 1, function () {
					callback();
				});
			}.bind(this));
		}
	}]);

	return Enemy;
}();

exports.default = Enemy;

},{"../config":18,"../loader":19,"../util":23}],14:[function(require,module,exports){
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

var _charactormanager = require('./charactormanager');

var _charactormanager2 = _interopRequireDefault(_charactormanager);

var _effector = require('./effector');

var _effector2 = _interopRequireDefault(_effector);

var _enemy = require('./enemy');

var _enemy2 = _interopRequireDefault(_enemy);

var _endbutton = require('./endbutton');

var _endbutton2 = _interopRequireDefault(_endbutton);

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

		this.status = {
			jester: false,
			turn: "player"
		};

		this.stage = stage;

		this.createMap();
		this.createCards();

		this.charactor_manager = new _charactormanager2.default({ bs: this });
		this.effector = new _effector2.default();
		this.enemy = new _enemy2.default({ bs: this });
		this.endButton = new _endbutton2.default({ bs: this });

		this.events = ["tick"];

		this.events.forEach(function (name) {
			_this[name] = _this[name].bind(_this);
		});
	}

	_createClass(BattleStage, [{
		key: 'createMap',
		value: function createMap() {
			var stage = this.stage;
			this.map = new _map2.default({ bs: this });
			this.map.load(stage);
		}
	}, {
		key: 'createCards',
		value: function createCards() {
			var card_manager = new _cardmanager2.default({ bs: this });
			this.card_manager = card_manager;
			var stage = this.stage;
			card_manager.load(stage);
		}
	}, {
		key: 'load',
		value: function load() {
			var turn = this.status.turn;
			this.card_manager.supply(turn);

			var stage = this.stage;

			this.drawMap();
			//this.drawCharactors();
			this.effector.load(stage);
			this.charactor_manager.load();

			this.card_manager.draw(turn);
			this.endButton.load(stage);

			//console.log("add tick event listener");
			createjs.Ticker.addEventListener("tick", this.tick);

			this.effector.showTurn(this.status.turn);
		}
	}, {
		key: 'onSelectCard',
		value: function onSelectCard(cards) {
			var self = this;
			var turn = this.status.turn;

			var charactor_manager = this.charactor_manager;

			charactor_manager.selectCard(cards, turn);

			this.drawMap();
			charactor_manager.redrawCharactors();
		}
	}, {
		key: 'drawMap',
		value: function drawMap() {
			this.map.draw();
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

		/*
  onClick(evt){
  	manager.show("menu");
  }
  */

	}]);

	return BattleStage;
}();

exports.default = BattleStage;

},{"../config":18,"../manager":20,"./cardmanager":4,"./charactormanager":6,"./effector":8,"./endbutton":12,"./enemy":13,"./map":16}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JesterButton = function () {
	function JesterButton(props) {
		_classCallCheck(this, JesterButton);

		this.card_manager = props.card_manager;

		this.button = new _button2.default({
			x: 12,
			y: 80,
			text: "jester",
			font: "20px Arial",
			tx: 12,
			ty: 14
		});
	}

	_createClass(JesterButton, [{
		key: 'setEnabled',
		value: function setEnabled(value) {
			this.button.setEnabled(value);
		}
	}, {
		key: 'onClick',
		value: function onClick() {
			var card_manager = this.card_manager;
			var bs = card_manager.bs;
			var effector = bs.effector;
			var status = bs.status;

			var newValue = !status.jester;
			status.jester = newValue;
			card_manager.resetSelected();

			if (newValue) {
				effector.jester(function () {});
			}
		}
	}, {
		key: 'draw',
		value: function draw(stage) {
			this.button.onClick = this.onClick.bind(this);
			this.button.draw(stage);
		}
	}]);

	return JesterButton;
}();

exports.default = JesterButton;

},{"../config":18,"./button":2}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require("../config");

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

		this.bs = props.bs;

		this.pressmove = this.pressmove.bind(this);
		this.mousedown = this.mousedown.bind(this);
	}

	_createClass(Map, [{
		key: "load",
		value: function load(stage) {

			var shape = new createjs.Shape();
			stage.addChild(shape);
			this.shape = shape;

			shape.addEventListener("mousedown", this.mousedown);
			shape.addEventListener("pressmove", this.pressmove);
		}
	}, {
		key: "setViewPoint",
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
		key: "getLocalPos",
		value: function getLocalPos(pos) {
			var viewpoint = this.viewpoint;
			return {
				x: pos.x + viewpoint.x,
				y: pos.y + viewpoint.y
			};
		}
	}, {
		key: "getGlobalPos",
		value: function getGlobalPos(x, y) {
			var viewpoint = this.viewpoint;
			var height = _config2.default.MapHeight;
			var width = _config2.default.MapWidth;
			var div = _config2.default.DivideX;
			var base = height * 0.8;

			var width_interval = width * 1.0 / div;
			var pos = {
				x: (x + 0.5) * width_interval + viewpoint.x,
				y: base
			};
			return getBehindPos(pos, 0.1 * (y + 1));
		}
	}, {
		key: "getCharactorPos",
		value: function getCharactorPos(x) {
			var height = _config2.default.MapHeight;
			var width = _config2.default.MapWidth;
			var div = _config2.default.DivideX;

			var width_interval = width * 1.0 / div;

			return x * width_interval;
		}
	}, {
		key: "drawPanel",
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
		key: "draw",
		value: function draw() {
			var g = this.shape.graphics;
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

			container.cache(0, 0, _config2.default.ScreenWidth, _config2.default.ScreenHeight);

			return rect;
		}
	}, {
		key: "mousedown",
		value: function mousedown(evt) {
			var vp = this.viewpoint;
			this.offset = vp.x - evt.stageX;
			//console.log(this.offset);
			evt.preventDefault();
		}
	}, {
		key: "pressmove",
		value: function pressmove(evt) {
			//console.log("pressmove");

			var vp = this.viewpoint;
			this.setFocus(this.offset + evt.stageX);

			evt.preventDefault();
		}
	}, {
		key: "setFocus",
		value: function setFocus(x) {

			this.setViewPoint(x);
			this.draw();
			this.bs.charactor_manager.redrawCharactors();
		}
	}]);

	return Map;
}();

exports.default = Map;

},{"../config":18}],17:[function(require,module,exports){
'use strict';

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _loader = require('./loader');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
	console.log("init");

	createjs.Ticker.setFPS(_config2.default.FPS);

	(0, _loader.load)(function (err) {
		_manager2.default.show("battle");
	});
}

init();

},{"./config":18,"./loader":19,"./manager":20}],18:[function(require,module,exports){
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
	CardHeight: 300,
	FPS: 12
};

exports.default = config;

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./routes":22}],21:[function(require,module,exports){
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

},{"../config":18,"../manager":20}],22:[function(require,module,exports){
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

},{"./battle":14,"./menu":21}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rand = rand;
exports.wait = wait;
function rand(num) {
	return Math.floor(Math.random() * num);
}

function wait(life, callback) {

	var tick = function tick() {
		life--;

		if (life <= 0) {
			createjs.Ticker.removeEventListener("tick", tick);
			callback();
		}
	};
	createjs.Ticker.addEventListener("tick", tick);
}

},{}]},{},[17]);
