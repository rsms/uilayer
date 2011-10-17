Move.require.define("UILayer","UILayer/index.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, version;
  M = Move.runtime, _MoveKWArgsT = M._MoveKWArgsT, Text = M.Text, extend = M.extend, create = M.create, print = M.print, dprint = M.dprinter(module), repeat = M.repeat, after = M.after, JSON = M.JSON, __class = M.__class, EventEmitter = M.EventEmitter;
  EHTML = Move.EHTML;
  if (typeof window === "undefined" || !window.navigator || window.navigator.userAgent.indexOf("WebKit") === -1) {
    module.exports = null;
    return print("Error: UILayer is only compatible with WebKit");
  }
  module.exports = exports = require("./UILayer");
  exports.version = version = "0.0.5";
});
Move.require.define("UILayer/UIFrame","UILayer/UIFrame.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, mkCSSPixelValueProperty, UIFrame;
  M = Move.runtime, _MoveKWArgsT = M._MoveKWArgsT, Text = M.Text, extend = M.extend, create = M.create, print = M.print, dprint = M.dprinter(module), repeat = M.repeat, after = M.after, JSON = M.JSON, __class = M.__class, EventEmitter = M.EventEmitter;
  EHTML = Move.EHTML;
  mkCSSPixelValueProperty = function mkCSSPixelValueProperty(name, eventPropertyName, defaultValue) {
    name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, defaultValue = name.defaultValue, eventPropertyName = name.eventPropertyName, name = name.name);
    if (defaultValue === undefined) defaultValue = 0;
    return {
      enumerable: true,
      get: function () {
        var v;
        if (v = this.layer.element.style.getPropertyCSSValue(name)) {
          if (v.primitiveType === CSSPrimitiveValue.CSS_PX) return v.getFloatValue(CSSPrimitiveValue.CSS_PX);
        }
        return defaultValue;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        if (value === undefined || value === null) {
          this.layer.element.style.removeProperty(name);
          return;
        }
        if (typeof value === "number") this.layer.element.style.setProperty(name, value + "px", null); else this.layer.element.style.setProperty(name, Text(value), null);
        return this.layer.emit("UILayerFrameDidChange", {
          changedPropertyName: eventPropertyName
        });
      }
    };
  };
  module.exports = exports = UIFrame = __class(UIFrame = function UIFrame() {
    return __class.create(UIFrame, arguments);
  }, {
    constructor: function (layer) {
      layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, layer = layer.layer);
      return Object.defineProperty(this, "layer", {
        value: layer
      });
    },
    toString: function () {
      return "{x:" + this.x + ", y:" + this.y + ", width:" + this.width + ", height:" + this.height + "}";
    }
  });
  return Object.defineProperties(UIFrame.prototype, {
    width: mkCSSPixelValueProperty("width", "width", -1),
    height: mkCSSPixelValueProperty("height", "height", -1),
    x: {
      enumerable: true,
      get: function () {
        return this.layer.matrix.m41;
      },
      set: function () {
        var matrix;
        matrix = this.layer.matrix;
        matrix.m41 = arguments[0];
        return this.layer.matrix = matrix;
      }
    },
    y: {
      enumerable: true,
      get: function () {
        return this.layer.matrix.m42;
      },
      set: function () {
        var matrix;
        matrix = this.layer.matrix;
        matrix.m42 = arguments[0];
        return this.layer.matrix = matrix;
      }
    },
    z: {
      enumerable: true,
      get: function () {
        return this.layer.matrix.m43;
      },
      set: function () {
        var matrix;
        matrix = this.layer.matrix;
        matrix.m43 = arguments[0];
        return this.layer.matrix = matrix;
      }
    }
  });
});
Move.require.define("UILayer/UILayer","UILayer/UILayer.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, UIFrame, classNames, addClassName, hasClassName, removeClassName, _canonicalColor, kSpecialProperties, UILayer, isTouchDevice, touchEventsToMouseEvents, makeFakeTouchEvent, UIEvent, FocusEvent, MouseEvent, TouchEvent, WheelEvent, TextEvent, KeyboardEvent, CompositionEvent, MutationEvent, MutationNameEvent, CustomEvent, TransitionEvent, kEventClasses, head, baseStyle;
  M = Move.runtime, _MoveKWArgsT = M._MoveKWArgsT, Text = M.Text, extend = M.extend, create = M.create, print = M.print, dprint = M.dprinter(module), repeat = M.repeat, after = M.after, JSON = M.JSON, __class = M.__class, EventEmitter = M.EventEmitter;
  EHTML = Move.EHTML;
  UIFrame = require("./UIFrame");
  if (!document.documentElement || document.documentElement.classList) {
    classNames = function classNames(el) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, el = el.el);
      return el.classList;
    };
    addClassName = function addClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.classList.add(className);
    };
    hasClassName = function hasClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.classList.contains(className);
    };
    removeClassName = function removeClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.classList.remove(className);
    };
  } else {
    classNames = function classNames(el) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, el = el.el);
      return el.className.split(/\s+/);
    };
    addClassName = function addClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.className += " " + className;
    };
    hasClassName = function hasClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return classNames(el).indexOf(className) !== -1;
    };
    removeClassName = function removeClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.className = classNames(el).filter(function (n) {
        n !== null && typeof n === "object" && n.__kw === _MoveKWArgsT && (arguments.keywords = n, n = n.n);
        return n !== className;
      }).join(" ");
    };
  }
  _canonicalColor = function _canonicalColor(color) {
    color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
    var isArray;
    if (!(isArray = Array.isArray(color)) && typeof color === "object") {
      color = [ color.r, color.g, color.b, color.a ];
      isArray = true;
    }
    if (isArray) {
      color = (255 * Number(color[0] || 0)).toFixed(0) + "," + (255 * Number(color[1] || 0)).toFixed(0) + "," + (255 * Number(color[2] || 0)).toFixed(0);
      if (color[3] !== undefined) {
        color = "rgba(" + color + "," + Number(color[3] || 0) + ")";
      } else {
        color = "rgb(" + color + ")";
      }
    } else {
      color = Text(color);
    }
    return color;
  };
  kSpecialProperties = {
    element: 1,
    debug: 1,
    x: 1,
    y: 1,
    width: 1,
    height: 1,
    className: 1,
    ownerDocument: 1
  };
  module.exports = UILayer = __class(UILayer = function UILayer() {
    return __class.create(UILayer, arguments);
  }, {
    constructor: function () {
      var kwargs, element;
      kwargs = typeof arguments[0] === "object" ? arguments[0] : arguments.keywords || {};
      element = kwargs.element;
      if (!element || typeof element !== "object" || !(element instanceof HTMLElement)) element = (kwargs.ownerDocument || document).createElement("div");
      element.UILayer = this;
      kwargs.element = undefined;
      addClassName(element, "uilayer");
      if (this.className) addClassName(element, this.className);
      if (kwargs.className) addClassName(element, kwargs.className);
      Object.defineProperties(this, {
        element: {
          value: element
        }
      });
      addClassName(this.element, "textureBacked");
      this._is3DBacked = true;
      if (kwargs.x !== undefined) this.frame.x = kwargs.x;
      if (kwargs.y !== undefined) this.frame.y = kwargs.y;
      if (kwargs.width !== undefined) this.frame.width = kwargs.width;
      if (kwargs.height !== undefined) this.frame.height = kwargs.height;
      if (kwargs.debug || kwargs.debug === undefined && UILayer.debug) element.style.backgroundColor = "hsla(" + Math.random() * 359 + ", 90%, 90%, 0.5)";
      return Object.prototype.forEach.call(kwargs, function (key, value) {
        key !== null && typeof key === "object" && key.__kw === _MoveKWArgsT && (arguments.keywords = key, value = key.value, key = key.key);
        if (value !== undefined && value !== _MoveKWArgsT && !(key in kSpecialProperties)) return this[key] = value;
      }, this);
    }
  });
  UILayer.layersInElement = function layersInElement(element) {
    element !== null && typeof element === "object" && element.__kw === _MoveKWArgsT && (arguments.keywords = element, element = element.element);
    var sublayers, cn, i, el;
    sublayers = [];
    cn = element.childNodes;
    for (i = 0; i < cn.length; ++i) {
      el = cn[i];
      if (el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) sublayers.push(el.UILayer);
    }
    return sublayers;
  };
  UILayer.firstLayerInElement = function firstLayerInElement(element) {
    element !== null && typeof element === "object" && element.__kw === _MoveKWArgsT && (arguments.keywords = element, element = element.element);
    var cn, i, el;
    cn = element.childNodes;
    for (i = 0; i < cn.length; ++i) {
      el = cn[i];
      if (el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) return el.UILayer;
    }
  };
  UILayer.layerWithTag = function layerWithTag(tag) {
    tag !== null && typeof tag === "object" && tag.__kw === _MoveKWArgsT && (arguments.keywords = tag, tag = tag.tag);
    var el;
    el = document.getElementById(Text(tag));
    return el && el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer) && el.UILayer;
  };
  UILayer.toString = function toString() {
    return "[object UILayer]";
  };
  UILayer.properties = {
    is3DBacked: {
      get: function () {
        return !!this._is3DBacked;
      }
    },
    sublayers: {
      get: function () {
        return UILayer.layersInElement(this.element);
      },
      set: function (sublayers) {
        sublayers !== null && typeof sublayers === "object" && sublayers.__kw === _MoveKWArgsT && (arguments.keywords = sublayers, sublayers = sublayers.sublayers);
        if (!Array.isArray(sublayers)) throw TypeError("sublayers argument must be an array of UILayers");
        this.sublayers.forEach(function (sublayer) {
          sublayer !== null && typeof sublayer === "object" && sublayer.__kw === _MoveKWArgsT && (arguments.keywords = sublayer, sublayer = sublayer.sublayer);
          return this.element.removeChild(sublayer);
        });
        return sublayers.forEach(function (sublayer) {
          sublayer !== null && typeof sublayer === "object" && sublayer.__kw === _MoveKWArgsT && (arguments.keywords = sublayer, sublayer = sublayer.sublayer);
          return this.addSublayer(sublayer);
        }, this);
      }
    },
    firstSublayer: {
      get: function () {
        return UILayer.firstLayerInElement(this.element);
      }
    },
    superlayer: {
      get: function () {
        var pel;
        return (pel = this.element.parentNode) && pel.UILayer && UILayer.prototype.isPrototypeOf(pel.UILayer) && pel.UILayer;
      }
    },
    perspective: {
      get: function () {
        var v;
        return (v = this.style.getPropertyCSSValue("-webkit-perspective")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER) || 0;
      },
      set: function (distance) {
        distance !== null && typeof distance === "object" && distance.__kw === _MoveKWArgsT && (arguments.keywords = distance, distance = distance.distance);
        return this.element.style.webkitPerspective = distance || "none";
      }
    },
    perspectiveOrigin: {
      get: function () {
        var style, v;
        style = this.element.style;
        return [ (v = style.getPropertyCSSValue("-webkit-perspective-origin-x")) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || .5) / 100, (v = style.getPropertyCSSValue("-webkit-perspective-origin-y")) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || .5) / 100, (v = style.getPropertyCSSValue("-webkit-perspective-origin-z")) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || 0) / 100 ];
      },
      set: function (distance) {
        distance !== null && typeof distance === "object" && distance.__kw === _MoveKWArgsT && (arguments.keywords = distance, distance = distance.distance);
        if (Array.isArray(distance)) distance = distance[0] * 100 + "% " + (distance[1] || .5) * 100 + "% " + (distance[2] || 0) * 100 + "%";
        return this.element.style.webkitPerspectiveOrigin = distance;
      }
    },
    preserve3d: {
      get: function () {
        return this.element.style.webkitTransformStyle === "preserve-3d";
      },
      set: function (preserve3d) {
        preserve3d !== null && typeof preserve3d === "object" && preserve3d.__kw === _MoveKWArgsT && (arguments.keywords = preserve3d, preserve3d = preserve3d.preserve3d);
        if (preserve3d) {
          return this.element.style.setProperty("-webkit-transform-style", "preserve-3d", null);
        } else {
          return this.element.style.removeProperty("-webkit-transform-style");
        }
      }
    },
    frame: {
      get: function () {
        var frame_;
        if (!(frame_ = this.frame_)) {
          frame_ = UIFrame(this);
          Object.defineProperty(this, "frame_", {
            value: frame_
          });
        }
        return frame_;
      },
      set: function (frame) {
        frame !== null && typeof frame === "object" && frame.__kw === _MoveKWArgsT && (arguments.keywords = frame, frame = frame.frame);
        var frame_;
        if (typeof frame !== "object") throw TypeError("not an object");
        frame_ = this.frame;
        return frame.forEach(function (name, value) {
          name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, value = name.value, name = name.name);
          return frame_[name] = value;
        });
      }
    },
    computedBounds: {
      get: function () {
        var style, bounds, v;
        style = this.computedStyle;
        bounds = {
          width: 0,
          height: 0
        };
        if ((v = style.getPropertyCSSValue("width")) && v.primitiveType === CSSPrimitiveValue.CSS_PX) {
          bounds.width = v.getFloatValue(CSSPrimitiveValue.CSS_PX);
        } else {
          bounds.width = -1;
        }
        if ((v = style.getPropertyCSSValue("height")) && v.primitiveType === CSSPrimitiveValue.CSS_PX) {
          bounds.height = v.getFloatValue(CSSPrimitiveValue.CSS_PX);
        } else {
          bounds.height = -1;
        }
        return bounds;
      }
    },
    computedStyle: {
      get: function () {
        return window.getComputedStyle(this.element);
      }
    },
    style: {
      get: function () {
        return this.element.style;
      },
      set: function (style) {
        style !== null && typeof style === "object" && style.__kw === _MoveKWArgsT && (arguments.keywords = style, style = style.style);
        var style_;
        style_ = this.element.style;
        return style.forEach(function (k, v) {
          k !== null && typeof k === "object" && k.__kw === _MoveKWArgsT && (arguments.keywords = k, v = k.v, k = k.k);
          return style_[k] = v;
        });
      }
    },
    classNames: {
      get: function () {
        return classNames(this.element);
      },
      set: function (cssClassNames) {
        cssClassNames !== null && typeof cssClassNames === "object" && cssClassNames.__kw === _MoveKWArgsT && (arguments.keywords = cssClassNames, cssClassNames = cssClassNames.cssClassNames);
        if (Array.isArray(cssClassNames)) cssClassNames = cssClassNames.join(" ");
        return this.element.className = cssClassNames;
      }
    },
    doubleSided: {
      get: function () {
        return this.element.style.webkitBackfaceVisibility === "visible";
      },
      set: function (doubleSided) {
        doubleSided !== null && typeof doubleSided === "object" && doubleSided.__kw === _MoveKWArgsT && (arguments.keywords = doubleSided, doubleSided = doubleSided.doubleSided);
        if (doubleSided) {
          return this.element.style.setProperty("-webkit-backface-visibility", "visible", null);
        } else {
          return this.element.style.removeProperty("-webkit-backface-visibility");
        }
      }
    },
    cornerRadius: {
      get: function () {
        var v;
        return (v = this.computedStyle.getPropertyCSSValue("-webkit-border-top-left-radius")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER) || 0;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        if (value && (value = Number(value))) {
          return this.element.style.webkitBorderRadius = value.toFixed(0) + "px";
        } else {
          return this.element.style.webkitBorderRadius = null;
        }
      }
    },
    backgroundColor: {
      get: function () {
        var color;
        color = this.computedStyle.backgroundColor;
        if (color === "transparent") color = null;
        return color;
      },
      set: function (color) {
        color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
        color = _canonicalColor(color);
        return this.element.style.backgroundColor = color;
      }
    },
    color: {
      get: function () {
        return this.computedStyle.color;
      },
      set: function (color) {
        color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
        return this.element.style.color = color;
      }
    },
    hidden: {
      get: function () {
        return this.computedStyle.visibility === "hidden";
      },
      set: function (hidden) {
        hidden !== null && typeof hidden === "object" && hidden.__kw === _MoveKWArgsT && (arguments.keywords = hidden, hidden = hidden.hidden);
        return this.computedStyle.visibility = hidden ? "hidden" : null;
      }
    },
    masksToBounds: {
      get: function () {
        return this.computedStyle.overflow === "hidden";
      },
      set: function (clip) {
        clip !== null && typeof clip === "object" && clip.__kw === _MoveKWArgsT && (arguments.keywords = clip, clip = clip.clip);
        return this.style.overflow = clip ? "hidden" : null;
      }
    },
    opacity: {
      get: function () {
        var v;
        return (v = this.computedStyle.getPropertyCSSValue("opacity")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER);
      },
      set: function (opacity) {
        opacity !== null && typeof opacity === "object" && opacity.__kw === _MoveKWArgsT && (arguments.keywords = opacity, opacity = opacity.opacity);
        return this.element.style.opacity = Number(opacity);
      }
    },
    zPosition: {
      get: function () {
        var v;
        return (v = this.computedStyle.getPropertyCSSValue("z-index")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER);
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        return this.element.style.zIndex = Number(value).toFixed(0);
      }
    },
    animated: {
      get: function () {
        if (!hasClassName(this.element, "animated")) return false;
        return this.computedStyle.webkitTransitionProperty;
      },
      set: function (animated) {
        animated !== null && typeof animated === "object" && animated.__kw === _MoveKWArgsT && (arguments.keywords = animated, animated = animated.animated);
        if (animated && animated !== "none") {
          addClassName(this.element, "animated");
          if (animated === "geometry") {
            animated = "-webkit-transform,width,height";
          } else if (animated === "transform") {
            animated = "-webkit-transform";
          } else if (Array.isArray(animated)) {
            animated = animated.join(",");
          } else if (typeof animated !== "string") {
            animated = "all";
          }
          return this.element.style.setProperty("-webkit-transition-property", animated, null);
        } else if (hasClassName(this.element, "animated")) {
          removeClassName(this.element, "animated");
          return this.element.style.removeProperty("-webkit-transition");
        }
      }
    },
    animationDuration: {
      get: function () {
        var v;
        if (v = this.style.getPropertyCSSValue("-webkit-transition-duration")) {
          return v.getFloatValue(CSSPrimitiveValue.CSS_MS);
        } else if (v = this.computedStyle.getPropertyCSSValue("-webkit-transition-duration")) {
          return v[0].getFloatValue(CSSPrimitiveValue.CSS_MS);
        }
        return 0;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        if (typeof value !== "number") throw TypeError("animationDuration must be a number"); else if (value < 0) throw TypeError("animationDuration must be a positive number");
        return this.element.style.setProperty("-webkit-transition-duration", value.toFixed(0) + "ms", null);
      }
    },
    animationTimingFunction: {
      get: function () {
        var v;
        if (v = this.computedStyle.getPropertyCSSValue("-webkit-transition-timing-function")) return v.cssText;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        return this.element.style.setProperty("-webkit-transition-timing-function", value, null);
      }
    },
    ownerDocument: {
      get: function () {
        return this.element.ownerDocument;
      }
    },
    document: {
      get: function () {
        var ownerDocument;
        ownerDocument = this.ownerDocument;
        return ownerDocument.documentElement.contains(this.element) && ownerDocument;
      }
    },
    tag: {
      get: function () {
        return this.element.id;
      },
      set: function (tag) {
        tag !== null && typeof tag === "object" && tag.__kw === _MoveKWArgsT && (arguments.keywords = tag, tag = tag.tag);
        return this.element.id = Text(tag);
      }
    },
    excludedFromHitTesting: {
      get: function () {
        return this.element.style.getPropertyValue("pointer-events") === "none";
      },
      set: function (isExcluded) {
        isExcluded !== null && typeof isExcluded === "object" && isExcluded.__kw === _MoveKWArgsT && (arguments.keywords = isExcluded, isExcluded = isExcluded.isExcluded);
        if (isExcluded) return this.element.style.setProperty("pointer-events", "none", null); else return this.element.style.removeProperty("pointer-events");
      }
    }
  };
  UILayer.hitTest = function hitTest(x, y) {
    x !== null && typeof x === "object" && x.__kw === _MoveKWArgsT && (arguments.keywords = x, y = x.y, x = x.x);
    var element, el;
    if (element = document.elementFromPoint(x, y)) {
      el = element;
      while (!UILayer.prototype.isPrototypeOf(el.UILayer) || el !== element && el.UILayer.excludedFromHitTesting) {
        if (!(el = el.parentNode)) return;
      }
      return el.UILayer;
    }
  };
  UILayer.textureBackedProperties = {
    matrix: {
      get: function () {
        return this._matrix || (this._matrix = new WebKitCSSMatrix(this.element.style.webkitTransform));
      },
      set: function () {
        M = this._matrix = arguments[0];
        if (!M || !(M instanceof WebKitCSSMatrix)) {
          this._matrix = null;
          return this.element.style.webkitTransform = null;
        } else {
          return this.element.style.webkitTransform = "matrix3d(" + M.m11 + "," + M.m12 + "," + M.m13 + "," + M.m14 + "," + M.m21 + "," + M.m22 + "," + M.m23 + "," + M.m24 + "," + M.m31 + "," + M.m32 + "," + M.m33 + "," + M.m34 + "," + M.m41 + "," + M.m42 + "," + M.m43 + "," + M.m44 + ")";
        }
      }
    },
    scale: {
      get: function () {
        return this.matrix.m11;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        var matrix;
        if (value === undefined || value === null) value = 1; else if (typeof value !== "number") value = Number(value);
        if (value <= 0) throw TypeError("scale must be larger than zero");
        matrix = this.matrix;
        matrix.m11 = value;
        matrix.m22 = value;
        matrix.m33 = value;
        return this.matrix = matrix;
      }
    },
    rotateBy: {
      value: function () {
        var matrix;
        matrix = this.matrix;
        return this.matrix = matrix.rotate.apply(matrix, arguments);
      }
    },
    rotateAxisAngleBy: {
      value: function () {
        var matrix;
        matrix = this.matrix;
        return this.matrix = matrix.rotateAxisAngle.apply(matrix, arguments);
      }
    },
    scaleBy: {
      value: function () {
        var matrix;
        matrix = this.matrix;
        return this.matrix = matrix.scale.apply(matrix, arguments);
      }
    },
    moveBy: {
      value: function () {
        var matrix;
        matrix = this.matrix;
        return this.matrix = matrix.translate.apply(matrix, arguments);
      }
    },
    anchorPoint: {
      get: function () {
        var point, v;
        point = [ .5, .5, 0 ];
        if (v = this.element.style.getPropertyCSSValue("-webkit-transform-origin-x")) point[0] = v.getFloatValue(v.primitiveType) / 100;
        if (v = this.element.style.getPropertyCSSValue("-webkit-transform-origin-y")) point[1] = v.getFloatValue(v.primitiveType) / 100;
        if (v = this.element.style.getPropertyCSSValue("-webkit-transform-origin-z")) point[3] = v.getFloatValue(v.primitiveType) / 100;
        return point;
      },
      set: function (origin) {
        origin !== null && typeof origin === "object" && origin.__kw === _MoveKWArgsT && (arguments.keywords = origin, origin = origin.origin);
        var style;
        style = this.element.style;
        if (origin[0] === .5 || origin[0] === undefined) {
          style.removeProperty("-webkit-transform-origin-x");
        } else {
          style.setProperty("-webkit-transform-origin-x", (100 * origin[0]).toFixed(0) + "%", null);
        }
        if (origin[1] === .5 || origin[1] === undefined) {
          style.removeProperty("-webkit-transform-origin-y");
        } else {
          style.setProperty("-webkit-transform-origin-y", (100 * origin[1]).toFixed(0) + "%", null);
        }
        if (origin[2] === 0 || origin[2] === undefined) {
          return style.removeProperty("-webkit-transform-origin-z");
        } else {
          return style.setProperty("-webkit-transform-origin-z", (100 * origin[2]).toFixed(0) + "%", null);
        }
      }
    }
  };
  UILayer.prototype._setupSublayer = function _setupSublayer(layer) {
    layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, layer = layer.layer);
    var style;
    if (!layer || UILayer.prototype.isPrototypeOf(layer.UILayer)) throw TypeError("Sublayer " + JSON(layer) + " is not a UILayer");
    if (layer.frame.width < 0) {
      style = layer.element.style;
      if (!style.width) style.width = "auto";
      style.right = style.left = "0";
    }
    if (layer.frame.height < 0 && layer.style.height !== "inherit") {
      style = layer.element.style;
      if (!style.height) style.height = "auto";
      return style.top = style.bottom = "0";
    }
  };
  UILayer.prototype.addSublayer = function addSublayer(layer) {
    layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, layer = layer.layer);
    this._setupSublayer(layer);
    this.element.appendChild(layer.element);
    layer.emit("uilayer:added-to-superlayer", {
      superlayer: this
    });
    this.emit("uilayer:added-sublayer", {
      sublayer: layer
    });
    return layer;
  };
  UILayer.prototype.removeSublayer = function removeSublayer(layer, index) {
    layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, index = layer.index, layer = layer.layer);
    var cn, el;
    cn = this.element.childNodes;
    if (layer && UILayer.prototype.isPrototypeOf(layer)) {
      el = layer.element;
    } else if (index && (index = Number(index)) >= 0 && !isNaN(index)) {
      el = cn.item(index);
    }
    if (el && el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
      try {
        this.element.removeChild(el);
      } catch (e) {
        return undefined;
      }
      layer = el.UILayer;
      layer.emit("uilayer:removed-from-superlayer", {
        superlayer: this
      });
      this.emit("uilayer:removed-sublayer", {
        sublayer: layer
      });
      return layer;
    }
  };
  UILayer.prototype.removeFromSuperlayer = function removeFromSuperlayer() {
    var superlayer;
    if (!(superlayer = this.superlayer)) throw Error("Not attached to any superlayer");
    superlayer.element.removeChild(this.element);
    this.emit("uilayer:removed-from-superlayer", {
      superlayer: superlayer
    });
    return superlayer.emit("uilayer:removed-sublayer", {
      sublayer: this
    });
  };
  UILayer.prototype.removeAllSublayers = function removeAllSublayers() {
    var removedSublayers, cn, i, el;
    removedSublayers = [];
    cn = this.element.childNodes;
    for (i = 0; i < cn.length; ++i) {
      el = cn[i];
      if (el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
        removedSublayers.push(el.UILayer);
        this.element.removeChild(el);
      }
    }
    return removedSublayers;
  };
  UILayer.prototype.setSublayerAtIndex = function setSublayerAtIndex(index, layer) {
    index !== null && typeof index === "object" && index.__kw === _MoveKWArgsT && (arguments.keywords = index, layer = index.layer, index = index.index);
    var el;
    if (!layer || !UILayer.prototype.isPrototypeOf(layer)) layer = null; else this._setupSublayer(layer);
    if (index && (index = Number(index)) >= 0 && !isNaN(index)) {
      el = this.element.childNodes.item(index);
      if (el && el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
        if (layer) {
          this.element.replaceChild(layer.element, el);
          layer.emit("uilayer:added-to-superlayer", {
            superlayer: this
          });
          this.emit("uilayer:added-sublayer", {
            sublayer: layer
          });
        } else {
          this.element.removeChild(el);
        }
        el.UILayer.emit("uilayer:removed-from-superlayer", {
          superlayer: this
        });
        this.emit("uilayer:removed-sublayer", {
          sublayer: el.UILayer
        });
        return el;
      }
    }
    this.element.appendChild(layer.element);
    layer.emit("uilayer:added-to-superlayer", {
      superlayer: this
    });
    return this.emit("uilayer:added-sublayer", {
      sublayer: layer
    });
  };
  UILayer.prototype.superlayerInClassStructure = function superlayerInClassStructure() {
    var expectedClassStructure, i, superlayer, cls;
    expectedClassStructure = arguments;
    i = 0;
    superlayer = this;
    while (superlayer && (cls = expectedClassStructure[i++])) {
      superlayer = superlayer.superlayer;
      if (!superlayer || !cls.prototype.isPrototypeOf(superlayer)) {
        superlayer = undefined;
        break;
      }
    }
    return superlayer;
  };
  UILayer.prototype.isSublayerOf = function isSublayerOf(superlayer) {
    superlayer !== null && typeof superlayer === "object" && superlayer.__kw === _MoveKWArgsT && (arguments.keywords = superlayer, superlayer = superlayer.superlayer);
    return superlayer && UILayer.prototype.isPrototypeOf(superlayer) && this.element.parentNode === superlayer.element;
  };
  UILayer.prototype.layerWithTag = UILayer.layerWithTag, UILayer.prototype.toJSON = function toJSON() {
    var obj, sublayers;
    obj = {
      frame: this.frame,
      scale: this.scale,
      origin: this.origin
    };
    if ((sublayers = this.sublayers).length) obj.sublayers = sublayers;
    if (this.animated) {
      obj.animated = true;
      obj.animationDelay = this.animationDelay;
      obj.animationDuration = this.animationDuration;
      obj.animationTimingFunction = this.animationTimingFunction;
    }
    return obj;
  };
  isTouchDevice = false;
  if ("ontouchstart" in window && "ontouchend" in document) try {
    document.createEvent("TouchEvent");
    isTouchDevice = true;
  } catch (e) {}
  if (!isTouchDevice) {
    touchEventsToMouseEvents = {
      touchstart: "mousedown",
      touchmove: "mousemove",
      touchend: "mouseup"
    };
    makeFakeTouchEvent = function makeFakeTouchEvent(event, callback) {
      event !== null && typeof event === "object" && event.__kw === _MoveKWArgsT && (arguments.keywords = event, callback = event.callback, event = event.event);
      return function (ev) {
        ev !== null && typeof ev === "object" && ev.__kw === _MoveKWArgsT && (arguments.keywords = ev, ev = ev.ev);
        ev.touches = [ {
          clientX: ev.clientX,
          clientY: ev.clientY,
          identifier: ev.identifier,
          pageX: ev.pageX,
          pageY: ev.pageY,
          screenX: ev.screenX,
          screenY: ev.screenY,
          target: ev.target
        } ];
        return callback.apply(this, Array.prototype.slice.call(arguments));
      };
    };
    UILayer.prototype.on = function on(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      var compatType, layer, eventHandler;
      if (compatType = touchEventsToMouseEvents[type]) {
        type = compatType;
        handler = makeFakeTouchEvent(type, handler);
      }
      layer = this;
      eventHandler = function eventHandler() {
        return handler.apply(layer, arguments);
      };
      this.element.addEventListener(type, eventHandler, false);
      return eventHandler;
    };
    UILayer.prototype.removeEventListener = function removeEventListener(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      this.element.removeEventListener(touchEventsToMouseEvents[type] || type, handler, false);
      return handler;
    };
  } else {
    UILayer.prototype.on = function on(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      var layer, eventHandler;
      layer = this;
      eventHandler = function eventHandler() {
        return handler.apply(layer, arguments);
      };
      this.element.addEventListener(type, eventHandler, false);
      return eventHandler;
    };
    UILayer.prototype.removeEventListener = function removeEventListener(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      this.element.removeEventListener(type, handler, false);
      return handler;
    };
  }
  UIEvent = "UIEvent";
  FocusEvent = "FocusEvent";
  MouseEvent = "MouseEvent";
  TouchEvent = "TouchEvent";
  WheelEvent = "WheelEvent";
  TextEvent = "TextEvent";
  KeyboardEvent = "KeyboardEvent";
  CompositionEvent = "CompositionEvent";
  MutationEvent = "MutationEvent";
  MutationNameEvent = "MutationNameEvent";
  CustomEvent = "CustomEvent";
  TransitionEvent = "TransitionEvent";
  kEventClasses = {
    DOMActivate: UIEvent,
    load: UIEvent,
    unload: UIEvent,
    abort: UIEvent,
    error: UIEvent,
    select: UIEvent,
    resize: UIEvent,
    scroll: UIEvent,
    blur: FocusEvent,
    DOMFocusIn: FocusEvent,
    DOMFocusOut: FocusEvent,
    focus: FocusEvent,
    focusin: FocusEvent,
    focusout: FocusEvent,
    click: MouseEvent,
    dblclick: MouseEvent,
    mousedown: MouseEvent,
    mouseenter: MouseEvent,
    mouseleave: MouseEvent,
    mousemove: MouseEvent,
    mouseover: MouseEvent,
    mouseout: MouseEvent,
    mouseup: MouseEvent,
    touchstart: TouchEvent,
    touchmove: TouchEvent,
    touchend: TouchEvent,
    touchcancel: TouchEvent,
    wheel: WheelEvent,
    textinput: TextEvent,
    keydown: KeyboardEvent,
    keypress: KeyboardEvent,
    keyup: KeyboardEvent,
    compositionstart: CompositionEvent,
    compositionupdate: CompositionEvent,
    compositionend: CompositionEvent,
    DOMAttrModified: MutationEvent,
    DOMCharacterDataModified: MutationEvent,
    DOMNodeInserted: MutationEvent,
    DOMNodeInsertedIntoDocument: MutationEvent,
    DOMNodeRemoved: MutationEvent,
    DOMNodeRemovedFromDocument: MutationEvent,
    DOMSubtreeModified: MutationEvent,
    DOMAttributeNameChanged: MutationNameEvent,
    DOMElementNameChanged: MutationNameEvent,
    transitionend: TransitionEvent
  };
  UILayer.prototype.emit = function emit() {
    var options, eventClass, ev, keysToIgnore;
    if (typeof arguments[0] === "object") options = arguments[0]; else if (typeof arguments.keywords === "object") options = arguments.keywords; else {
      options = typeof arguments[1] === "object" ? arguments[1] : {};
      options.type = arguments[0];
    }
    if (!options.type) throw Error("no event type specified");
    eventClass = kEventClasses[options.type] || CustomEvent;
    if (eventClass === TouchEvent && !isTouchDevice) {
      options.type = touchEventsToMouseEvents[options.type];
      eventClass = kEventClasses[options.type] || CustomEvent;
    }
    if (!(ev = document.createEvent(eventClass))) {
      eventClass = CustomEvent;
      ev = document.createEvent(eventClass);
    }
    options.bubbles = !!(options.bubbles === undefined ? true : options.bubbles);
    options.cancelable = !!(options.cancelable === undefined ? true : options.cancelable);
    if (eventClass === UIEvent) {
      ev.initUIEvent(options.type, options.bubbles, options.cancelable, options.view || window, options.detail !== undefined ? options.detail : 1);
    } else if (eventClass === MouseEvent) {
      ev.initMouseEvent(options.type, options.bubbles, options.cancelable, options.view || window, options.detail !== undefined ? options.detail : 1, options.screenX, options.screenY, options.clientX, options.clientY, !!options.ctrlKey, !!options.altKey, !!options.shiftKey, !!options.metaKey, options.button !== undefined ? Number(options.button) : undefined, options.relatedTarget);
    } else if (eventClass === TransitionEvent) {
      ev.initTransitionEvent(options.type, options.bubbles, options.cancelable, options.propertyName, options.elapsedTime);
    } else {
      if (eventClass === CustomEvent) {
        ev.initCustomEvent(options.type, options.bubbles, options.cancelable, options.detail);
      } else {
        ev.initEvent(options.type, options.bubbles, options.cancelable);
      }
      keysToIgnore = {
        __kw: 1,
        type: 1,
        bubbles: 1,
        cancelable: 1,
        detail: 1
      };
      options.forEach(function (key, value) {
        key !== null && typeof key === "object" && key.__kw === _MoveKWArgsT && (arguments.keywords = key, value = key.value, key = key.key);
        if (key in keysToIgnore) return;
        return ev[key] = value;
      });
    }
    return this.element.dispatchEvent(ev);
  };
  Object.defineProperties(UILayer.prototype, UILayer.properties);
  Object.defineProperties(UILayer.prototype, UILayer.textureBackedProperties);
  if ((head = document.getElementsByTagName("head")).length) head = head[0]; else head = document.body || document.documentElement;
  baseStyle = document.createElement("style");
  baseStyle.id = "UILayer-base-style";
  baseStyle.appendChild(document.createTextNode(".uilayer {" + "  display: block;" + "  visibility: visible;" + "  position: absolute;" + "  left:0; top:0; width:auto; height:auto;" + "  overflow: visible;" + "  z-index:0;" + "  opacity:1;" + "}\n" + ".uilayer.textureBacked {" + "  -webkit-transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);" + "  -webkit-transform-origin: 50% 50% 0%;" + "  -webkit-backface-visibility: hidden;" + "  -webkit-transform-style: flat;" + "}\n" + ".uilayer.animated {" + "  -webkit-transition-duration: 500ms;" + "  -webkit-transition-timing-function: ease;" + "  -webkit-transition-delay: 0;" + "  -webkit-transition-property: none;" + "}"));
  return head.appendChild(baseStyle);
});