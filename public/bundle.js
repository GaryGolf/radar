/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	// import io from 'socket.io-client'
	// import StaticMap from './components/StaticMap'
	// import Search from './components/Search'
	var List_1 = __webpack_require__(8);
	// ReactDOM.render(<StaticMap/>,document.getElementById('map'))
	// ReactDOM.render(<Search/>,document.getElementById('root'))
	ReactDOM.render(React.createElement(List_1.default, null), document.getElementById('list'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// <reference path="./Socket.d.ts" />
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var ListItem_css_1 = __webpack_require__(4);
	var ListItem = (function (_super) {
	    __extends(ListItem, _super);
	    function ListItem(props) {
	        _super.call(this, props);
	        this.esd = this.props.EstateDescription;
	        // {
	        //         title: 'Шикарный офис в центре',
	        //         subtitle: 'Оффисный центр, четвертый этаж, 25кв.м', 
	        //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora quia quos odio fugiat qui. Eaque ea reprehenderit doloremque. Odit distinctio nisi eos delectus eaque provident consequuntur perferendis maiores, saepe doloribus suscipit quasi ad aut nam sapiente quas iste quo quidem, reiciendis, accusamus quam eligendi.\nUllam earum doloribus recusandae, quis, minus ipsa obcaecati dolores modi odio, beatae iusto, quaerat. Dicta architecto in perferendis ut modi velit consequatur itaque suscipit, reiciendis officia laborum praesentium numquam fuga labore ea cum eius soluta sit magni eaque unde perspiciatis asperiores? Cupiditate minus quis distinctio sequi placeat dolores reiciendis, inventore officiis eos quas quo illum perspiciatis?',
	        //         img: ['img/1ee70cab09e65d1bf_900.jpg','img/c3bae5812bc053fd4_900.jpg'],
	        //         tag: 'A'
	        //     } 
	        this.containerStyle = ListItem_css_1.prepareAnimation(this.esd.img);
	    }
	    ListItem.prototype.componentWillMount = function () {
	    };
	    ListItem.prototype.componentDidMount = function () {
	        ListItem_css_1.Style.inject(this.container);
	    };
	    ListItem.prototype.render = function () {
	        var _this = this;
	        var description = this.esd.description.split('\n').map(function (paragraph, idx) { return React.createElement("p", {className: ListItem_css_1.descriptionStyle, key: idx}, paragraph); });
	        return (React.createElement("div", {className: this.containerStyle, ref: function (element) { return _this.container = element; }}, 
	            React.createElement("div", {className: ListItem_css_1.wrapperStyle}, 
	                React.createElement("div", {className: ListItem_css_1.titleStyle}, this.esd.title), 
	                React.createElement("div", {className: ListItem_css_1.subtitleStyle}, this.esd.subtitle), 
	                description, 
	                React.createElement("div", {className: ListItem_css_1.tagStyle}, this.esd.tag))
	        ));
	    };
	    return ListItem;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ListItem;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FreeStyle = __webpack_require__(5);
	exports.Style = FreeStyle.create();
	function prepareAnimation(img) {
	    var animation = {};
	    var animationDirections = [
	        { from: 'right top', to: 'left bottom' },
	        { from: 'left bottom', to: 'right top' },
	        { from: 'right bottom', to: 'left top' },
	        { from: 'left top', to: 'right bottom' }
	    ];
	    for (var i = 0, begin = 0; i < img.length; i++, begin += 100 / img.length) {
	        var end = (i + 1 === img.length) ? 100 : begin + 100 / img.length - .1;
	        var dir = animationDirections[Math.floor(Math.random() * animationDirections.length)];
	        animation[begin + '%'] = { background: "url('" + img[i] + "') no-repeat " + dir.from };
	        animation[end + '%'] = { background: "url('" + img[i] + "') no-repeat " + dir.to };
	    }
	    var animationName = exports.Style.registerKeyframes(animation);
	    var animationTimingFunction = (['linear', 'ease-in', 'ease-out', 'ease-in-out'])[Math.floor(Math.random() * 4)];
	    var animationDuration = img.length * (5 + Math.floor(Math.random() * 5)) + 's';
	    return exports.Style.registerStyle({
	        maxWidth: '600px',
	        height: '400px',
	        padding: '8px',
	        margin: '2px',
	        borderRadius: '5px',
	        flex: '1 500px',
	        boxSizing: 'content-box',
	        animationIterationCount: 'infinite',
	        animationTimingFunction: animationTimingFunction,
	        animationDuration: animationDuration,
	        animationName: animationName
	    });
	}
	exports.prepareAnimation = prepareAnimation;
	exports.wrapperStyle = exports.Style.registerStyle({
	    position: 'relative',
	    background: 'linear-gradient(-30deg, rgba(0,0,0,.6), rgba(0,70,80,.3))',
	    overflow: 'hidden',
	    color: 'white',
	    height: '100%',
	    textShadow: '2px 2px 4px rgba(0,0,0,.3)',
	    borderRadius: '5px'
	});
	exports.titleStyle = exports.Style.registerStyle({
	    fontSize: '1.8em',
	    padding: '10px',
	    fontFamily: 'Times New Roman, Times, serif',
	    fontWeight: 'bold',
	    textAlign: 'right'
	});
	exports.subtitleStyle = exports.Style.registerStyle({
	    padding: '10px',
	    textAlign: 'right'
	});
	exports.descriptionStyle = exports.Style.registerStyle({
	    paddingLeft: '10px',
	    paddingRight: '10px',
	    textAlign: 'justify'
	});
	exports.tagStyle = exports.Style.registerStyle({
	    position: 'absolute',
	    left: '10px',
	    bottom: '10px',
	    color: 'white',
	    background: 'red',
	    opacity: '1',
	    width: '20px',
	    height: '20px',
	    borderRadius: '4px',
	    textAlign: 'center'
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var ReactCurrentOwner = __webpack_require__(6);
	exports.FreeStyle = __webpack_require__(7);
	/**
	 * Create a specialized free style instance.
	 */
	var ReactFreeStyle = (function (_super) {
	    __extends(ReactFreeStyle, _super);
	    function ReactFreeStyle() {
	        _super.apply(this, arguments);
	        /**
	         * Expose the `StyleElement` for use.
	         */
	        this.Element = StyleElement;
	    }
	    /**
	     * Create a React component that inherits from a user component. This is
	     * required for methods on the user component to continue working once
	     * wrapped with the style functionality.
	     */
	    ReactFreeStyle.prototype.component = function (Component) {
	        var freeStyle = this;
	        var displayName = Component.displayName || Component.name;
	        return (function (_super) {
	            __extends(FreeStyleComponent, _super);
	            function FreeStyleComponent() {
	                _super.apply(this, arguments);
	                this._freeStyle = freeStyle;
	                this._parentFreeStyle = this.context.freeStyle || new ReactFreeStyle();
	            }
	            FreeStyleComponent.prototype.getChildContext = function () {
	                return {
	                    freeStyle: this._parentFreeStyle
	                };
	            };
	            FreeStyleComponent.prototype.componentWillUpdate = function () {
	                // Hook into component updates to keep styles in sync over hot code
	                // reloads. This works great with React Hot Loader!
	                if (this._freeStyle.id !== freeStyle.id) {
	                    this._parentFreeStyle.unmerge(this._freeStyle);
	                    this._parentFreeStyle.merge(freeStyle);
	                    this._freeStyle = freeStyle;
	                }
	            };
	            FreeStyleComponent.prototype.componentWillMount = function () {
	                this._parentFreeStyle.merge(this._freeStyle);
	            };
	            FreeStyleComponent.prototype.componentWillUnmount = function () {
	                this._parentFreeStyle.unmerge(this._freeStyle);
	            };
	            FreeStyleComponent.prototype.render = function () {
	                return React.createElement(Component, this.props);
	            };
	            FreeStyleComponent.displayName = "FreeStyleComponent" + (displayName ? "<" + displayName + ">" : '');
	            FreeStyleComponent.contextTypes = {
	                freeStyle: React.PropTypes.object
	            };
	            FreeStyleComponent.childContextTypes = {
	                freeStyle: React.PropTypes.object.isRequired
	            };
	            return FreeStyleComponent;
	        }(React.Component));
	    };
	    return ReactFreeStyle;
	}(exports.FreeStyle.FreeStyle));
	exports.ReactFreeStyle = ReactFreeStyle;
	/**
	 * Create the <style /> element.
	 */
	var StyleElement = (function (_super) {
	    __extends(StyleElement, _super);
	    function StyleElement() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.onChange = function () {
	            if (ReactCurrentOwner.current != null) {
	                console.warn('React Free Style: Inline styles can not be registered during `render`. If you want to register styles dynamically, you should use `componentWillMount` and `componentWillUnmount` to manage styles (remember to use `FreeStyle#get(id)` and `FreeStyle#remove(instance)` to remove styles after use)');
	            }
	            return _this.forceUpdate();
	        };
	    }
	    StyleElement.prototype.componentWillMount = function () {
	        ;
	        this.context.freeStyle.addChangeListener(this.onChange);
	    };
	    StyleElement.prototype.componentWillUnmount = function () {
	        ;
	        this.context.freeStyle.removeChangeListener(this.onChange);
	    };
	    StyleElement.prototype.render = function () {
	        return React.createElement('style', {
	            dangerouslySetInnerHTML: { __html: this.context.freeStyle.getStyles() }
	        });
	    };
	    StyleElement.displayName = 'Style';
	    StyleElement.contextTypes = {
	        freeStyle: React.PropTypes.object.isRequired
	    };
	    return StyleElement;
	}(React.Component));
	exports.StyleElement = StyleElement;
	/**
	 * Create a React Free Style instance.
	 */
	function create() {
	    return new ReactFreeStyle();
	}
	exports.create = create;
	//# sourceMappingURL=react-free-style.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */
	
	'use strict';
	
	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	
	var ReactCurrentOwner = {
	
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	
	};
	
	module.exports = ReactCurrentOwner;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Increment through IDs for FreeStyle, which can't generate hashed IDs.
	 */
	var instanceId = 0;
	/**
	 * CSS properties that are valid unit-less numbers.
	 */
	var CSS_NUMBER = {
	    'box-flex': true,
	    'box-flex-group': true,
	    'column-count': true,
	    'flex': true,
	    'flex-grow': true,
	    'flex-positive': true,
	    'flex-shrink': true,
	    'flex-negative': true,
	    'font-weight': true,
	    'line-clamp': true,
	    'line-height': true,
	    'opacity': true,
	    'order': true,
	    'orphans': true,
	    'tab-size': true,
	    'widows': true,
	    'z-index': true,
	    'zoom': true,
	    // SVG properties.
	    'fill-opacity': true,
	    'stroke-dashoffset': true,
	    'stroke-opacity': true,
	    'stroke-width': true
	};
	/**
	 * CSS vendor prefixes.
	 */
	var VENDOR_PREFIXES = ['-webkit-', '-ms-', '-moz-', '-o-'];
	// Add vendor prefixes to all unit-less properties.
	for (var _i = 0, _a = Object.keys(CSS_NUMBER); _i < _a.length; _i++) {
	    var property = _a[_i];
	    for (var _b = 0, VENDOR_PREFIXES_1 = VENDOR_PREFIXES; _b < VENDOR_PREFIXES_1.length; _b++) {
	        var prefix = VENDOR_PREFIXES_1[_b];
	        CSS_NUMBER[prefix + property] = true;
	    }
	}
	/**
	 * Transform a JavaScript property into a CSS property.
	 */
	function hyphenate(propertyName) {
	    return propertyName
	        .replace(/([A-Z])/g, '-$1')
	        .replace(/^ms-/, '-ms-') // Internet Explorer vendor prefix.
	        .toLowerCase();
	}
	/**
	 * Check if a property name should pop to the top level of CSS.
	 */
	function isAtRule(propertyName) {
	    return propertyName.charAt(0) === '@';
	}
	/**
	 * Check if a value is a nested style definition.
	 */
	function isNestedStyle(value) {
	    return value != null && typeof value === 'object' && !Array.isArray(value);
	}
	/**
	 * Generate a hash value from a string.
	 */
	function stringHash(str) {
	    var value = 5381;
	    var i = str.length;
	    while (i) {
	        value = (value * 33) ^ str.charCodeAt(--i);
	    }
	    return (value >>> 0).toString(36);
	}
	exports.stringHash = stringHash;
	/**
	 * Transform a style string to a CSS string.
	 */
	function styleStringToString(name, value) {
	    if (value == null) {
	        return '';
	    }
	    if (typeof value === 'number' && value !== 0 && !CSS_NUMBER[name]) {
	        value += 'px';
	    }
	    return name + ":" + String(value).replace(/([\{\}\[\]])/g, '\\$1');
	}
	/**
	 * Transform a style into a CSS string.
	 */
	function styleToString(name, value) {
	    if (Array.isArray(value)) {
	        return value.map(function (value) {
	            return styleStringToString(name, value);
	        }).join(';');
	    }
	    return styleStringToString(name, value);
	}
	/**
	 * Sort an array of tuples by first value.
	 */
	function sortTuples(value) {
	    return value.sort(function (a, b) { return a[0] > b[0] ? 1 : -1; });
	}
	/**
	 * Categorize user styles.
	 */
	function parseUserStyles(styles, hasNestedStyles) {
	    var properties = [];
	    var nestedStyles = [];
	    // Sort keys before adding to styles.
	    for (var _i = 0, _a = Object.keys(styles); _i < _a.length; _i++) {
	        var key = _a[_i];
	        var value = styles[key];
	        if (isNestedStyle(value)) {
	            nestedStyles.push([key.trim(), value]);
	        }
	        else {
	            properties.push([hyphenate(key.trim()), value]);
	        }
	    }
	    return {
	        properties: sortTuples(properties),
	        nestedStyles: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles)
	    };
	}
	/**
	 * Stringify an array of property tuples.
	 */
	function stringifyProperties(properties) {
	    return properties.map(function (p) { return styleToString(p[0], p[1]); }).join(';');
	}
	/**
	 * Interpolate CSS selectors.
	 */
	function interpolate(selector, parent) {
	    if (selector.indexOf('&') > -1) {
	        return selector.replace(/&/g, parent);
	    }
	    return parent + " " + selector;
	}
	/**
	 * Register all styles, but collect for post-selector correction using the hash.
	 */
	function collectHashedStyles(container, styles, hasNestedStyles) {
	    var instances = [];
	    var hashString = '';
	    function stylize(container, styles, selector) {
	        var _a = parseUserStyles(styles, hasNestedStyles), properties = _a.properties, nestedStyles = _a.nestedStyles;
	        var styleString = stringifyProperties(properties);
	        var style = container.add(new Style(styleString, container.hash));
	        hashString += styleString;
	        instances.push([selector, style]);
	        for (var _i = 0, nestedStyles_1 = nestedStyles; _i < nestedStyles_1.length; _i++) {
	            var _b = nestedStyles_1[_i], name_1 = _b[0], value = _b[1];
	            hashString += name_1;
	            if (isAtRule(name_1)) {
	                stylize(container.add(new Rule(name_1, undefined, container.hash)), value, selector);
	            }
	            else {
	                stylize(container, value, hasNestedStyles ? interpolate(name_1, selector) : name_1);
	            }
	        }
	    }
	    stylize(container, styles, '&');
	    return { hashString: hashString, instances: instances };
	}
	/**
	 * Recursively register styles on a container instance.
	 */
	function registerUserStyles(container, styles) {
	    var _a = collectHashedStyles(container, styles, true), hashString = _a.hashString, instances = _a.instances;
	    var currentClassName = "f" + container.hash(hashString);
	    var currentSelector = "." + currentClassName;
	    for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
	        var _b = instances_1[_i], selector = _b[0], style = _b[1];
	        style.add(new Selector(interpolate(selector, currentSelector), style.hash, undefined, hashString));
	    }
	    return currentClassName;
	}
	/**
	 * Create user rule. Simplified collect styles, since it doesn't need hashing.
	 */
	function registerUserRule(container, selector, styles) {
	    var _a = parseUserStyles(styles, false), properties = _a.properties, nestedStyles = _a.nestedStyles;
	    // Throw when using properties and nested styles together in rule.
	    if (properties.length && nestedStyles.length) {
	        throw new TypeError("Registering a CSS rule can not use properties with nested styles");
	    }
	    var styleString = stringifyProperties(properties);
	    var rule = container.add(new Rule(selector, styleString, container.hash));
	    for (var _i = 0, nestedStyles_2 = nestedStyles; _i < nestedStyles_2.length; _i++) {
	        var _b = nestedStyles_2[_i], name_2 = _b[0], value = _b[1];
	        registerUserRule(rule, name_2, value);
	    }
	}
	/**
	 * Parse and register keyframes on the current instance.
	 */
	function registerUserHashedRule(container, selector, styles) {
	    var bucket = new Cache(container.hash);
	    var _a = collectHashedStyles(bucket, styles, false), hashString = _a.hashString, instances = _a.instances;
	    for (var _i = 0, instances_2 = instances; _i < instances_2.length; _i++) {
	        var _b = instances_2[_i], rule = _b[0], style = _b[1];
	        style.add(new Selector(rule, style.hash, undefined, hashString));
	    }
	    var currentIdentifier = "h" + container.hash(hashString);
	    var atRule = container.add(new Rule("@" + selector + " " + currentIdentifier, undefined, container.hash, undefined, hashString));
	    atRule.merge(bucket);
	    return currentIdentifier;
	}
	/**
	 * Get the styles string for a container class.
	 */
	function getStyles(container) {
	    return container.values().map(function (style) { return style.getStyles(); }).join('');
	}
	/**
	 * Implement a cache/event emitter.
	 */
	var Cache = (function () {
	    function Cache(hash) {
	        var _this = this;
	        if (hash === void 0) { hash = stringHash; }
	        this.hash = hash;
	        this._children = {};
	        this._keys = [];
	        this._counts = {};
	        this._listeners = [];
	        this._mergeListener = function (type, path) {
	            var finalItem = path.pop();
	            var item = _this;
	            for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
	                var cacheItem = path_1[_i];
	                item = _this.get(cacheItem);
	            }
	            return type === 'add' ? item.add(finalItem) : _this.remove(finalItem);
	        };
	        this._childListener = function (type, path, parent) {
	            _this.emitChange(type, [parent].concat(path));
	        };
	    }
	    Cache.prototype.values = function () {
	        var _this = this;
	        return this._keys.map(function (x) { return _this._children[x]; });
	    };
	    Cache.prototype.empty = function () {
	        for (var _i = 0, _a = this._keys; _i < _a.length; _i++) {
	            var key = _a[_i];
	            var item = this._children[key];
	            var len = this.count(item);
	            while (len--) {
	                this.remove(item);
	            }
	        }
	    };
	    Cache.prototype.add = function (style) {
	        var count = this._counts[style.id] || 0;
	        var item = this._children[style.id];
	        this._counts[style.id] = count + 1;
	        if (count === 0) {
	            item = style.clone();
	            this._keys.push(item.id);
	            this._children[item.id] = item;
	            this.emitChange('add', [item]);
	        }
	        else {
	            this._keys.splice(this._keys.indexOf(style.id), 1);
	            this._keys.push(style.id);
	            // Check if contents are different.
	            if (item.getIdentifier() !== style.getIdentifier()) {
	                throw new TypeError("Hash collision: " + style.getStyles() + " === " + item.getStyles());
	            }
	        }
	        if (style instanceof Cache) {
	            if (count === 0) {
	                item.addChangeListener(this._childListener);
	            }
	            for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
	                var cacheItem = _a[_i];
	                item.add(cacheItem);
	            }
	        }
	        return item;
	    };
	    Cache.prototype.get = function (style) {
	        return this._children[style.id];
	    };
	    Cache.prototype.count = function (style) {
	        return this._counts[style.id] || 0;
	    };
	    Cache.prototype.remove = function (style) {
	        var count = this._counts[style.id];
	        if (count > 0) {
	            this._counts[style.id] = count - 1;
	            var item = this._children[style.id];
	            if (count === 1) {
	                delete this._counts[style.id];
	                delete this._children[style.id];
	                this._keys.splice(this._keys.indexOf(style.id), 1);
	                this.emitChange('remove', [style]);
	            }
	            if (style instanceof Cache) {
	                if (count === 1) {
	                    item.removeChangeListener(this._childListener);
	                }
	                for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
	                    var cacheItem = _a[_i];
	                    item.remove(cacheItem);
	                }
	            }
	        }
	    };
	    Cache.prototype.addChangeListener = function (fn) {
	        this._listeners.push(fn);
	    };
	    Cache.prototype.removeChangeListener = function (fn) {
	        var listeners = this._listeners;
	        var index = listeners.indexOf(fn);
	        if (index > -1) {
	            listeners.splice(index, 1);
	        }
	    };
	    Cache.prototype.emitChange = function (type, path) {
	        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
	            var listener = _a[_i];
	            listener(type, path, this);
	        }
	    };
	    Cache.prototype.merge = function (style) {
	        for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
	            var cacheItem = _a[_i];
	            this.add(cacheItem);
	        }
	        style.addChangeListener(this._mergeListener);
	    };
	    Cache.prototype.unmerge = function (style) {
	        for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
	            var cacheItem = _a[_i];
	            this.remove(cacheItem);
	        }
	        style.removeChangeListener(this._mergeListener);
	    };
	    return Cache;
	}());
	exports.Cache = Cache;
	/**
	 * Selector is a dumb class made to represent nested CSS selectors.
	 */
	var Selector = (function () {
	    function Selector(selector, hash, id, identifier) {
	        if (hash === void 0) { hash = stringHash; }
	        if (id === void 0) { id = "s" + hash(selector); }
	        if (identifier === void 0) { identifier = ''; }
	        this.selector = selector;
	        this.hash = hash;
	        this.id = id;
	        this.identifier = identifier;
	    }
	    Selector.prototype.getStyles = function () {
	        return this.selector;
	    };
	    Selector.prototype.getIdentifier = function () {
	        return this.identifier + "_" + this.selector;
	    };
	    Selector.prototype.clone = function () {
	        return new Selector(this.selector, this.hash, this.id, this.identifier);
	    };
	    return Selector;
	}());
	exports.Selector = Selector;
	/**
	 * The style container registers a style string with selectors.
	 */
	var Style = (function (_super) {
	    __extends(Style, _super);
	    function Style(style, hash, id) {
	        if (hash === void 0) { hash = stringHash; }
	        if (id === void 0) { id = "c" + hash(style); }
	        _super.call(this);
	        this.style = style;
	        this.hash = hash;
	        this.id = id;
	    }
	    Style.prototype.getStyles = function () {
	        return this.style ? this.values().map(function (x) { return x.selector; }).join(',') + "{" + this.style + "}" : '';
	    };
	    Style.prototype.getIdentifier = function () {
	        return this.style;
	    };
	    Style.prototype.clone = function () {
	        return new Style(this.style, this.hash, this.id);
	    };
	    return Style;
	}(Cache));
	exports.Style = Style;
	/**
	 * Implement rule logic for style output.
	 */
	var Rule = (function (_super) {
	    __extends(Rule, _super);
	    function Rule(rule, style, hash, id, identifier) {
	        if (style === void 0) { style = ''; }
	        if (hash === void 0) { hash = stringHash; }
	        if (id === void 0) { id = "a" + hash(rule + style); }
	        if (identifier === void 0) { identifier = ''; }
	        _super.call(this);
	        this.rule = rule;
	        this.style = style;
	        this.hash = hash;
	        this.id = id;
	        this.identifier = identifier;
	    }
	    Rule.prototype.getStyles = function () {
	        return this.rule + "{" + this.style + getStyles(this) + "}";
	    };
	    Rule.prototype.getIdentifier = function () {
	        return this.identifier + "_" + this.rule + "_" + this.style;
	    };
	    Rule.prototype.clone = function () {
	        return new Rule(this.rule, this.style, this.hash, this.id, this.identifier);
	    };
	    return Rule;
	}(Cache));
	exports.Rule = Rule;
	/**
	 * The FreeStyle class implements the API for everything else.
	 */
	var FreeStyle = (function (_super) {
	    __extends(FreeStyle, _super);
	    function FreeStyle(hash, id) {
	        if (hash === void 0) { hash = stringHash; }
	        if (id === void 0) { id = "f" + (++instanceId).toString(36); }
	        _super.call(this, hash);
	        this.hash = hash;
	        this.id = id;
	    }
	    FreeStyle.prototype.url = function (url) {
	        return 'url("' + encodeURI(url) + '")';
	    };
	    FreeStyle.prototype.join = function () {
	        var classList = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            classList[_i - 0] = arguments[_i];
	        }
	        var classNames = [];
	        for (var _a = 0, classList_1 = classList; _a < classList_1.length; _a++) {
	            var value = classList_1[_a];
	            if (typeof value === 'string') {
	                classNames.push(value);
	            }
	            else if (Array.isArray(value)) {
	                classNames.push(this.join.apply(this, value));
	            }
	            else if (value != null) {
	                for (var _b = 0, _c = Object.keys(value); _b < _c.length; _b++) {
	                    var key = _c[_b];
	                    if (value[key]) {
	                        classNames.push(key);
	                    }
	                }
	            }
	        }
	        return classNames.join(' ');
	    };
	    FreeStyle.prototype.registerStyle = function (styles) {
	        return registerUserStyles(this, styles);
	    };
	    FreeStyle.prototype.registerRule = function (rule, styles) {
	        return registerUserRule(this, rule, styles);
	    };
	    FreeStyle.prototype.registerKeyframes = function (keyframes) {
	        return registerUserHashedRule(this, 'keyframes', keyframes);
	    };
	    /* istanbul ignore next */
	    FreeStyle.prototype.inject = function (target) {
	        target = target || document.head;
	        var node = document.createElement('style');
	        node.innerHTML = this.getStyles();
	        target.appendChild(node);
	        return node;
	    };
	    FreeStyle.prototype.getStyles = function () {
	        return getStyles(this);
	    };
	    FreeStyle.prototype.getIdentifier = function () {
	        return this.id;
	    };
	    FreeStyle.prototype.clone = function () {
	        return new FreeStyle(this.hash, this.id);
	    };
	    return FreeStyle;
	}(Cache));
	exports.FreeStyle = FreeStyle;
	/**
	 * Exports a simple function to create a new instance.
	 */
	function create(hash) {
	    return new FreeStyle(hash);
	}
	exports.create = create;
	//# sourceMappingURL=free-style.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./Socket.d.ts" />
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var List_css_1 = __webpack_require__(9);
	var ListItem_1 = __webpack_require__(3);
	var List = (function (_super) {
	    __extends(List, _super);
	    function List(props) {
	        _super.call(this, props);
	    }
	    List.prototype.componentWillMount = function () {
	        this.a = [{
	                title: 'Шикарный офис в центре',
	                subtitle: 'Оффисный центр, четвертый этаж, 25кв.м',
	                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora quia quos odio fugiat qui. Eaque ea reprehenderit doloremque. Odit distinctio nisi eos delectus eaque provident consequuntur perferendis maiores, saepe doloribus suscipit quasi ad aut nam sapiente quas iste quo quidem, reiciendis, accusamus quam eligendi.\nUllam earum doloribus recusandae, quis, minus ipsa obcaecati dolores modi odio, beatae iusto, quaerat. Dicta architecto in perferendis ut modi velit consequatur itaque suscipit, reiciendis officia laborum praesentium numquam fuga labore ea cum eius soluta sit magni eaque unde perspiciatis asperiores? Cupiditate minus quis distinctio sequi placeat dolores reiciendis, inventore officiis eos quas quo illum perspiciatis?',
	                img: ['img/1ee70cab09e65d1bf_900.jpg', 'img/c3bae5812bc053fd4_900.jpg'],
	                tag: 'A'
	            },
	            {
	                title: ' Магазин на красной линии',
	                subtitle: '97м.кв',
	                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia voluptas voluptatum, dolorum praesentium alias nihil, commodi laudantium dignissimos atque, molestiae cum. Aliquam officia, beatae incidunt officiis quas facere laboriosam laudantium eos. Magni molestiae at officiis quisquam sequi. Non deleniti mollitia, officia eveniet voluptatibus, fugit illo delectus minus odit sequi, enim magnam, omnis neque. Veritatis quam, sint magni dolor quos odio esse doloribus amet sequi harum. Tempora recusandae fugiat, nisi quis doloribus, voluptate, harum, quo facilis voluptates beatae mollitia et soluta consectetur ipsa. Neque sunt illo inventore maxime beatae quia unde quo, dolores ab minus modi iste molestiae, consequuntur, eligendi rem dignissimos distinctio aliquam sapiente quis tempore saepe voluptas? Dolore laudantium incidunt aperiam. Illum consequuntur, odit ut voluptatibus esse autem quia enim soluta animi fuga nihil est ullam dolorem maiores minus.',
	                tag: 'B',
	                img: ['img/366e860ebd645ba3e_900.jpg', 'img/ebb0de675f5c3e358_900.jpg']
	            },
	            {
	                title: 'Уютное Кафе',
	                subtitle: '64м.кв',
	                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere expedita voluptatem corrupti voluptatum nemo explicabo temporibus, labore fuga, quae dolorem possimus, dicta hic culpa. Excepturi dicta doloremque inventore dolores, perspiciatis consectetur tempora tenetur similique officiis magni asperiores natus, laboriosam id a deleniti sapiente culpa, at rerum nesciunt quibusdam soluta quae aut repellendus! Reprehenderit velit sequi reiciendis debitis quasi deleniti natus nisi, non nostrum id beatae expedita consequuntur numquam saepe. Non.',
	                tag: 'C',
	                img: ['img/fa9d3ac22f33cca91_900.jpg', 'img/ce7cf0f9bfee28f14_900.jpg', 'img/c1efaa7bdf2b6e920_900.jpg', 'img/3d78848928321c054_900.jpg', 'img/fa9d3ac22f33cca91_900.jpg']
	            }
	        ];
	    };
	    List.prototype.componentDidMount = function () {
	        List_css_1.Style.inject(this.container);
	    };
	    List.prototype.render = function () {
	        var _this = this;
	        var listItems = this.a.map(function (item, idx) {
	            return (React.createElement(ListItem_1.default, {key: idx, EstateDescription: item}));
	        });
	        return (React.createElement("div", {className: List_css_1.flexContainer, ref: function (element) { return _this.container = element; }}, listItems));
	    };
	    return List;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = List;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FreeStyle = __webpack_require__(5);
	exports.Style = FreeStyle.create();
	exports.flexContainer = exports.Style.registerStyle({
	    display: 'flex',
	    justifyContent: 'flex-start',
	    flexDirection: 'row',
	    flexWrap: 'wrap'
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map