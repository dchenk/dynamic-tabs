/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return (function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if ( ctx === void 0 ) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties( anonymous.prototype, prototypeAccessors );

        return anonymous;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function (callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */


/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */


/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [], len = arguments.length - 1;
    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
})();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */


/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */


/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */


/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */


/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
        var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["a"] = (index);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function DynamicTabs(containerID){if(!containerID){console.log("ERROR: To register dynamic tabs, pass in the ID of a node containing the tabs");return;}this.container=document.getElementById(containerID);this.registeredTabs=[];this.activeTabIndex=0;this.switchCallbacks=[];this.framer=this.container.getElementsByClassName("dynamic-tabs-framer")[0];this.framerShift=0;// the amount in pixels that the tabs have been scrolled
this.framerWidth=0;this.totalTabsWidth=0;this.indicatorBar=this.container.getElementsByClassName("dt-indicator-bar")[0];this.arrowLeft=this.container.getElementsByClassName("arrow-left")[0];this.arrowRight=this.container.getElementsByClassName("arrow-right")[0];this.arrowLeft.addEventListener("click",this.scrollLeft.bind(this,0.85));this.arrowRight.addEventListener("click",this.scrollRight.bind(this,0.85));var ro=new resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](this.refreshLayout.bind(this));ro.observe(this.framer);}// registerTabs registers the tabs with the IDs in the tabsIDs array. The optional idPrefix parameter can be set
// to prefix each targeted tab element by ID with the string.
DynamicTabs.prototype.registerTabs=function(tabIDs){var idPrefix=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"";if(tabIDs===undefined||tabIDs.length===0){console.log("ERROR: Must pass in an array of tab IDs to register");return;}for(var i=0;i<tabIDs.length;i++){this.registerTab(document.getElementById(idPrefix+tabIDs[i]));}// console.log("tabs registered; the object:", this)
// console.log("tabs registered; the tabs:", JSON.parse(JSON.stringify(this.registeredTabs)));
setActiveHighlight.call(this,0);// always reset when registering new tabs; avoid resetting indicator now
this.refreshLayout();};// registerAllTabs registers all tabs (elements inside of the container that have the class "dynamic-tab") and
// refreshes the layout.
DynamicTabs.prototype.registerAllTabs=function(){var tabs=this.container.getElementsByClassName("dynamic-tab");if(tabs.length===0){console.log("ERROR: There are no tabs to register");return;}for(var i=0;i<tabs.length;i++){this.registerTab(tabs[i]);}// Reset the active tab and refresh the layout because we are registering all tabs.
setActiveHighlight.call(this,0);this.refreshLayout();};// registerTab registers the passed in the HTML tab element.
DynamicTabs.prototype.registerTab=function(tab){var refreshLayout=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;// Remove the display:none style property that is by default on unregistered tabs.
tab.setAttribute("data-dtr","y");// The length of the registeredTabs array will be the index of the new tab.
var newTabIndex=this.registeredTabs.length;var parent=this;// Add click listener to set active tab and fire off callbacks upon switching tabs.
tab.handleEvent=function(e){if(e.type==="click"){parent.setActiveTabIndex(newTabIndex);for(var i=0;i<parent.switchCallbacks.length;i++){parent.switchCallbacks[i](parent.activeTabIndex,newTabIndex);}}};tab.addEventListener("click",tab);// Add the initialized tab.
this.registeredTabs.push({el:tab,rect:{left:0,width:0}});// When registering a single tab programmatically, refreshLayout should be set to true.
// Otherwise, when using method registerTabs or registerAllTabs, refreshLayout is called after
// all of the desired tabs are registered.
if(refreshLayout){this.refreshLayout();}};// deregisterAllTabs de-registers all tabs. Look at function deregisterTab to understand what it means
// to de-register a tab.
DynamicTabs.prototype.deregisterAllTabs=function(){for(var i=this.registeredTabs.length;i>0;i--){this.deregisterTab(0);}this.switchCallbacks=[];this.refreshLayout();};// deregisterTab de-registers the tab with the given index: the element's click event listener (and the added callbacks)
// is removed, the element is hidden from view, and it is removed from the registeredTabs array,
DynamicTabs.prototype.deregisterTab=function(tabIndex){var refreshLayout=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;// Remove the event listener.
// this.registeredTabs[tabIndex].el.removeEventListener("click", this.registeredTabs[tabIndex].oc)
this.registeredTabs[tabIndex].el.removeEventListener("click",this.registeredTabs[tabIndex].el);// Remove the "data-dtr" attribute to hide the tab from view.
this.registeredTabs[tabIndex].el.removeAttribute("data-dtr");// Remove the active attribute (in case it is active).
this.registeredTabs[tabIndex].el.removeAttribute("data-dtactive");var ml=this.registeredTabs[tabIndex].el.style["margin-left"];if(ml!=="0px"&&ml!==""){this.registeredTabs[tabIndex].el.style["margin-left"]="0px";}// Splice the element out of the array.
this.registeredTabs.splice(tabIndex,1);if(this.registeredTabs.length===0){this.indicatorBar.style.width="0";}// When de-registering a single tab programmatically, refreshLayout should be set to true.
// Otherwise, when using method deregisterTabs or deregisterAllTabs, refreshLayout is called after
// all of the appropriate tabs are de-registered.
if(refreshLayout){this.refreshLayout();}};// setActiveTabIndex sets the active tab by its index in the array of registered tabs and then scrolls to it if necessary.
DynamicTabs.prototype.setActiveTabIndex=function(newIndex){// console.log("this.registeredTabs.length before setActiveTabIndex", this.registeredTabs.length)
// console.log("this.activeTabIndex before setActiveTabIndex", this.activeTabIndex)
// Reset if there are no registered tabs.
if(this.registeredTabs.length===0){this.activeTabIndex=0;return;}// If something weird is happening, we don't want an invalid index of an array accessed.
if(newIndex>=this.registeredTabs.length){console.log("ERROR: Invalid tab index failed to set");return;}this.activeTabIndex=newIndex;setActiveHighlight.call(this,newIndex);this.scrollToActiveTab();// Re-position the indicator
// console.log("this.registeredTabs.length after setActiveTabIndex", this.registeredTabs.length)
// console.log("this.activeTabIndex after setActiveTabIndex", this.activeTabIndex)
};DynamicTabs.prototype.addSwitchCallback=function(callback){this.switchCallbacks.push(callback);};DynamicTabs.prototype.refreshLayout=function(){var _this=this;if(this.registeredTabs.length===0){return;}// console.log("REFRESHING layout; this.activeTabIndex:", this.activeTabIndex)
this.framerWidth=this.framer.getBoundingClientRect().width;this.totalTabsWidth=0;var widths=this.registeredTabs.map(function(tab){var w=tab.el.getBoundingClientRect().width;_this.totalTabsWidth+=w;return w;});// console.log("All widths", widths)
// console.log("TOTAL TABS WIDTH:", this.totalTabsWidth)
if(this.totalTabsWidth>this.framerWidth){this.framer.style["text-align"]="left";// console.log("framer shift", this.framerShift)
resetRects.call(this,0,widths);this.scrollToActiveTab();// indicator will be reset
}else{this.framer.style["text-align"]="center";this.setTabsOffset(0);// reset the scroll amount (margin-left of the first tab) to 0
resetRects.call(this,(this.framerWidth-this.totalTabsWidth)/2,widths);this.resetIndicator();// reset with new tab dimensions (Vue will run setActiveTabIndex anyway, but that's okay)
this.hideArrow();}};DynamicTabs.prototype.scrollToActiveTab=function(){// Return if there's no need to scroll anywhere.
if(this.totalTabsWidth<=this.framerWidth){// the total number of framer widths that equal the length of totalTabsWidth
this.resetIndicator();return;}var activeTab=this.registeredTabs[this.activeTabIndex];// pixels to the left edge, relative to the left edge of framer
var leftEdge=activeTab.rect.left+this.framerShift;// pixels to the right edge, relative to the left edge of framer
var rightEdge=activeTab.rect.left+activeTab.rect.width+this.framerShift;if(leftEdge<0){// scroll to the left
// console.log("leftEdge", leftEdge);
// the left edge of activeTab is in the negative nThFrame
var nThFrame=Math.abs(leftEdge)/this.framerWidth;// console.log("nThFrame", nThFrame);
// console.log("-(nThFrame - ((activeTab.rect.width * 1.1) / this.framerWidth))", nThFrame + ((activeTab.rect.width * 1.1) / this.framerWidth))
this.scrollLeft(nThFrame+activeTab.rect.width*1.1/this.framerWidth);}else if(rightEdge>this.framerWidth){// scroll to the right
// console.log("rightEdge", rightEdge);
// the right edge of activeTab is in the nThFrame
var _nThFrame=rightEdge/this.framerWidth;// console.log("nThFrame", nThFrame);
// console.log("nThFrame - ((activeTab.rect.width * 1.1) / this.framerWidth)", nThFrame + ((activeTab.rect.width * 1.1) / this.framerWidth))
this.scrollRight(_nThFrame-activeTab.rect.width*1.1/this.framerWidth);}else{// there is no scrolling needed
if(this.activeTabIndex===0){// if active tab is the first one
this.hideArrow("left");}this.resetIndicator();// reset because not scrolling and not resetting in setActiveTabIndex
}// check if you should be able to scroll right
var lastTab=this.registeredTabs[this.registeredTabs.length-1].rect;// console.log("lastTab", lastTab)
var rightEdgeLast=lastTab.left+lastTab.width+this.framerShift;if(rightEdgeLast>this.framerWidth){this.showArrow("right");}};DynamicTabs.prototype.resetIndicator=function(){var indx=this.activeTabIndex;// Check if the index of the active tab is possible given the current number of registered tabs.
if(indx>=this.registeredTabs.length){// Act as if we were on the tab index of the new last tab, but don't set this tab as active; the app should set the tab index manually.
indx=this.registeredTabs.length-1;}// console.log("|||| RESETTING INDICATOR TO index", indx, " left:", this.framerShift + this.registeredTabs[indx].rect.left)
// console.log("this.registeredTabs[indx].rect.left", this.registeredTabs[indx].rect.left)
// console.log("this.framerShift", this.framerShift)
// console.log("INDICATOR NEW LEFT", this.framerShift + this.registeredTabs[indx].rect.left)
// console.log("INDICATOR NEW WIDTH", this.registeredTabs[indx].rect.width)
this.indicatorBar.style.left=this.framerShift+this.registeredTabs[indx].rect.left+"px";this.indicatorBar.style.width=this.registeredTabs[indx].rect.width+"px";};// scroll left n frameWidths; frameWidths defaults to 0.85 if undefined
DynamicTabs.prototype.scrollLeft=function(framerWidths){if(framerWidths===undefined){framerWidths=0.85;}var pixelsToShift=framerWidths*this.framerWidth;// if at left edge, don't scroll
if(this.framerShift>=0){return;}if(Math.abs(this.framerShift)>pixelsToShift){// scroll left pixelsToShift
this.setTabsOffset(this.framerShift+pixelsToShift);}else{// scroll to the left edge
this.setTabsOffset(0);this.hideArrow("left");}this.resetIndicator();this.showArrow("right");};// scroll the the right n frameWidths; frameWidths defaults to 0.85 if undefined
DynamicTabs.prototype.scrollRight=function(framerWidths){if(framerWidths===undefined){framerWidths=0.85;}var pixelsToShift=framerWidths*this.framerWidth;// the number of pixels that you can still scroll to the right
var canShift=Math.abs(this.totalTabsWidth-this.framerWidth+this.framerShift);// if at right edge, don't scroll
if(canShift<=0){return;}if(canShift>pixelsToShift){// scroll right pixelsToShift
this.setTabsOffset(this.framerShift-pixelsToShift);}else{// scroll to the right edge
this.setTabsOffset(-(this.totalTabsWidth-this.framerWidth));this.hideArrow("right");}this.resetIndicator();this.showArrow("left");};DynamicTabs.prototype.setTabsOffset=function(offset){this.framerShift=offset;this.registeredTabs[0].el.style["margin-left"]=this.framerShift+"px";};// specify whether to show the "left" arrow, the "right" arrow, or both (no argument)
DynamicTabs.prototype.showArrow=function(leftRightAll){if(leftRightAll==="left"){this.arrowLeft.style.visibility="";}else if(leftRightAll==="right"){this.arrowRight.style.visibility="";}else{this.arrowLeft.style.visibility="";this.arrowRight.style.visibility="";}};// specify whether to hide the "left" arrow, the "right" arrow, or both (no argument)
DynamicTabs.prototype.hideArrow=function(leftRightAll){if(leftRightAll==="left"){this.arrowLeft.style.visibility="hidden";}else if(leftRightAll==="right"){this.arrowRight.style.visibility="hidden";}else{this.arrowLeft.style.visibility="hidden";this.arrowRight.style.visibility="hidden";}};// Private utility functions:
// setActiveHighlight marks a registered tab in the DOM as the active one after un-marking the current active
// tab as active.
function setActiveHighlight(tabIndex){// If the array of registered tabs either has not changed or got changed but has the same number of tabs,
// must check to not try to set out of range tab index as not active.
if(this.activeTabIndex<this.registeredTabs.length){this.registeredTabs[this.activeTabIndex].el.removeAttribute("data-dtactive");}this.registeredTabs[tabIndex].el.setAttribute("data-dtactive","y");}// resetRects resets the boundingClientRect info of all registered tabs.
function resetRects(firstLeft,widths){// first, set the first tab manually because its left must be 0
setNewRect.call(this,0,{left:firstLeft,width:widths[0]});// adjust all the other tabs
for(var i=1,tabsLen=this.registeredTabs.length;i<tabsLen;i++){setNewRect.call(this,i,{left:this.registeredTabs[i-1].rect.left+this.registeredTabs[i-1].rect.width,width:widths[i]});}}// setNewRect replaces a registered tab by the array splice method (to make the mutation watchable from outside).
function setNewRect(tabIndex,rect){this.registeredTabs.splice(tabIndex,1,{el:this.registeredTabs[tabIndex].el,// oc: this.registeredTabs[tabIndex].oc,
rect:rect});}/* harmony default export */ __webpack_exports__["default"] = (DynamicTabs);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(2);


/***/ })
/******/ ]);