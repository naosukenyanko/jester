(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
				container.cache(0, 0, width, height);
			}
			if (type === "polygon") {
				container.cache(-width, -height, width * 2, height * 2);
			}

			container.addEventListener("click", function () {
				if (!_this.status.enabled) return;
				if (self.onClick) {
					self.onClick();
				}
			});

			stage.addChild(container);
			this.shape = shape;
		}
	}]);

	return Button;
}();

exports.default = Button;
;

},{}],2:[function(require,module,exports){
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

			if (charactor_manager.status.selected !== data.type) {
				return;
			}

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

			this.container = container;
			this.rect = rect;

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
		key: 'redraw',
		value: function redraw() {
			//console.log("redraw", this);
			var g = this.rect.graphics;
			var data = this.data;
			var charactor_manager = this.bs.charactor_manager;
			var selected = charactor_manager.status.selected === data.type;
			var width = _config2.default.CardWidth;
			var height = _config2.default.CardHeight;

			if (this.status.used) return;

			if (data.num !== "1+1" && charactor_manager.status.selected_index.length === 2) {
				selected = false;
			}

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
		}
	}]);

	return Card;
}();

exports.default = Card;

},{"../config":11,"../loader":12}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _loader = require('../loader');

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

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
	}

	_createClass(CardManager, [{
		key: 'supply',
		value: function supply(turn) {
			var _this = this;

			var cards = this[turn].cards;
			var bs = this.bs;

			//console.log("supply", turn, cards);

			var make_card = function make_card(i) {
				var index = rand(54);
				return new _card2.default({
					"index": i,
					"card_index": index,
					"data": card_list[index],
					"bs": bs,
					"parent": _this
				});
			};

			for (var i = cards.length - 1; i >= 0; i--) {
				if (cards[i].status.used) {
					//console.log("splice", i);
					cards.splice(i, 1);
				}
			}

			for (var _i = cards.length; _i < 8; _i++) {
				//cards.push( rand(54) );
				var card = make_card(_i);
				//console.log("push", i, card);
				cards.push(card);
			}

			cards.forEach(function (card, i) {
				card.index = i;
			});

			this.selected = [];

			//console.log("cards", cards);
			this[turn].cards = cards;
		}
	}, {
		key: 'close',
		value: function close() {
			var _this2 = this;

			var selected = this.selected;

			selected.forEach(function (index) {
				var card = _this2.player.cards[index];
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
		key: 'selectCharactor',
		value: function selectCharactor(type) {
			this.selected = [];
			this.resetRect();

			this.player.cards.forEach(function (card) {
				card.redraw();
			});
		}
	}, {
		key: 'drawCards',
		value: function drawCards(stage, turn) {
			this[turn].cards.forEach(function (card, i) {
				card.draw(stage);
			});
		}
	}, {
		key: 'draw',
		value: function draw(stage, turn) {
			//console.log("draw card manager", turn);
			stage.removeAllChildren();
			this.drawCards(stage, turn);
			this.drawJesterButton(stage);
			this.drawBishopButton(stage);
			this.drawDrawButton(stage);
		}
	}, {
		key: 'drawJesterButton',
		value: function drawJesterButton(stage) {
			var jesterButton = new _button2.default({
				x: 12,
				y: 80,
				text: "jester",
				font: "20px Arial",
				tx: 12,
				ty: 14
			});
			jesterButton.draw(stage);

			this.jesterButton = jesterButton;
		}
	}, {
		key: 'drawBishopButton',
		value: function drawBishopButton(stage) {
			var bs = this.bs;
			var bishopButton = new _button2.default({
				x: 12,
				y: 80 + 72,
				text: "bishop",
				font: "20px Arial",
				tx: 12,
				ty: 14
			});

			bishopButton.draw(stage);
			this.bishopButton = bishopButton;
		}
	}, {
		key: 'drawDrawButton',
		value: function drawDrawButton(stage) {
			var self = this;

			var drawButton = new _button2.default({
				x: 12,
				y: 80 + 72 + 80,
				text: "open",
				font: "20px Arial",
				tx: 12,
				ty: 14
			});

			drawButton.onClick = function () {
				var selected = self.selected;
				if (selected.length === 0) return;

				var data = selected.map(function (index) {
					return self.player.cards[index].data;
				});

				self.close();
				self.selected = [];

				self.bs.onSelectCard(data);
			};

			drawButton.draw(stage);
		}
	}]);

	return CardManager;
}();

exports.default = CardManager;
;

},{"../config":11,"../loader":12,"./button":1,"./card":2}],4:[function(require,module,exports){
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
			if (x < 0) x = 0;
			if (x > 16) x = 16;

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

},{"../config":11,"../loader":12}],5:[function(require,module,exports){
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
		key: 'resetStatus',
		value: function resetStatus() {
			this.status.hold = "";
			this.status.selected_index = [];
			this.status.selected = "";
		}
	}, {
		key: 'setHold',
		value: function setHold() {
			this.status.hold = this.status.selected;
		}
	}, {
		key: 'selectCard',
		value: function selectCard(cards, turn) {
			var index = this.status.selected_index;
			var dir = turn === "player" ? 1 : -1;

			this.setHold();

			console.log("select card", cards, turn);

			if (cards.length === 1) {
				var card = cards[0];

				if (index.length === 1) {
					//const charactor = this.charactors[index];
					//console.log("card select", card, index);

					if (card.num === "M") {
						//charactor.x = 8;
						this.setPos(index, 8);
					} else if (card.num === "1+1") {
						//charactor.move(2 * dir);
						this.move(index, 2 * dir);
					} else {
						//charactor.move(card.num * dir);
						this.move(index, card.num * dir);
					}
				} else {
					index.forEach(function (i) {
						//const charactor = self.charactors[i];
						//charactor.move(1 * dir);
						this.move(i, 1 * dir);
					});
				}
			} else {
				/*
      const king = this.getCharactor("king");
      const knight1 = this.getCharactor("knight1");
      const knight2 = this.getCharactor("knight2");
      knight1.move(1 * dir);
      king.move(1 * dir);
      knight2.move(1 * dir);
    */
				if (turn === "player") {
					this.move("knight1", 1 * dir);
					this.ove("king", 1 * dir);
					this.move("knight2", 1 * dir);
				} else {
					this.move("knight2", 1 * dir);
					this.move("king", 1 * dir);
					this.move("knight1", 1 * dir);
				}
			}
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

			if (charactor.id === "knight2") {
				setEnabled(bisho, king.x < bs.x);
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

},{"../config":11,"./charactor":4}],6:[function(require,module,exports){
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

var life_max = _config2.default.FPS * 2;

var Effector = function () {
	function Effector(props) {
		_classCallCheck(this, Effector);
	}

	_createClass(Effector, [{
		key: 'load',
		value: function load(stage) {

			this.drawBoard(stage);
		}
	}, {
		key: 'drawBoard',
		value: function drawBoard(stage) {
			this.stage = stage;
			var board = new createjs.Container();

			this.board = board;
			board.visible = false;

			stage.addChild(board);
		}
	}, {
		key: 'showTurn',
		value: function showTurn(turn, callback) {
			var self = this;
			var board = this.board;
			var stage = this.stage;
			var width = _config2.default.ScreenWidth;
			var height = _config2.default.ScreenHeight;

			stage.setChildIndex(board, stage.children.length);

			board.removeAllChildren();
			board.visible = true;

			var text = turn.toUpperCase() + " PHASE";
			var text_shape = new createjs.Text(text, "64px Arial");
			text_shape.x = (width - 420) / 2;
			text_shape.y = (height - 60) / 2;

			var rect = new createjs.Shape();
			rect.graphics.beginFill("rgba(127,127,127,0.4)").drawRect(0, 0, width, height);

			board.addChild(rect);
			board.addChild(text_shape);

			var life = life_max;

			var tick = function tick() {
				life--;
				var p = life / (life_max * 2);
				var g = rect.graphics;
				g.clear();
				g.beginFill("rgba(127,127,127, " + p + ")").drawRect(0, 0, width, height);

				if (life <= 0) {
					board.removeAllChildren();
					board.visible = false;
					createjs.Ticker.removeEventListener("tick", tick);
					if (typeof callback === "function") {
						callback();
					}
				}
			};
			createjs.Ticker.addEventListener("tick", tick);
		}
	}]);

	return Effector;
}();

exports.default = Effector;

},{"../config":11,"../loader":12}],7:[function(require,module,exports){
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

var FPS = _config2.default.FPS;

function rand(num) {
	return Math.floor(Math.random());
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

			this.selectCard(rand(7), function () {
				bs.turnEnd();
			});
		}
	}, {
		key: 'selectCard',
		value: function selectCard(index, callback) {
			var bs = this.bs;
			var card_manager = this.bs.card_manager;
			var charactor_manager = this.bs.charactor_manager;
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
				id = type + (1 + rand(2));
			} else {
				id = type;
			}

			var chara = charactor_manager.getCharactor(id);
			charactor_manager.selectCharactor(chara.index);

			card.container.y = 0;

			wait(FPS * 1, function () {
				var data = card.data;

				//card.status.used = true;
				card.close();

				bs.onSelectCard([data]);
				wait(FPS * 1, function () {
					callback();
				});
			}.bind(this));
		}
	}]);

	return Enemy;
}();

exports.default = Enemy;

},{"../config":11,"../loader":12}],8:[function(require,module,exports){
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

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _effector = require('./effector');

var _effector2 = _interopRequireDefault(_effector);

var _enemy = require('./enemy');

var _enemy2 = _interopRequireDefault(_enemy);

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
			//hold: "",
			jester: false,
			//selected: "",
			//selected_index: [],
			turn: "player"
		};

		this.stage = stage;
		//this.onClick = this.onClick.bind(this);

		this.createMap();
		this.createCards();
		//this.createCharactors();

		this.charactor_manager = new _charactormanager2.default({ bs: this });
		this.effector = new _effector2.default();
		this.enemy = new _enemy2.default({ bs: this });

		this.events = ["tick", "mousedown", "pressmove"];

		this.events.forEach(function (name) {
			_this[name] = _this[name].bind(_this);
		});
	}

	_createClass(BattleStage, [{
		key: 'turnEnd',
		value: function turnEnd() {
			var self = this;
			var turn = self.status.turn;
			var nextTurn = turn === "player" ? "enemy" : "player";
			self.status.turn = nextTurn;

			console.log("turn end");

			//this.status.selected_index = [];
			//this.status.selected = "";
			//this.status.hold = "";
			this.charactor_manager.resetStatus();

			self.card_manager.supply(nextTurn);
			self.card_manager.draw(this.card_s, nextTurn);

			self.effector.showTurn(nextTurn, function () {
				if (nextTurn === "enemy") {
					self.enemy.phase();
				}
			});
		}
	}, {
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
			var container = new createjs.Container();
			container.y = _config2.default.CardHeight;
			container.x = 0;
			var stage = this.stage;
			this.card_s = container;
			stage.addChild(container);
			this.card_manager = new _cardmanager2.default({ bs: this });
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

			this.card_manager.draw(this.card_s, turn);
			this.drawEndButton(stage);

			stage.addEventListener("mousedown", this.mousedown);
			stage.addEventListener("pressmove", this.pressmove);

			//console.log("add tick event listener");
			createjs.Ticker.addEventListener("tick", this.tick);

			this.effector.showTurn(this.status.turn);
		}
	}, {
		key: 'drawEndButton',
		value: function drawEndButton(stage) {
			var self = this;
			var endButton = new _button2.default({
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

			endButton.draw(stage);

			endButton.onClick = function () {
				self.turnEnd();
			};
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

			//const map = this.map.draw(this.map_s.graphics);
			this.drawMap();
			this.charactor_manager.redrawCharactors();

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

},{"../config":11,"../manager":13,"./button":1,"./cardmanager":3,"./charactormanager":5,"./effector":6,"./enemy":7,"./map":9}],9:[function(require,module,exports){
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

},{"../config":11}],10:[function(require,module,exports){
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

},{"./config":11,"./loader":12,"./manager":13}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./routes":15}],14:[function(require,module,exports){
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

},{"../config":11,"../manager":13}],15:[function(require,module,exports){
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

},{"./battle":8,"./menu":14}]},{},[10]);
