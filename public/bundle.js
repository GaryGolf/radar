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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	// import io from 'socket.io-client'
	// import StaticMap from './components/StaticMap'
	// import Search from './components/Search'
	// import List from './components/List'
	// import ListItem from './components/ListItem'
	// import OnePageScroll from './components/OnePageScroll'
	var MobileLayout_1 = __webpack_require__(183);
	// ReactDOM.render(<StaticMap/>,document.getElementById('map'))
	// ReactDOM.render(<Search/>,document.getElementById('root'))
	// ReactDOM.render(<List/>,document.getElementById('list'))
	// ReactDOM.render(<OnePageScroll/>, document.getElementById('list'))
	ReactDOM.render(React.createElement(MobileLayout_1.default, null), document.getElementById('list'));


/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = React;

/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },

/***/ 5:
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

/***/ 6:
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

/***/ 7:
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

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var FreeStyle = __webpack_require__(5);
	var MobileLayout = (function (_super) {
	    __extends(MobileLayout, _super);
	    function MobileLayout(props) {
	        _super.call(this, props);
	        this.RFS = FreeStyle.create();
	        this.Styles = {};
	        this.isLeftMenuActive = false;
	        window.onclick = function (event) { return console.log('orientation change'); };
	    }
	    MobileLayout.prototype.prepareStyle = function () {
	        this.Styles.container = this.RFS.registerStyle({
	            // fontSize: '2em',
	            display: 'block',
	            position: 'absolute',
	            top: '0px',
	            left: '0px',
	            width: '100%',
	            minHeight: '100%',
	            background: 'white'
	        });
	        this.Styles.menu = this.RFS.registerStyle({
	            display: 'block',
	            position: 'absolute',
	            top: '0px',
	            left: '0px',
	            minWidth: '100%',
	            minHeight: '600%',
	            zIndex: '0',
	            color: 'white',
	            background: 'rgba(10,10,10,.5)',
	            fontSize: '2em'
	        });
	        this.Styles.displayNone = this.RFS.registerStyle({
	            display: 'none'
	        });
	        var slideKeyFarmes = this.RFS.registerKeyframes({
	            'from': { transform: 'translateX(0)' },
	            'to': { transform: 'translateX(75%)' }
	        });
	        this.Styles.slideForMenu = this.RFS.registerStyle({
	            animationName: slideKeyFarmes,
	            animationDuration: '1s',
	            animationTimingFunction: 'cubic-bezier(.6,1,1,.9)',
	            transform: 'translateX(75%)',
	            boxShadow: '10, 10, 5, black'
	        });
	    };
	    MobileLayout.prototype.clickHandler = function (event) {
	        if (this.isLeftMenuActive) {
	            this.container.classList.remove(this.Styles.slideForMenu);
	            // this.menu.classList.remove(this.Styles.displayNone)
	            this.isLeftMenuActive = false;
	        }
	        else {
	            this.container.classList.add(this.Styles.slideForMenu);
	            // this.menu.classList.remove(this.Styles.displayNone)
	            this.isLeftMenuActive = true;
	        }
	    };
	    MobileLayout.prototype.componentWillMount = function () {
	        this.prepareStyle();
	    };
	    MobileLayout.prototype.componentDidMount = function () {
	        this.RFS.inject(this.container);
	        // this.menu.classList.add(this.Styles.displayNone)
	    };
	    MobileLayout.prototype.render = function () {
	        var _this = this;
	        var menu = (React.createElement("div", {className: this.Styles.menu, ref: function (element) { return _this.menu = element; }}, 
	            React.createElement("div", null, " Create New "), 
	            React.createElement("div", null, " Hold "), 
	            React.createElement("div", null, " Save As "), 
	            React.createElement("div", null, " Paste ")));
	        return (React.createElement("div", null, 
	            menu, 
	            React.createElement("div", {className: this.Styles.container, ref: function (element) { return _this.container = element; }, onClick: this.clickHandler.bind(this)}, 
	                React.createElement("div", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus rem, dolorum nobis, qui a maiores eos, quis dolore, iusto alias vitae eius. Nemo quos dolor asperiores! Quas, voluptas, inventore? Expedita odio pariatur, error dicta est modi nemo cumque enim, non ipsum nesciunt ab. Nobis quos accusantium doloribus voluptas itaque asperiores repellendus dolorum consequuntur vitae ab modi in adipisci error a quaerat ipsa ut ipsum suscipit nisi odio, ex, deleniti laboriosam ratione fuga inventore. Voluptates magni delectus voluptas quo repellendus, deserunt maiores aperiam dolore. Necessitatibus corporis iste a. Asperiores nesciunt incidunt explicabo eius reprehenderit architecto reiciendis esse inventore officiis maiores ipsa molestiae doloremque autem aspernatur dignissimos mollitia iure deleniti, quisquam excepturi tempora corrupti libero optio earum. Nihil veniam magni, eos eum vel eveniet quidem sequi rem voluptate earum placeat, nesciunt rerum quaerat. Debitis saepe officiis quam recusandae beatae illo cum tempora sed sequi expedita natus laborum ad suscipit reprehenderit hic adipisci veritatis, placeat omnis, magni. Natus, inventore accusantium suscipit, illo quas quis, animi cumque ipsa maiores quam commodi ut quo porro voluptates necessitatibus possimus! Reprehenderit ex eligendi aliquam blanditiis sapiente repudiandae reiciendis, sit deserunt ratione. Reprehenderit quidem alias suscipit impedit omnis amet molestiae iure dicta sequi ut nulla cum quas fuga tenetur, repellat necessitatibus illum, assumenda, magni commodi veritatis repudiandae nobis at architecto. Quas cumque impedit ad explicabo, quae accusantium aspernatur alias quisquam minima officia iure iste quaerat hic totam nemo placeat nostrum quis maiores repellendus corporis, fugit doloremque vel perspiciatis. Aperiam quaerat voluptates quos et vel deleniti fugit commodi atque ullam laudantium consequatur, quas esse, facere vero expedita at pariatur aspernatur magnam quae impedit obcaecati id tempore alias recusandae. Fugit nostrum sint inventore dignissimos eligendi aperiam excepturi. Consequatur corporis unde, sequi ad soluta ea eum quis illum impedit quidem, a facilis necessitatibus, cupiditate pariatur, ab voluptates doloribus omnis? Quod aut quo, eligendi nisi cum pariatur facere, unde laborum ipsam odio ea, impedit. Perferendis aliquid quas deleniti, quod nemo enim, in corporis nesciunt, tenetur beatae excepturi nostrum et officia atque! Officia vitae dolorum error doloribus nam molestiae sequi laboriosam quibusdam reprehenderit maxime iusto dolor, inventore tenetur impedit et eveniet aliquam veniam quidem ratione hic voluptate nemo? Corporis nihil excepturi ratione accusamus quidem autem molestias aliquam asperiores itaque error, quae suscipit earum soluta optio ad ut culpa expedita modi placeat architecto. Consectetur ullam officia modi amet, quo eos aut eveniet! Consectetur quae molestias soluta eius quas sint repellat eligendi reiciendis autem labore aliquam nulla deleniti voluptates eos, nisi. Nemo labore ullam laboriosam, laborum possimus perferendis repellendus. Labore eaque dignissimos laborum dolore suscipit tempore consequatur earum rerum hic debitis accusamus amet corporis facilis molestias animi quaerat, deserunt laudantium! Ea eaque laboriosam hic illo blanditiis rem reprehenderit delectus ab! Delectus eos error amet laudantium ipsa, voluptatibus dicta blanditiis ducimus tempore? Sint voluptatum id iure aspernatur laborum deleniti! Repellendus voluptates amet fuga incidunt eos eius dignissimos reiciendis nesciunt libero dolor neque adipisci voluptatum odit obcaecati, fugit, cupiditate dolores nisi ipsam accusamus facere itaque saepe recusandae laboriosam illum? Molestias fugit ea consectetur ipsa alias neque a eius possimus molestiae non deleniti, adipisci atque velit odio nemo ut quia quos dolorum qui laudantium, magnam quam repellendus sed tenetur. Consequatur aperiam eligendi totam possimus quia, maiores cumque laudantium beatae voluptatum nemo veritatis, quidem ipsam. Illum possimus cupiditate, sequi iusto minima iure laudantium. Amet libero eaque, aliquam praesentium, expedita porro velit vel dolor natus non modi nisi vero. Eaque laborum aperiam cum nihil dolore, facilis exercitationem voluptatem, saepe velit at, explicabo ullam aliquid harum vitae aut. Sed impedit oloribus quod quasi unde. Sunt quasi distinctio labore, natus amet dolores excepturi culpa voluptas accusantium dolorem, dignissimos quae rerum eius maiores doloribus quidem! Nemo iste optio dolores earum aliquam, eligendi quam voluptate consequatur aperiam? Maiores optio illum, est corrupti vitae nesciunt cupiditate enim quod possimus nemo asperiores. Molestias, velit, nostrum.")
	            )));
	    };
	    return MobileLayout;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MobileLayout;


/***/ }

/******/ });
//# sourceMappingURL=bundle.js.map