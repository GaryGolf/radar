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
	var StaticMap_1 = __webpack_require__(7);
	// import Search from './components/Search'
	// import List from './components/List'
	// import ListItem from './components/ListItem'
	// import OnePageScroll from './components/OnePageScroll'
	// import MobileLayout from './components/MobileLayout'
	ReactDOM.render(React.createElement(StaticMap_1.default, null), document.getElementById('layout'));
	// ReactDOM.render(<Search/>,document.getElementById('root'))
	// ReactDOM.render(<List/>,document.getElementById('list'))
	// ReactDOM.render(<OnePageScroll/>, document.getElementById('list'))
	// ReactDOM.render(<MobileLayout/>, document.getElementById('layout')) 


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var ReactCurrentOwner = __webpack_require__(5);
	exports.FreeStyle = __webpack_require__(6);
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="Socket.d.ts" />
	var React = __webpack_require__(1);
	var ReactFreeStyle = __webpack_require__(4);
	var Search_1 = __webpack_require__(8);
	// if (!Number.prototype.toRadians) {
	//             Number.prototype.toRadians = () => { return this * Math.PI / 180; };
	// }
	var StaticMap = (function (_super) {
	    __extends(StaticMap, _super);
	    function StaticMap(props) {
	        _super.call(this, props);
	        this.socket = window.socket;
	        this.place = null;
	        this.state = { image: { src: null } };
	        this.Style = ReactFreeStyle.create();
	        this.styles = {};
	        this.options = {
	            center: '56.27,44.00',
	            language: 'ru',
	            zoom: '12',
	            scale: '1',
	            maptype: 'roadmap',
	            size: '600x622',
	            format: 'png',
	            style: [
	                'feature:all|saturation:-80',
	                'feature:road.arterial|element:geometry|hue:0x00FFEE|saturation:50',
	                'feature:poi.business|element:labels|visibility:off',
	                'feature:poi|element:geometry|lightness:45'
	            ]
	        };
	    }
	    StaticMap.prototype.prepreStyle = function () {
	        this.styles.container = this.Style.registerStyle({
	            width: '100%',
	            height: '100%',
	            overfow: 'hidden',
	            background: 'white',
	            '@media only screen and (min-width: 1024px)': {
	                width: '600px',
	                height: '600px'
	            }
	        });
	        this.styles.staticmap = this.Style.registerStyle({
	            width: '100%',
	            height: 'auto'
	        });
	    };
	    StaticMap.prototype.prepareOptions = function () {
	        var options = {
	            center: '56.2965,43.9361',
	            language: 'ru',
	            zoom: '12',
	            scale: '1',
	            maptype: 'roadmap',
	            size: '600x622',
	            format: 'png',
	            style: [
	                'feature:all|saturation:-80',
	                'feature:road.arterial|element:geometry|hue:0x00FFEE|saturation:50',
	                'feature:poi.business|element:labels|visibility:off',
	                'feature:poi|element:geometry|lightness:45'
	            ]
	        };
	        if (!this.container)
	            return null;
	        var width = this.container.clientWidth || 600;
	        var height = this.container.clientHeight || 600;
	        var ratio = width / height;
	        if (this.place) {
	            var markers = new Array();
	            for (var i = 0, char = 65; i < this.place.rows.length; i++, char++) {
	                markers.push("color:red|label:" + String.fromCharCode(char) + "|" + this.place.rows[i].location.x + "," + this.place.rows[i].location.y);
	            }
	            options.zoom = '15';
	            if (markers.length > 0)
	                options.markers = markers;
	            options.center = this.place.location.lat + ',' + this.place.location.lng;
	        }
	        if (width > 640 || height > 618) {
	            if (618 * ratio > 640) {
	                options.size = 640 + 'x' + (Math.ceil(640 / ratio) + 22);
	            }
	            else {
	                options.size = Math.ceil(618 * ratio) + 'x' + 640;
	            }
	        }
	        else {
	            options.size = width + 'x' + (height + 22);
	        }
	        console.log(options.size);
	        return options;
	    };
	    StaticMap.prototype.componentWillMount = function () {
	        var _this = this;
	        this.socket.on('staticmap', function (buffer) {
	            var bytes = new Uint8Array(buffer);
	            var blob = new Blob([bytes.buffer], { type: 'image/png' });
	            var src = URL.createObjectURL(blob);
	            _this.setState({ image: { src: src } });
	        });
	        this.socket.on('staticmap-rows', function (place) {
	            _this.place = place;
	            var options = _this.prepareOptions();
	            if (options)
	                _this.socket.emit('staticmap', options);
	        });
	        window.addEventListener('resize', this.windowResizeHandler.bind(this));
	        this.prepreStyle();
	    };
	    StaticMap.prototype.componentDidMount = function () {
	        this.Style.inject(this.container);
	        var options = this.prepareOptions();
	        if (options)
	            this.socket.emit('staticmap', options);
	    };
	    StaticMap.prototype.componentWillUnmount = function () {
	        window.removeEventListener('resize', this.windowResizeHandler.bind(this));
	    };
	    StaticMap.prototype.windowResizeHandler = function (event) {
	        var options = this.prepareOptions();
	        if (options)
	            this.socket.emit('staticmap', options);
	    };
	    StaticMap.prototype.render = function () {
	        var _this = this;
	        var areas = null;
	        if (this.place && this.place.rows && this.place.rows.length > 0) {
	            var center_1 = { lat: this.place.location.lat, lng: this.place.location.lng };
	            var toRad = function (f) { return Number(f) * Math.PI / 180; };
	            areas = new Array();
	            areas = this.place.rows.map(function (item, idx) {
	                var Cx = 300;
	                var Cy = 322;
	                var dx = (Math.ceil((item.location.x - Number(center_1.lat)) * 22000)) + 12 + Cx;
	                var dy = (Math.ceil((Number(center_1.lat) - item.location.x) * 44000)) + Cy;
	                console.log(dx + 'x' + dy);
	                // console.log(dx+'x'+dy)
	                var coords = dx + "," + dy + ",30";
	                return React.createElement("area", {key: idx, shape: "circle", coords: coords, alt: item.name, href: 'javascript:console.log("' + item.name + '")'});
	            });
	        }
	        return (React.createElement("div", {className: this.styles.container, ref: function (element) { return _this.container = element; }}, 
	            this.state.image.src ? React.createElement("img", {className: this.styles.staticmap, useMap: "#staticmap", src: this.state.image.src}) : null, 
	            areas ? React.createElement("map", {name: "staticmap"}, 
	                " ", 
	                areas, 
	                " ") : null, 
	            React.createElement(Search_1.default, null)));
	    };
	    return StaticMap;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StaticMap;


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
	var Search_css_1 = __webpack_require__(9);
	var Search = (function (_super) {
	    __extends(Search, _super);
	    function Search(props) {
	        _super.call(this, props);
	        this.socket = window.socket;
	        this.current = -1;
	        this.backspace = false;
	        this.state = { menu: [] };
	    }
	    Search.prototype.componentWillMount = function () {
	        var _this = this;
	        // setup data receiver 
	        this.socket.on('search-places', function (menu) {
	            _this.setState({ menu: menu });
	            _this.current = -1;
	        });
	    };
	    Search.prototype.componentDidMount = function () {
	        Search_css_1.Style.inject(this.menu);
	        this.input.focus();
	    };
	    Search.prototype.clearSelectedStyle = function () {
	        var divs = this.menu.getElementsByClassName(Search_css_1.selectedStyle);
	        for (var i = 0; i < divs.length; i++) {
	            divs.item(i).className = Search_css_1.menuItemStyle;
	        }
	    };
	    Search.prototype.keyDownHandler = function (event) {
	        var len = this.state.menu.length;
	        var divs = this.menu.getElementsByTagName('div');
	        // if(len < 1 || len != divs.length ) return
	        switch (event.keyCode) {
	            case 13:
	                if (this.current == -1)
	                    this.current = 0;
	                this.request(this.state.menu[this.current]);
	                this.input.value = this.state.menu[this.current].description;
	                this.setState({ menu: [] });
	                break;
	            case 40:
	                this.clearSelectedStyle();
	                this.current = ++this.current % len;
	                divs.item(this.current).className = Search_css_1.selectedStyle;
	                this.input.value = this.state.menu[this.current].description;
	                break;
	            case 38:
	                this.clearSelectedStyle();
	                this.current = this.current > 0 ? --this.current : len - 1;
	                divs.item(this.current).className = Search_css_1.selectedStyle;
	                this.input.value = this.state.menu[this.current].description;
	                break;
	            case 8:
	                if (this.backspace) {
	                    // first time pressed - removes last symbol | second time - removes whole string
	                    this.input.value = '';
	                    this.setState({ menu: [] });
	                    this.backspace = false;
	                }
	                else {
	                    this.backspace = true;
	                }
	                break;
	            case 27:
	                this.input.value = '';
	                this.setState({ menu: [] });
	                this.backspace = false;
	                break;
	            default:
	        }
	    };
	    Search.prototype.mouseClickHandler = function (event) {
	        var _this = this;
	        this.state.menu.forEach(function (item) {
	            if (item.id === event.target.id) {
	                _this.request(item);
	                _this.input.value = item.description;
	                _this.setState({ menu: [] });
	            }
	        });
	    };
	    Search.prototype.mouseOverHandler = function (event) {
	        var divs = this.menu.getElementsByTagName('div');
	        for (var i = 0; i < divs.length; i++) {
	            if (divs.item(i) == event.target) {
	                this.current = i;
	                break;
	            }
	        }
	        this.clearSelectedStyle();
	        event.target.className = Search_css_1.selectedStyle;
	    };
	    Search.prototype.inputHandler = function (event) {
	        this.socket.emit('search-places', this.input.value);
	    };
	    Search.prototype.request = function (data) {
	        this.socket.emit('search-map', data);
	    };
	    Search.prototype.render = function () {
	        var _this = this;
	        return (React.createElement("div", {className: Search_css_1.menuStyle, ref: function (div) { return _this.menu = div; }}, 
	            React.createElement("input", {className: Search_css_1.inputStyle, type: "search", placeholder: "введите адрес.", ref: function (input) { return _this.input = input; }, onInput: this.inputHandler.bind(this), onKeyDown: this.keyDownHandler.bind(this)}), 
	            (this.state.menu.length > 0) ? (this.state.menu.map(function (item, idx) { return (React.createElement("div", {className: Search_css_1.menuItemStyle, id: item.id, key: idx, onClick: _this.mouseClickHandler.bind(_this), onMouseOver: _this.mouseOverHandler.bind(_this)}, item.description)); })) : null));
	    };
	    return Search;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Search;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FreeStyle = __webpack_require__(4);
	exports.Style = FreeStyle.create();
	exports.menuStyle = exports.Style.registerStyle({
	    position: 'absolute',
	    top: '6px',
	    left: '6px',
	    backgroundColor: 'white',
	    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
	    fontSize: '.9em',
	    width: '90%',
	    boxShadow: '3px 3px 10px #AAAAAA',
	    padding: '6px',
	    '@media only screen and (min-width: 1024px)': {
	        width: '500px',
	    }
	});
	exports.inputStyle = exports.Style.registerStyle({
	    position: 'relative',
	    left: '1px',
	    width: '95%',
	    margin: '5px',
	    border: 'none',
	    color: 'black',
	    '&:focus': {
	        outline: 'none'
	    }
	});
	exports.menuItemStyle = exports.Style.registerStyle({
	    width: 'calc(100%-3px)',
	    padding: '4px',
	    color: '#333333',
	    whiteSpace: 'pre',
	    overflow: 'hidden'
	});
	exports.selectedStyle = exports.Style.registerStyle({
	    backgroundColor: 'silver',
	    width: 'calc(100%-3px)',
	    padding: '4px',
	    color: '#333333',
	    whiteSpace: 'pre',
	    overflow: 'hidden'
	});
	exports.normalStyle = exports.Style.registerStyle({
	    backgroundColor: 'white'
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map