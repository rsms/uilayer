Move.require.define("UILayer/UILayer","UILayer/UILayer.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, UIFrame, classNames, addClassName, hasClassName, removeClassName, DEPRECATED_WARN, DEPRECATED_PROPERTY_WARNINGS, DEPRECATED_PROPERTY, _canonicalColor, _swapElement, kSpecialProperties, prefixed, lookupCSS, lookupJS, UILayer, CSSMatrix, XCSSMatrix, isTouchDevice, touchEventsToMouseEvents, makeFakeTouchEvent, UIEvent, FocusEvent, MouseEvent, TouchEvent, WheelEvent, TextEvent, KeyboardEvent, CompositionEvent, MutationEvent, MutationNameEvent, CustomEvent, TransitionEvent, kEventClasses, RotationProxy, head, baseStyle;
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
  DEPRECATED_WARN = function DEPRECATED_WARN(oldName, newName) {
    oldName !== null && typeof oldName === "object" && oldName.__kw === _MoveKWArgsT && (arguments.keywords = oldName, newName = oldName.newName, oldName = oldName.oldName);
    return console.warn(oldName + " is deprecated." + (newName ? " Use " + newName + " instead." : ""));
  };
  DEPRECATED_PROPERTY_WARNINGS = {};
  DEPRECATED_PROPERTY = function DEPRECATED_PROPERTY(oldName, newName) {
    oldName !== null && typeof oldName === "object" && oldName.__kw === _MoveKWArgsT && (arguments.keywords = oldName, newName = oldName.newName, oldName = oldName.oldName);
    return {
      get: function () {
        if (!DEPRECATED_PROPERTY_WARNINGS["get " + oldName]) {
          DEPRECATED_WARN(oldName, newName);
          DEPRECATED_PROPERTY_WARNINGS["get " + oldName] = true;
        }
        return this[newName];
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        if (!DEPRECATED_PROPERTY_WARNINGS["set " + oldName]) {
          DEPRECATED_WARN(oldName, newName);
          DEPRECATED_PROPERTY_WARNINGS["set " + oldName] = true;
        }
        return this[newName] = value;
      }
    };
  };
  _canonicalColor = function _canonicalColor(color) {
    color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
    var rgb;
    if (Array.isArray(color)) {
      if (color.length === 1) {
        color = [ color, color, color ];
      } else if (color.length === 2) {
        color = [ color[0], color[0], color[0], color[1] ];
      }
      rgb = (255 * Number(color[0] || 0)).toFixed(0) + "," + (255 * Number(color[1] || 0)).toFixed(0) + "," + (255 * Number(color[2] || 0)).toFixed(0);
      if (color[3] !== undefined) {
        color = "rgba(" + rgb + "," + Number(color[3] || 0) + ")";
      } else {
        color = "rgb(" + rgb + ")";
      }
    } else {
      color = Text(color);
    }
    return color;
  };
  _swapElement = function _swapElement(parentNode, oldElement, newElement, deep) {
    parentNode !== null && typeof parentNode === "object" && parentNode.__kw === _MoveKWArgsT && (arguments.keywords = parentNode, deep = parentNode.deep, newElement = parentNode.newElement, oldElement = parentNode.oldElement, parentNode = parentNode.parentNode);
    var newAttrs, oldAttributes, otherUILayer;
    newAttrs = newElement.attributes;
    oldAttributes = oldElement.attributes;
    Array.prototype.slice.call(oldAttributes).forEach(function (attr) {
      attr !== null && typeof attr === "object" && attr.__kw === _MoveKWArgsT && (arguments.keywords = attr, attr = attr.attr);
      oldAttributes.removeNamedItem(attr.name);
      return newAttrs.setNamedItem(attr);
    });
    if (deep) {
      Array.prototype.forEach.call(oldElement.childNodes, function (childNode) {
        childNode !== null && typeof childNode === "object" && childNode.__kw === _MoveKWArgsT && (arguments.keywords = childNode, childNode = childNode.childNode);
        return newElement.appendChild(childNode);
      });
    }
    if (parentNode) {
      parentNode.replaceChild(newElement, oldElement);
    }
    otherUILayer = newElement.UILayer;
    newElement.UILayer = oldElement.UILayer;
    oldElement.UILayer = otherUILayer;
    return newElement;
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
  prefixed = require("prefixed");
  [ "backface-visibility", "border-radius", "border-top-left-radius", "box-sizing", "perspective", "perspective-origin", "perspective-origin-x", "perspective-origin-y", "perspective-origin-z", "transform", "transform-origin", "transform-origin-x", "transform-origin-y", "transform-origin-z", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "user-select", "text-size-adjust" ].forEach(prefixed.addProperty);
  lookupCSS = function lookupCSS(dashed) {
    dashed !== null && typeof dashed === "object" && dashed.__kw === _MoveKWArgsT && (arguments.keywords = dashed, dashed = dashed.dashed);
    return prefixed.lookup.css[dashed];
  };
  lookupJS = function lookupJS(camelCase) {
    camelCase !== null && typeof camelCase === "object" && camelCase.__kw === _MoveKWArgsT && (arguments.keywords = camelCase, camelCase = camelCase.camelCase);
    return prefixed.lookup.js[camelCase];
  };
  module.exports = UILayer = __class(UILayer = function UILayer() {
    return __class.create(UILayer, arguments);
  }, {
    constructor: function () {
      var kwargs, element;
      kwargs = typeof arguments[0] === "object" ? arguments[0] : arguments.keywords || {};
      element = kwargs.element;
      if (!element || typeof element !== "object" || !(element instanceof HTMLElement)) {
        element = (kwargs.ownerDocument || document).createElement(kwargs.drawContent ? "canvas" : "div");
      }
      element.UILayer = this;
      kwargs.element = undefined;
      addClassName(element, "uilayer");
      if (this.className) addClassName(element, this.className);
      if (kwargs.className) addClassName(element, kwargs.className);
      this.element_ = element;
      Object.defineProperties(this, {
        element: {
          enumerable: true,
          get: function () {
            return this.element_;
          }
        }
      });
      addClassName(this.element_, "textureBacked");
      this._is3DBacked = true;
      if (kwargs.x !== undefined) this.frame.x = kwargs.x;
      if (kwargs.y !== undefined) this.frame.y = kwargs.y;
      if (kwargs.width !== undefined) this.frame.width = kwargs.width;
      if (kwargs.height !== undefined) this.frame.height = kwargs.height;
      if (kwargs.debug || kwargs.debug === undefined && UILayer.debug) element.style.backgroundColor = "hsla(" + Math.random() * 359 + ", 90%, 90%, 0.5)";
      if (!kwargs.anchor) {
        element.style.left = "0";
        element.style.top = "0";
      }
      return Object.prototype.forEach.call(kwargs, function (key, value) {
        key !== null && typeof key === "object" && key.__kw === _MoveKWArgsT && (arguments.keywords = key, value = key.value, key = key.key);
        if (value !== undefined && value !== _MoveKWArgsT && !(key in kSpecialProperties)) return this[key] = value;
      }, this);
    },
    drawContentAfterFrameSizeChange: function (ev) {
      ev !== null && typeof ev === "object" && ev.__kw === _MoveKWArgsT && (arguments.keywords = ev, ev = ev.ev);
      var oldValues;
      if (!ev || !(oldValues = ev.oldValues) || "width" in oldValues || "height" in oldValues) {
        this.element_.width = this.frame.width;
        this.element_.height = this.frame.height;
        return this.drawContent_();
      }
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
        return this.drawContent_ ? [] : UILayer.layersInElement(this.element_);
      },
      set: function (sublayers) {
        sublayers !== null && typeof sublayers === "object" && sublayers.__kw === _MoveKWArgsT && (arguments.keywords = sublayers, sublayers = sublayers.sublayers);
        if (!Array.isArray(sublayers)) throw TypeError("sublayers argument must be an array of UILayers");
        this.sublayers.forEach(function (sublayer) {
          sublayer !== null && typeof sublayer === "object" && sublayer.__kw === _MoveKWArgsT && (arguments.keywords = sublayer, sublayer = sublayer.sublayer);
          return this.element_.removeChild(sublayer);
        });
        return sublayers.forEach(function (sublayer) {
          sublayer !== null && typeof sublayer === "object" && sublayer.__kw === _MoveKWArgsT && (arguments.keywords = sublayer, sublayer = sublayer.sublayer);
          return this.addSublayer(sublayer);
        }, this);
      }
    },
    firstSublayer: {
      get: function () {
        return this.drawContent_ ? undefined : UILayer.firstLayerInElement(this.element_);
      }
    },
    superlayer: {
      get: function () {
        var pel;
        return (pel = this.element_.parentNode) && pel.UILayer && UILayer.prototype.isPrototypeOf(pel.UILayer) && pel.UILayer;
      }
    },
    perspective: {
      get: function () {
        var v;
        return (v = this.style.getPropertyCSSValue(lookupCSS("perspective"))) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER) || 0;
      },
      set: function (distance) {
        distance !== null && typeof distance === "object" && distance.__kw === _MoveKWArgsT && (arguments.keywords = distance, distance = distance.distance);
        return this.element_.style[lookupJS("perspective")] = distance || "none";
      }
    },
    perspectiveOrigin: {
      get: function () {
        var style, v;
        style = this.element_.style;
        return [ (v = style.getPropertyCSSValue(lookupCSS("perspective-origin-x"))) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || .5) / 100, (v = style.getPropertyCSSValue(lookupCSS("perspective-origin-y"))) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || .5) / 100, (v = style.getPropertyCSSValue(lookupCSS("perspective-origin-z"))) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || 0) / 100 ];
      },
      set: function (distance) {
        distance !== null && typeof distance === "object" && distance.__kw === _MoveKWArgsT && (arguments.keywords = distance, distance = distance.distance);
        if (Array.isArray(distance)) distance = distance[0] * 100 + "% " + (distance[1] || .5) * 100 + "% " + (distance[2] || 0) * 100 + "%";
        return this.element_.style[lookupJS("perspectiveOrigin")] = distance;
      }
    },
    preserve3d: {
      get: function () {
        return this.element_.style[lookupJS("transformStyle")] === "preserve-3d";
      },
      set: function (preserve3d) {
        preserve3d !== null && typeof preserve3d === "object" && preserve3d.__kw === _MoveKWArgsT && (arguments.keywords = preserve3d, preserve3d = preserve3d.preserve3d);
        var property;
        property = lookupCSS("transform-style");
        if (preserve3d) {
          return this.element_.style.setProperty(property, "preserve-3d", null);
        } else {
          return this.element_.style.removeProperty(property);
        }
      }
    },
    anchor: {
      get: function () {
        var anchor, style, readValue;
        anchor = {};
        style = this.style;
        readValue = function readValue(name) {
          name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, name = name.name);
          var v;
          if ((v = style.getPropertyCSSValue(name)) && v.primitiveType !== CSSPrimitiveValue.CSS_IDENT) {
            return anchor[name] = v.primitiveType === CSSPrimitiveValue.CSS_PX ? v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER) : v.cssText;
          }
        };
        readValue("left");
        readValue("top");
        readValue("right");
        readValue("bottom");
        return anchor;
      },
      set: function (anchor) {
        anchor !== null && typeof anchor === "object" && anchor.__kw === _MoveKWArgsT && (arguments.keywords = anchor, anchor = anchor.anchor);
        var t, r, b, l, style;
        t = r = b = l = undefined;
        if (typeof anchor === "string") {
          anchor.split(/\s+/).forEach(function (word) {
            word !== null && typeof word === "object" && word.__kw === _MoveKWArgsT && (arguments.keywords = word, word = word.word);
            switch (word[0].toLowerCase()) {
             case "b":
              b = "0";
              break;
             case "l":
              l = "0";
              break;
             case "r":
              r = "0";
              break;
             case "t":
              t = "0";
              break;
            }
          });
        } else if (typeof anchor === "object") {
          if ((t = anchor.top) && typeof t === "number") t += "px";
          if ((r = anchor.right) && typeof r === "number") r += "px";
          if ((b = anchor.bottom) && typeof b === "number") b += "px";
          if ((l = anchor.left) && typeof l === "number") l += "px";
        } else if (!anchor) {
          throw TypeError("Value of anchor must be a string or object");
        }
        style = this.style;
        t === undefined ? style.removeProperty("top") : style.top = t;
        r === undefined ? style.removeProperty("right") : style.right = r;
        b === undefined ? style.removeProperty("bottom") : style.bottom = b;
        return l === undefined ? style.removeProperty("left") : style.left = l;
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
        var frame_, eventsMuted, oldValues;
        if (typeof frame !== "object") throw TypeError("not an object");
        frame_ = this.frame;
        eventsMuted = this.eventsMuted;
        this.eventsMuted = true;
        oldValues = {};
        frame.forEach(function (name, value) {
          name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, value = name.value, name = name.name);
          oldValues[name] = frame_[name];
          return frame_[name] = value;
        });
        if (!(this.eventsMuted = eventsMuted)) {
          return this.emit("change:frame", {
            oldValues: oldValues
          });
        }
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
    rotation: {
      get: function () {
        var rotation_;
        if (!(rotation_ = this.rotation_)) {
          rotation_ = RotationProxy(this);
          Object.defineProperty(this, "rotation_", {
            value: rotation_
          });
        }
        return rotation_;
      },
      set: function (values) {
        values !== null && typeof values === "object" && values.__kw === _MoveKWArgsT && (arguments.keywords = values, values = values.values);
        var oldValues, x, y, z;
        if (typeof values !== "object") throw TypeError("not an object");
        oldValues = {};
        if ((x = values.x) !== this.rotateX_) {
          oldValues.x = this.rotateX_;
          this.rotateX_ = x;
        }
        if ((y = values.y) !== this.rotateY_) {
          oldValues.y = this.rotateY_;
          this.rotateY_ = y;
        }
        if ((z = values.z) !== this.rotateZ_) {
          oldValues.z = this.rotateZ_;
          this.rotateZ_ = z;
        }
        this.matrix = this.matrix;
        return this.emit("change:rotation", {
          oldValues: oldValues
        });
      }
    },
    computedStyle: {
      get: function () {
        return window.getComputedStyle(this.element_);
      }
    },
    style: {
      get: function () {
        return this.element_.style;
      },
      set: function (style) {
        style !== null && typeof style === "object" && style.__kw === _MoveKWArgsT && (arguments.keywords = style, style = style.style);
        var style_;
        style_ = this.element_.style;
        return style.forEach(function (k, v) {
          k !== null && typeof k === "object" && k.__kw === _MoveKWArgsT && (arguments.keywords = k, v = k.v, k = k.k);
          return style_[k] = v;
        });
      }
    },
    classNames: {
      get: function () {
        return classNames(this.element_);
      },
      set: function (cssClassNames) {
        cssClassNames !== null && typeof cssClassNames === "object" && cssClassNames.__kw === _MoveKWArgsT && (arguments.keywords = cssClassNames, cssClassNames = cssClassNames.cssClassNames);
        if (Array.isArray(cssClassNames)) cssClassNames = cssClassNames.join(" ");
        return this.element_.className = cssClassNames;
      }
    },
    doubleSided: {
      get: function () {
        return this.element_.style[lookupJS("backfaceVisibility")] === "visible";
      },
      set: function (doubleSided) {
        doubleSided !== null && typeof doubleSided === "object" && doubleSided.__kw === _MoveKWArgsT && (arguments.keywords = doubleSided, doubleSided = doubleSided.doubleSided);
        var property;
        property = lookupCSS("backface-visibility");
        if (doubleSided) {
          return this.element_.style.setProperty(property, "visible", null);
        } else {
          return this.element_.style.removeProperty(property);
        }
      }
    },
    cornerRadius: {
      get: function () {
        var v;
        return (v = this.computedStyle.getPropertyCSSValue(lookupCSS("border-top-left-radius"))) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER) || 0;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        var property;
        property = lookupJS("borderRadius");
        if (value && (value = Number(value))) {
          return this.element_.style[property] = value.toFixed(0) + "px";
        } else {
          return this.element_.style[property] = null;
        }
      }
    },
    backgroundColor: {
      get: function () {
        var color;
        return (color = this.computedStyle.backgroundColor) === "transparent" ? null : color;
      },
      set: function (color) {
        color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
        return this.element_.style.backgroundColor = _canonicalColor(color);
      }
    },
    color: {
      get: function () {
        var color;
        return (color = this.computedStyle.color) === "transparent" ? null : color;
      },
      set: function (color) {
        color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
        return this.element_.style.color = _canonicalColor(color);
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
        return this.element_.style.opacity = Number(opacity);
      }
    },
    zPosition: {
      get: function () {
        var v;
        return (v = this.computedStyle.getPropertyCSSValue("z-index")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER);
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        return this.element_.style.zIndex = Number(value).toFixed(0);
      }
    },
    drawContent: {
      get: function () {
        return this.drawContent_;
      },
      set: function (drawContentFunction) {
        drawContentFunction !== null && typeof drawContentFunction === "object" && drawContentFunction.__kw === _MoveKWArgsT && (arguments.keywords = drawContentFunction, drawContentFunction = drawContentFunction.drawContentFunction);
        var newElement, initialDrawContent;
        if (typeof drawContentFunction !== "function") {
          if (this.drawContent_) {
            if (!this._originalElement || typeof this._originalElement === "string") {
              newElement = this.ownerDocument.createElement(this._originalElement || "div");
            } else {
              newElement = this._originalElement;
            }
            this.element_ = _swapElement(this.element_.parentNode, this.element_, newElement);
            this._originalElement = undefined;
            this.removeEventListener("change:frame", this.drawContentAfterFrameSizeChange);
          }
          return this.drawContent_ = undefined;
        } else if (!this.drawContent_) {
          this.drawContent_ = drawContentFunction;
          if (this.element_.nodeName !== "CANVAS") {
            this._originalElement = this.element_.hasChildNodes() ? this.element_ : this.element_.nodeName;
            newElement = this.ownerDocument.createElement("canvas");
            this.element_ = _swapElement(this.element_.parentNode, this.element_, newElement);
          }
          this.on("change:frame", this.drawContentAfterFrameSizeChange);
          if (this.document) {
            return this.drawContentAfterFrameSizeChange();
          } else {
            return this.on("DOMNodeInsertedIntoDocument", initialDrawContent = function initialDrawContent() {
              this.drawContentAfterFrameSizeChange();
              return this.removeEventListener("DOMNodeInsertedIntoDocument", initialDrawContent);
            });
          }
        } else if (this.drawContent_ !== drawContentFunction) {
          this.drawContent_ = drawContentFunction;
          return this.drawContentAfterFrameSizeChange();
        }
      }
    },
    graphicsContext2D: {
      get: function () {
        return this.element_.getContext && this.element_.getContext("2d");
      }
    },
    graphicsContext3D: {
      get: function () {
        return this.element_.getContext && this.element_.getContext("webgl");
      }
    },
    animated: {
      get: function () {
        if (!hasClassName(this.element_, "animated")) return false;
        return this.computedStyle[lookupJS("transitionProperty")];
      },
      set: function (animated) {
        animated !== null && typeof animated === "object" && animated.__kw === _MoveKWArgsT && (arguments.keywords = animated, animated = animated.animated);
        var transform;
        if (animated && animated !== "none") {
          addClassName(this.element_, "animated");
          transform = lookupCSS("transform");
          if (animated === "geometry") {
            animated = transform + ",width,height";
          } else if (animated === "transform") {
            animated = transform;
          } else if (Array.isArray(animated)) {
            animated = animated.join(",");
          } else if (typeof animated !== "string") {
            animated = "all";
          }
          return this.element_.style.setProperty(lookupCSS("transition-property"), animated, null);
        } else if (hasClassName(this.element_, "animated")) {
          removeClassName(this.element_, "animated");
          return this.element_.style.removeProperty(lookupCSS("transition"));
        }
      }
    },
    animationDuration: {
      get: function () {
        var v;
        if (v = this.style.getPropertyCSSValue(lookupCSS("transition-duration"))) {
          return v.getFloatValue(CSSPrimitiveValue.CSS_MS);
        } else if (v = this.computedStyle.getPropertyCSSValue(lookupCSS("transition-duration"))) {
          return v[0].getFloatValue(CSSPrimitiveValue.CSS_MS);
        }
        return 0;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        if (typeof value !== "number") throw TypeError("animationDuration must be a number"); else if (value < 0) throw TypeError("animationDuration must be a positive number");
        return this.element_.style.setProperty(lookupCSS("transition-duration"), value.toFixed(0) + "ms", null);
      }
    },
    animationTimingFunction: {
      get: function () {
        var v;
        if (v = this.computedStyle.getPropertyCSSValue(lookupCSS("transition-timing-function"))) return v.cssText;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        return this.element_.style.setProperty(lookupCSS("transition-timing-function"), value, null);
      }
    },
    ownerDocument: {
      get: function () {
        return this.element_.ownerDocument;
      }
    },
    document: {
      get: function () {
        var ownerDocument;
        ownerDocument = this.ownerDocument;
        return ownerDocument.documentElement.contains(this.element_) && ownerDocument;
      }
    },
    tag: {
      get: function () {
        return this.element_.id;
      },
      set: function (tag) {
        tag !== null && typeof tag === "object" && tag.__kw === _MoveKWArgsT && (arguments.keywords = tag, tag = tag.tag);
        return this.element_.id = Text(tag);
      }
    },
    excludedFromHitTesting: {
      get: function () {
        return this.element_.style.getPropertyValue("pointer-events") === "none";
      },
      set: function (isExcluded) {
        isExcluded !== null && typeof isExcluded === "object" && isExcluded.__kw === _MoveKWArgsT && (arguments.keywords = isExcluded, isExcluded = isExcluded.isExcluded);
        if (isExcluded) return this.element_.style.setProperty("pointer-events", "none", null); else return this.element_.style.removeProperty("pointer-events");
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
  if (window.WebKitCSSMatrix) {
    CSSMatrix = WebKitCSSMatrix;
  } else {
    XCSSMatrix = require("XCSSMatrix/XCSSMatrix");
    CSSMatrix = XCSSMatrix;
  }
  UILayer.textureBackedProperties = {
    matrix: {
      get: function () {
        return this._matrix || (this._matrix = new CSSMatrix(this.element_.style[lookupJS("transform")]));
      },
      set: function () {
        var property, values;
        M = this._matrix = arguments[0];
        property = lookupJS("transform");
        if (!M || !(M instanceof CSSMatrix)) {
          this._matrix = null;
          return this.element_.style[property] = null;
        } else {
          values = "matrix3d(" + M.m11 + "," + M.m12 + "," + M.m13 + "," + M.m14 + "," + M.m21 + "," + M.m22 + "," + M.m23 + "," + M.m24 + "," + M.m31 + "," + M.m32 + "," + M.m33 + "," + M.m34 + "," + M.m41 + "," + M.m42 + "," + M.m43 + "," + M.m44 + ")";
          if (this.rotateX_) values += " rotateX(" + (typeof this.rotateX_ === "number" ? this.rotateX_ + "deg" : this.rotateX_) + ")";
          if (this.rotateY_) values += " rotateY(" + (typeof this.rotateY_ === "number" ? this.rotateY_ + "deg" : this.rotateY_) + ")";
          if (this.rotateZ_) values += " rotateZ(" + (typeof this.rotateZ_ === "number" ? this.rotateZ_ + "deg" : this.rotateZ_) + ")";
          return this.element_.style[property] = values;
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
        DEPRECATED_WARN("rotateBy", "rotation");
        matrix = this.matrix;
        return this.matrix = matrix.rotate.apply(matrix, arguments);
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
        var matrix, oldValues, newMatrix;
        matrix = this.matrix;
        oldValues = {
          x: matrix.m41,
          y: matrix.m42,
          z: matrix.m43
        };
        this.matrix = matrix.translate.apply(matrix, arguments);
        if (!this.eventsMuted) {
          newMatrix = this.matrix;
          if (!(oldValues.x === newMatrix.m41 && (oldValues.x = undefined) || oldValues.y === newMatrix.m42 && (oldValues.y = undefined) || oldValues.z === newMatrix.m43 && (oldValues.z = undefined))) {
            return this.emit("change:frame", {
              oldValues: oldValues
            });
          }
        }
      }
    },
    transformOrigin: {
      get: function () {
        var point, v;
        point = [ .5, .5, 0 ];
        if (v = this.element_.style.getPropertyCSSValue(lookupCSS("transform-origin-x"))) point[0] = v.getFloatValue(v.primitiveType) / 100;
        if (v = this.element_.style.getPropertyCSSValue(lookupCSS("transform-origin-y"))) point[1] = v.getFloatValue(v.primitiveType) / 100;
        if (v = this.element_.style.getPropertyCSSValue(lookupCSS("transform-origin-z"))) point[2] = v.getFloatValue(v.primitiveType) / 100;
        return point;
      },
      set: function (origin) {
        origin !== null && typeof origin === "object" && origin.__kw === _MoveKWArgsT && (arguments.keywords = origin, origin = origin.origin);
        var style, xProperty, yProperty, zProperty;
        style = this.element_.style;
        xProperty = lookupCSS("transform-origin-x");
        if (origin[0] === .5 || origin[0] === undefined) {
          style.removeProperty(xProperty);
        } else {
          style.setProperty(xProperty, (100 * origin[0]).toFixed(0) + "%", null);
        }
        yProperty = lookupCSS("transform-origin-y");
        if (origin[1] === .5 || origin[1] === undefined) {
          style.removeProperty(yProperty);
        } else {
          style.setProperty(yProperty, (100 * origin[1]).toFixed(0) + "%", null);
        }
        zProperty = lookupCSS("transform-origin-z");
        if (origin[2] === 0 || origin[2] === undefined) {
          return style.removeProperty(zProperty);
        } else {
          return style.setProperty(zProperty, (100 * origin[2]).toFixed(0) + "%", null);
        }
      }
    },
    anchorPoint: DEPRECATED_PROPERTY("anchorPoint", "transformOrigin")
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
    if (this.drawContent_) {
      console.warn("adding sublayers to a layer with custom drawing has no effect");
      return;
    }
    this._setupSublayer(layer);
    this.element_.appendChild(layer.element);
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
    cn = this.element_.childNodes;
    if (layer && UILayer.prototype.isPrototypeOf(layer)) {
      el = layer.element;
    } else if (index && (index = Number(index)) >= 0 && !isNaN(index)) {
      el = cn.item(index);
    }
    if (el && el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
      try {
        this.element_.removeChild(el);
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
    superlayer.element.removeChild(this.element_);
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
    cn = this.element_.childNodes;
    for (i = 0; i < cn.length; ++i) {
      el = cn[i];
      if (el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
        removedSublayers.push(el.UILayer);
        this.element_.removeChild(el);
      }
    }
    return removedSublayers;
  };
  UILayer.prototype.setSublayerAtIndex = function setSublayerAtIndex(index, layer) {
    index !== null && typeof index === "object" && index.__kw === _MoveKWArgsT && (arguments.keywords = index, layer = index.layer, index = index.index);
    var el;
    if (!layer || !UILayer.prototype.isPrototypeOf(layer)) layer = null; else this._setupSublayer(layer);
    if (index && (index = Number(index)) >= 0 && !isNaN(index)) {
      el = this.element_.childNodes.item(index);
      if (el && el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
        if (layer) {
          this.element_.replaceChild(layer.element, el);
          layer.emit("uilayer:added-to-superlayer", {
            superlayer: this
          });
          this.emit("uilayer:added-sublayer", {
            sublayer: layer
          });
        } else {
          this.element_.removeChild(el);
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
    this.element_.appendChild(layer.element);
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
    return superlayer && UILayer.prototype.isPrototypeOf(superlayer) && this.element_.parentNode === superlayer.element;
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
      this.element_.addEventListener(type, eventHandler, false);
      return eventHandler;
    };
    UILayer.prototype.removeEventListener = function removeEventListener(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      this.element_.removeEventListener(touchEventsToMouseEvents[type] || type, handler, false);
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
      this.element_.addEventListener(type, eventHandler, false);
      return eventHandler;
    };
    UILayer.prototype.removeEventListener = function removeEventListener(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      this.element_.removeEventListener(type, handler, false);
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
    if (this.eventsMuted) return;
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
    return this.element_.dispatchEvent(ev);
  };
  Object.defineProperties(UILayer.prototype, UILayer.properties);
  Object.defineProperties(UILayer.prototype, UILayer.textureBackedProperties);
  RotationProxy = __class(RotationProxy = function RotationProxy() {
    return __class.create(RotationProxy, arguments);
  }, {
    constructor: function (layer) {
      layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, layer = layer.layer);
      return Object.defineProperty(this, "layer", {
        value: layer
      });
    },
    toString: function () {
      return "{x:" + this.x + ", y:" + this.y + ", z:" + this.z + "}";
    },
    toJSON: function () {
      return {
        x: this.x,
        y: this.y,
        z: this.z
      };
    }
  });
  Object.defineProperties(RotationProxy.prototype, {
    x: {
      enumerable: true,
      get: function () {
        return this.layer.rotateX_ || 0;
      },
      set: function (angle) {
        angle !== null && typeof angle === "object" && angle.__kw === _MoveKWArgsT && (arguments.keywords = angle, angle = angle.angle);
        var oldValue;
        if ((oldValue = this.layer.rotateX_) === angle) return;
        this.layer.rotateX_ = angle;
        this.layer.matrix = this.layer.matrix;
        return this.layer.emit("change:rotation", {
          oldValues: {
            x: oldValue
          }
        });
      }
    },
    y: {
      enumerable: true,
      get: function () {
        return this.layer.rotateY_ || 0;
      },
      set: function (angle) {
        angle !== null && typeof angle === "object" && angle.__kw === _MoveKWArgsT && (arguments.keywords = angle, angle = angle.angle);
        var oldValue;
        if ((oldValue = this.layer.rotateY_) === angle) return;
        this.layer.rotateY_ = angle;
        this.layer.matrix = this.layer.matrix;
        return this.layer.emit("change:rotation", {
          oldValues: {
            y: oldValue
          }
        });
      }
    },
    z: {
      enumerable: true,
      get: function () {
        return this.layer.rotateZ_ || 0;
      },
      set: function (angle) {
        angle !== null && typeof angle === "object" && angle.__kw === _MoveKWArgsT && (arguments.keywords = angle, angle = angle.angle);
        var oldValue;
        if ((oldValue = this.layer.rotateZ_) === angle) return;
        this.layer.rotateZ_ = angle;
        this.layer.matrix = this.layer.matrix;
        return this.layer.emit("change:rotation", {
          oldValues: {
            z: oldValue
          }
        });
      }
    }
  });
  if ((head = document.getElementsByTagName("head")).length) head = head[0]; else head = document.body || document.documentElement;
  baseStyle = document.createElement("style");
  baseStyle.id = "UILayer-base-style";
  baseStyle.appendChild(document.createTextNode(".uilayer {" + "  display: block;" + "  visibility: visible;" + "  position: absolute;" + "  top:auto; right:auto; bottom:auto; left:auto;" + "  width:auto; height:auto;" + "  overflow: visible;" + "  z-index:0;" + "  opacity:1;" + "  " + lookupCSS("box-sizing") + ": border-box;" + "}\n" + ".uilayer.textureBacked {" + "  " + lookupCSS("transform") + ": matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);" + "  " + lookupCSS("transform-origin") + ": 50% 50% 0%;" + "  " + lookupCSS("backface-visibility") + ": hidden;" + "  " + lookupCSS("transform-style") + ": flat;" + "}\n" + ".uilayer.animated {" + "  " + lookupCSS("transition-duration") + ": 500ms;" + "  " + lookupCSS("transition-timing-function") + ": ease;" + "  " + lookupCSS("transition-delay") + ": 0s;" + "  " + lookupCSS("transition-property") + ": none;" + "}"));
  return head.appendChild(baseStyle);
});
Move.require.define("UILayer/UIFrame","UILayer/UIFrame.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, mkCSSPixelValueProperty, UIFrame;
  M = Move.runtime, _MoveKWArgsT = M._MoveKWArgsT, Text = M.Text, extend = M.extend, create = M.create, print = M.print, dprint = M.dprinter(module), repeat = M.repeat, after = M.after, JSON = M.JSON, __class = M.__class, EventEmitter = M.EventEmitter;
  EHTML = Move.EHTML;
  mkCSSPixelValueProperty = function mkCSSPixelValueProperty(name, defaultValue) {
    name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, defaultValue = name.defaultValue, name = name.name);
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
        var oldValues;
        oldValues = {};
        oldValues[name] = this[name];
        if (value === undefined || value === null) {
          this.layer.element.style.removeProperty(name);
        } else if (typeof value === "number") {
          this.layer.element.style.setProperty(name, value + "px", null);
        } else {
          this.layer.element.style.setProperty(name, Text(value), null);
        }
        if (!this.layer.eventsMuted) return this.layer.emit("change:frame", {
          oldValues: oldValues
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
      return "{x:" + this.x + ", y:" + this.y + ", z:" + this.z + ", width:" + this.width + ", height:" + this.height + "}";
    }
  });
  return Object.defineProperties(UIFrame.prototype, {
    width: mkCSSPixelValueProperty("width", -1),
    height: mkCSSPixelValueProperty("height", -1),
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
Move.require.define("UILayer","UILayer/index.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, version;
  M = Move.runtime, _MoveKWArgsT = M._MoveKWArgsT, Text = M.Text, extend = M.extend, create = M.create, print = M.print, dprint = M.dprinter(module), repeat = M.repeat, after = M.after, JSON = M.JSON, __class = M.__class, EventEmitter = M.EventEmitter;
  EHTML = Move.EHTML;
  module.exports = exports = require("./UILayer");
  exports.version = version = "0.0.6";
});
Move.require.define("XCSSMatrix/XCSSMatrix","XCSSMatrix/XCSSMatrix.js",function(require,module,exports){var utils = {
  angles: require("./angleUtils"),
  matrix: require("./matrixUtils"),
  transp: require("./cssTransformStringUtils"),
  funcs: {
    onlyFirstArg: function(fn, context) {
      context = context || this;
      return function(first) {
        return fn.call(context, first);
      };
    }
  }
};

function XCSSMatrix(domstr) {
  this.m11 = this.m22 = this.m33 = this.m44 = 1;
  this.m12 = this.m13 = this.m14 = this.m21 = this.m23 = this.m24 = this.m31 = this.m32 = this.m34 = this.m41 = this.m42 = this.m43 = 0;
  if (typeof domstr === "string") {
    this.setMatrixValue(domstr);
  }
}

XCSSMatrix.displayName = "XCSSMatrix";

var points2d = [ "a", "b", "c", "d", "e", "f" ];

var points3d = [ "m11", "m12", "m13", "m14", "m21", "m22", "m23", "m24", "m31", "m32", "m33", "m34", "m41", "m42", "m43", "m44" ];

[ [ "m11", "a" ], [ "m12", "b" ], [ "m21", "c" ], [ "m22", "d" ], [ "m41", "e" ], [ "m42", "f" ] ].forEach(function(pair) {
  var key3d = pair[0], key2d = pair[1];
  Object.defineProperty(XCSSMatrix.prototype, key2d, {
    set: function(val) {
      this[key3d] = val;
    },
    get: function() {
      return this[key3d];
    },
    enumerable: true,
    configurable: true
  });
});

XCSSMatrix.prototype.multiply = function(otherMatrix) {
  if (!otherMatrix) return null;
  var a = otherMatrix, b = this, c = new XCSSMatrix;
  c.m11 = a.m11 * b.m11 + a.m12 * b.m21 + a.m13 * b.m31 + a.m14 * b.m41;
  c.m12 = a.m11 * b.m12 + a.m12 * b.m22 + a.m13 * b.m32 + a.m14 * b.m42;
  c.m13 = a.m11 * b.m13 + a.m12 * b.m23 + a.m13 * b.m33 + a.m14 * b.m43;
  c.m14 = a.m11 * b.m14 + a.m12 * b.m24 + a.m13 * b.m34 + a.m14 * b.m44;
  c.m21 = a.m21 * b.m11 + a.m22 * b.m21 + a.m23 * b.m31 + a.m24 * b.m41;
  c.m22 = a.m21 * b.m12 + a.m22 * b.m22 + a.m23 * b.m32 + a.m24 * b.m42;
  c.m23 = a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33 + a.m24 * b.m43;
  c.m24 = a.m21 * b.m14 + a.m22 * b.m24 + a.m23 * b.m34 + a.m24 * b.m44;
  c.m31 = a.m31 * b.m11 + a.m32 * b.m21 + a.m33 * b.m31 + a.m34 * b.m41;
  c.m32 = a.m31 * b.m12 + a.m32 * b.m22 + a.m33 * b.m32 + a.m34 * b.m42;
  c.m33 = a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33 + a.m34 * b.m43;
  c.m34 = a.m31 * b.m14 + a.m32 * b.m24 + a.m33 * b.m34 + a.m34 * b.m44;
  c.m41 = a.m41 * b.m11 + a.m42 * b.m21 + a.m43 * b.m31 + a.m44 * b.m41;
  c.m42 = a.m41 * b.m12 + a.m42 * b.m22 + a.m43 * b.m32 + a.m44 * b.m42;
  c.m43 = a.m41 * b.m13 + a.m42 * b.m23 + a.m43 * b.m33 + a.m44 * b.m43;
  c.m44 = a.m41 * b.m14 + a.m42 * b.m24 + a.m43 * b.m34 + a.m44 * b.m44;
  return c;
};

XCSSMatrix.prototype.inverse = function() {
  var inv;
  if (utils.matrix.isIdentityOrTranslation(this)) {
    inv = new XCSSMatrix;
    if (!(this.m41 === 0 && this.m42 === 0 && this.m43 === 0)) {
      inv.m41 = -this.m41;
      inv.m42 = -this.m42;
      inv.m43 = -this.m43;
    }
    return inv;
  }
  var result = utils.matrix.adjoint(this);
  var det = utils.matrix.determinant4x4(this);
  if (Math.abs(det) < 1e-8) return null;
  for (var i = 1; i < 5; i++) {
    for (var j = 1; j < 5; j++) {
      result["m" + i + j] /= det;
    }
  }
  return result;
};

XCSSMatrix.prototype.rotate = function(rx, ry, rz) {
  if (typeof rx !== "number" || isNaN(rx)) rx = 0;
  if ((typeof ry !== "number" || isNaN(ry)) && (typeof rz !== "number" || isNaN(rz))) {
    rz = rx;
    rx = 0;
    ry = 0;
  }
  if (typeof ry !== "number" || isNaN(ry)) ry = 0;
  if (typeof rz !== "number" || isNaN(rz)) rz = 0;
  rx = utils.angles.deg2rad(rx);
  ry = utils.angles.deg2rad(ry);
  rz = utils.angles.deg2rad(rz);
  var tx = new XCSSMatrix, ty = new XCSSMatrix, tz = new XCSSMatrix, sinA, cosA, sinA2;
  rz /= 2;
  sinA = Math.sin(rz);
  cosA = Math.cos(rz);
  sinA2 = sinA * sinA;
  tz.m11 = tz.m22 = 1 - 2 * sinA2;
  tz.m12 = tz.m21 = 2 * sinA * cosA;
  tz.m21 *= -1;
  ry /= 2;
  sinA = Math.sin(ry);
  cosA = Math.cos(ry);
  sinA2 = sinA * sinA;
  ty.m11 = ty.m33 = 1 - 2 * sinA2;
  ty.m13 = ty.m31 = 2 * sinA * cosA;
  ty.m13 *= -1;
  rx /= 2;
  sinA = Math.sin(rx);
  cosA = Math.cos(rx);
  sinA2 = sinA * sinA;
  tx.m22 = tx.m33 = 1 - 2 * sinA2;
  tx.m23 = tx.m32 = 2 * sinA * cosA;
  tx.m32 *= -1;
  var identityMatrix = new XCSSMatrix;
  var isIdentity = this.toString() === identityMatrix.toString();
  var rotatedMatrix = isIdentity ? tz.multiply(ty).multiply(tx) : this.multiply(tx).multiply(ty).multiply(tz);
  return rotatedMatrix;
};

XCSSMatrix.prototype.rotateAxisAngle = function(x, y, z, a) {
  if (typeof x !== "number" || isNaN(x)) x = 0;
  if (typeof y !== "number" || isNaN(y)) y = 0;
  if (typeof z !== "number" || isNaN(z)) z = 0;
  if (typeof a !== "number" || isNaN(a)) a = 0;
  if (x === 0 && y === 0 && z === 0) z = 1;
  var t = new XCSSMatrix, len = Math.sqrt(x * x + y * y + z * z), cosA, sinA, sinA2, csA, x2, y2, z2;
  a = (utils.angles.deg2rad(a) || 0) / 2;
  cosA = Math.cos(a);
  sinA = Math.sin(a);
  sinA2 = sinA * sinA;
  if (len === 0) {
    x = 0;
    y = 0;
    z = 1;
  } else if (len !== 1) {
    x /= len;
    y /= len;
    z /= len;
  }
  if (x === 1 && y === 0 && z === 0) {
    t.m22 = t.m33 = 1 - 2 * sinA2;
    t.m23 = t.m32 = 2 * cosA * sinA;
    t.m32 *= -1;
  } else if (x === 0 && y === 1 && z === 0) {
    t.m11 = t.m33 = 1 - 2 * sinA2;
    t.m13 = t.m31 = 2 * cosA * sinA;
    t.m13 *= -1;
  } else if (x === 0 && y === 0 && z === 1) {
    t.m11 = t.m22 = 1 - 2 * sinA2;
    t.m12 = t.m21 = 2 * cosA * sinA;
    t.m21 *= -1;
  } else {
    csA = sinA * cosA;
    x2 = x * x;
    y2 = y * y;
    z2 = z * z;
    t.m11 = 1 - 2 * (y2 + z2) * sinA2;
    t.m12 = 2 * (x * y * sinA2 + z * csA);
    t.m13 = 2 * (x * z * sinA2 - y * csA);
    t.m21 = 2 * (y * x * sinA2 - z * csA);
    t.m22 = 1 - 2 * (z2 + x2) * sinA2;
    t.m23 = 2 * (y * z * sinA2 + x * csA);
    t.m31 = 2 * (z * x * sinA2 + y * csA);
    t.m32 = 2 * (z * y * sinA2 - x * csA);
    t.m33 = 1 - 2 * (x2 + y2) * sinA2;
  }
  return this.multiply(t);
};

XCSSMatrix.prototype.scale = function(scaleX, scaleY, scaleZ) {
  var transform = new XCSSMatrix;
  if (typeof scaleX !== "number" || isNaN(scaleX)) scaleX = 1;
  if (typeof scaleY !== "number" || isNaN(scaleY)) scaleY = scaleX;
  if (typeof scaleZ !== "number" || isNaN(scaleZ)) scaleZ = 1;
  transform.m11 = scaleX;
  transform.m22 = scaleY;
  transform.m33 = scaleZ;
  return this.multiply(transform);
};

XCSSMatrix.prototype.skewX = function(degrees) {
  var radians = utils.angles.deg2rad(degrees);
  var transform = new XCSSMatrix;
  transform.c = Math.tan(radians);
  return this.multiply(transform);
};

XCSSMatrix.prototype.skewY = function(degrees) {
  var radians = utils.angles.deg2rad(degrees);
  var transform = new XCSSMatrix;
  transform.b = Math.tan(radians);
  return this.multiply(transform);
};

XCSSMatrix.prototype.translate = function(x, y, z) {
  var t = new XCSSMatrix;
  if (typeof x !== "number" || isNaN(x)) x = 0;
  if (typeof y !== "number" || isNaN(y)) y = 0;
  if (typeof z !== "number" || isNaN(z)) z = 0;
  t.m41 = x;
  t.m42 = y;
  t.m43 = z;
  return this.multiply(t);
};

XCSSMatrix.prototype.setMatrixValue = function(domstr) {
  var matrixString = toMatrixString(domstr.trim());
  var matrixObject = utils.transp.statementToObject(matrixString);
  if (!matrixObject) return;
  var is3d = matrixObject.key === utils.transp.matrixFn3d;
  var keygen = is3d ? indextoKey3d : indextoKey2d;
  var values = matrixObject.value;
  var count = values.length;
  if (is3d && count !== 16 || !(is3d || count === 6)) return;
  values.forEach(function(obj, i) {
    var key = keygen(i);
    this[key] = obj.value;
  }, this);
};

function indextoKey2d(index) {
  return String.fromCharCode(index + 97);
}

function indextoKey3d(index) {
  return "m" + (Math.floor(index / 4) + 1) + (index % 4 + 1);
}

XCSSMatrix.prototype.toString = function() {
  var points, prefix;
  if (utils.matrix.isAffine(this)) {
    prefix = utils.transp.matrixFn2d;
    points = points2d;
  } else {
    prefix = utils.transp.matrixFn3d;
    points = points3d;
  }
  return prefix + "(" + points.map(function(p) {
    return this[p].toFixed(6);
  }, this).join(", ") + ")";
};

var jsFunctions = {
  matrix: function(m, o) {
    var m2 = new XCSSMatrix(o.unparsed);
    return m.multiply(m2);
  },
  matrix3d: function(m, o) {
    var m2 = new XCSSMatrix(o.unparsed);
    return m.multiply(m2);
  },
  perspective: function(m, o) {
    var m2 = new XCSSMatrix;
    m2.m34 -= 1 / o.value[0].value;
    return m.multiply(m2);
  },
  rotate: function(m, o) {
    return m.rotate.apply(m, o.value.map(objectValues));
  },
  rotate3d: function(m, o) {
    return m.rotateAxisAngle.apply(m, o.value.map(objectValues));
  },
  rotateX: function(m, o) {
    return m.rotate.apply(m, [ o.value[0].value, 0, 0 ]);
  },
  rotateY: function(m, o) {
    return m.rotate.apply(m, [ 0, o.value[0].value, 0 ]);
  },
  rotateZ: function(m, o) {
    return m.rotate.apply(m, [ 0, 0, o.value[0].value ]);
  },
  scale: function(m, o) {
    return m.scale.apply(m, o.value.map(objectValues));
  },
  scale3d: function(m, o) {
    return m.scale.apply(m, o.value.map(objectValues));
  },
  scaleX: function(m, o) {
    return m.scale.apply(m, o.value.map(objectValues));
  },
  scaleY: function(m, o) {
    return m.scale.apply(m, [ 0, o.value[0].value, 0 ]);
  },
  scaleZ: function(m, o) {
    return m.scale.apply(m, [ 0, 0, o.value[0].value ]);
  },
  skew: function(m, o) {
    var mX = new XCSSMatrix("skewX(" + o.value[0].unparsed + ")");
    var mY = new XCSSMatrix("skewY(" + (o.value[1] && o.value[1].unparsed || 0) + ")");
    var sM = "matrix(1.00000, " + mY.b + ", " + mX.c + ", 1.000000, 0.000000, 0.000000)";
    var m2 = new XCSSMatrix(sM);
    return m.multiply(m2);
  },
  skewX: function(m, o) {
    return m.skewX.apply(m, [ o.value[0].value ]);
  },
  skewY: function(m, o) {
    return m.skewY.apply(m, [ o.value[0].value ]);
  },
  translate: function(m, o) {
    return m.translate.apply(m, o.value.map(objectValues));
  },
  translate3d: function(m, o) {
    return m.translate.apply(m, o.value.map(objectValues));
  },
  translateX: function(m, o) {
    return m.translate.apply(m, [ o.value[0].value, 0, 0 ]);
  },
  translateY: function(m, o) {
    return m.translate.apply(m, [ 0, o.value[0].value, 0 ]);
  },
  translateZ: function(m, o) {
    return m.translate.apply(m, [ 0, 0, o.value[0].value ]);
  }
};

function objectValues(obj) {
  return obj.value;
}

function cssFunctionToJsFunction(cssFunctionName) {
  return jsFunctions[cssFunctionName];
}

function parsedToDegrees(parsed) {
  if (parsed.units === "rad") {
    parsed.value = utils.angles.rad2deg(parsed.value);
    parsed.units = "deg";
  } else if (parsed.units === "grad") {
    parsed.value = utils.angles.grad2deg(parsed.value);
    parsed.units = "deg";
  }
  return parsed;
}

function transformMatrix(matrix, operation) {
  operation.value = operation.value.map(parsedToDegrees);
  var jsFunction = cssFunctionToJsFunction(operation.key);
  var result = jsFunction(matrix, operation);
  return result || matrix;
}

function toMatrixString(transformString) {
  var statements = utils.transp.stringToStatements(transformString);
  if (statements.length === 1 && /^matrix/.test(transformString)) {
    return transformString;
  }
  var statementToObject = utils.funcs.onlyFirstArg(utils.transp.statementToObject);
  var operations = statements.map(statementToObject);
  var startingMatrix = new XCSSMatrix;
  var transformedMatrix = operations.reduce(transformMatrix, startingMatrix);
  var matrixString = transformedMatrix.toString();
  return matrixString;
}

module.exports = XCSSMatrix;});
Move.require.define("XCSSMatrix/cssTransformStringUtils","XCSSMatrix/cssTransformStringUtils.js",function(require,module,exports){var utils = {
  angles: require("./angleUtils")
};

function valueToObject(value) {
  var units = /([\-\+]?[0-9]+[\.0-9]*)(deg|rad|grad|px|%)*/;
  var parts = value.match(units) || [];
  return {
    value: parseFloat(parts[1]),
    units: parts[2],
    unparsed: value
  };
}

function statementToObject(statement, skipValues) {
  var nameAndArgs = /(\w+)\(([^\)]+)\)/i;
  var statementParts = statement.toString().match(nameAndArgs).slice(1);
  var functionName = statementParts[0];
  var stringValues = statementParts[1].split(/, ?/);
  var parsedValues = !skipValues && stringValues.map(valueToObject);
  return {
    key: functionName,
    value: parsedValues || stringValues,
    unparsed: statement
  };
}

function stringToStatements(transformString) {
  var functionSignature = /(\w+)\([^\)]+\)/ig;
  var transformStatements = transformString.match(functionSignature) || [];
  return transformStatements;
}

module.exports = {
  matrixFn2d: "matrix",
  matrixFn3d: "matrix3d",
  valueToObject: valueToObject,
  statementToObject: statementToObject,
  stringToStatements: stringToStatements
};});
Move.require.define("XCSSMatrix/angleUtils","XCSSMatrix/angleUtils.js",function(require,module,exports){function deg2rad(angle) {
  return angle * Math.PI / 180;
}

function rad2deg(radians) {
  return radians * (180 / Math.PI);
}

function grad2deg(gradians) {
  return gradians / (400 / 360);
}

module.exports = {
  deg2rad: deg2rad,
  rad2deg: rad2deg,
  grad2deg: grad2deg
};});
Move.require.define("XCSSMatrix/matrixUtils","XCSSMatrix/matrixUtils.js",function(require,module,exports){function determinant2x2(a, b, c, d) {
  return a * d - b * c;
}

function determinant3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3) {
  return a1 * determinant2x2(b2, b3, c2, c3) - b1 * determinant2x2(a2, a3, c2, c3) + c1 * determinant2x2(a2, a3, b2, b3);
}

function determinant4x4(matrix) {
  var m = matrix, a1 = m.m11, b1 = m.m21, c1 = m.m31, d1 = m.m41, a2 = m.m12, b2 = m.m22, c2 = m.m32, d2 = m.m42, a3 = m.m13, b3 = m.m23, c3 = m.m33, d3 = m.m43, a4 = m.m14, b4 = m.m24, c4 = m.m34, d4 = m.m44;
  return a1 * determinant3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4) - b1 * determinant3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4) + c1 * determinant3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4) - d1 * determinant3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);
}

function isAffine(matrix) {
  return matrix.m13 === 0 && matrix.m14 === 0 && matrix.m23 === 0 && matrix.m24 === 0 && matrix.m31 === 0 && matrix.m32 === 0 && matrix.m33 === 1 && matrix.m34 === 0 && matrix.m43 === 0 && matrix.m44 === 1;
}

function isIdentityOrTranslation(matrix) {
  var m = matrix;
  return m.m11 === 1 && m.m12 === 0 && m.m13 === 0 && m.m14 === 0 && m.m21 === 0 && m.m22 === 1 && m.m23 === 0 && m.m24 === 0 && m.m31 === 0 && m.m31 === 0 && m.m33 === 1 && m.m34 === 0 && m.m44 === 1;
}

function adjoint(matrix) {
  var m = matrix, result = new matrix.constructor, a1 = m.m11, b1 = m.m12, c1 = m.m13, d1 = m.m14, a2 = m.m21, b2 = m.m22, c2 = m.m23, d2 = m.m24, a3 = m.m31, b3 = m.m32, c3 = m.m33, d3 = m.m34, a4 = m.m41, b4 = m.m42, c4 = m.m43, d4 = m.m44;
  result.m11 = determinant3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4);
  result.m21 = -determinant3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4);
  result.m31 = determinant3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4);
  result.m41 = -determinant3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);
  result.m12 = -determinant3x3(b1, b3, b4, c1, c3, c4, d1, d3, d4);
  result.m22 = determinant3x3(a1, a3, a4, c1, c3, c4, d1, d3, d4);
  result.m32 = -determinant3x3(a1, a3, a4, b1, b3, b4, d1, d3, d4);
  result.m42 = determinant3x3(a1, a3, a4, b1, b3, b4, c1, c3, c4);
  result.m13 = determinant3x3(b1, b2, b4, c1, c2, c4, d1, d2, d4);
  result.m23 = -determinant3x3(a1, a2, a4, c1, c2, c4, d1, d2, d4);
  result.m33 = determinant3x3(a1, a2, a4, b1, b2, b4, d1, d2, d4);
  result.m43 = -determinant3x3(a1, a2, a4, b1, b2, b4, c1, c2, c4);
  result.m14 = -determinant3x3(b1, b2, b3, c1, c2, c3, d1, d2, d3);
  result.m24 = determinant3x3(a1, a2, a3, c1, c2, c3, d1, d2, d3);
  result.m34 = -determinant3x3(a1, a2, a3, b1, b2, b3, d1, d2, d3);
  result.m44 = determinant3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3);
  return result;
}

module.exports = {
  determinant2x2: determinant2x2,
  determinant3x3: determinant3x3,
  determinant4x4: determinant4x4,
  isAffine: isAffine,
  isIdentityOrTranslation: isIdentityOrTranslation,
  adjoint: adjoint
};});
Move.require.define("prefixed/Modernizr","prefixed/Modernizr.js",function(require,module,exports){module.exports = function(window, document, undefined) {
  var Modernizr = {}, docElement = document.documentElement, mod = "modernizr", modElem = document.createElement(mod), mStyle = modElem.style, inputElem, toString = {}.toString, prefixes = " -webkit- -moz- -o- -ms- ".split(" "), omPrefixes = "Webkit Moz O ms", cssomPrefixes = omPrefixes.split(" "), domPrefixes = omPrefixes.toLowerCase().split(" "), tests = {}, inputs = {}, attrs = {}, classes = [], slice = classes.slice, featureName, _hasOwnProperty = {}.hasOwnProperty, hasOwnProp;
  if (!is(_hasOwnProperty, "undefined") && !is(_hasOwnProperty.call, "undefined")) {
    hasOwnProp = function(object, property) {
      return _hasOwnProperty.call(object, property);
    };
  } else {
    hasOwnProp = function(object, property) {
      return property in object && is(object.constructor.prototype[property], "undefined");
    };
  }
  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {
      var target = this;
      if (typeof target != "function") {
        throw new TypeError;
      }
      var args = slice.call(arguments, 1), bound = function() {
        if (this instanceof bound) {
          var F = function() {};
          F.prototype = target.prototype;
          var self = new F;
          var result = target.apply(self, args.concat(slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return self;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };
      return bound;
    };
  }
  setCss("");
  modElem = inputElem = null;
  Modernizr._prefixes = prefixes;
  Modernizr._domPrefixes = domPrefixes;
  Modernizr._cssomPrefixes = cssomPrefixes;
  function setCss(str) {
    mStyle.cssText = str;
  }
  function setCssAll(str1, str2) {
    return setCss(prefixes.join(str1 + ";") + (str2 || ""));
  }
  function is(obj, type) {
    return typeof obj === type;
  }
  function contains(str, substr) {
    return !!~("" + str).indexOf(substr);
  }
  function testProps(props, prefixed) {
    for (var i in props) {
      var prop = props[i];
      if (!contains(prop, "-") && mStyle[prop] !== undefined) {
        return prefixed == "pfx" ? prop : true;
      }
    }
    return false;
  }
  function testDOMProps(props, obj, elem) {
    for (var i in props) {
      var item = obj[props[i]];
      if (item !== undefined) {
        if (elem === false) return props[i];
        if (is(item, "function")) {
          return item.bind(elem || obj);
        }
        return item;
      }
    }
    return false;
  }
  function testPropsAll(prop, prefixed, elem) {
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
    if (is(prefixed, "string") || is(prefixed, "undefined")) {
      return testProps(props, prefixed);
    } else {
      props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" ");
      return testDOMProps(props, prefixed, elem);
    }
  }
  Modernizr.addTest = function(feature, test) {
    if (typeof feature == "object") {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          Modernizr.addTest(key, feature[key]);
        }
      }
    } else {
      feature = feature.toLowerCase();
      if (Modernizr[feature] !== undefined) {
        return Modernizr;
      }
      test = typeof test == "function" ? test() : test;
      if (typeof enableClasses !== "undefined" && enableClasses) {
        docElement.className += " " + (test ? "" : "no-") + feature;
      }
      Modernizr[feature] = test;
    }
    return Modernizr;
  };
  Modernizr.testProp = function(prop) {
    return testProps([ prop ]);
  };
  Modernizr.testAllProps = testPropsAll;
  Modernizr.testStyles = function injectElementWithStyles(rule, callback, nodes, testnames) {
    var style, ret, node, docOverflow;
    var div = document.createElement("div"), body = document.body, fakeBody = body || document.createElement("body");
    if (parseInt(nodes, 10)) {
      while (nodes--) {
        node = document.createElement("div");
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }
    style = [ "&#173;", '<style id="s', mod, '">', rule, "</style>" ].join("");
    div.id = mod;
    (body ? div : fakeBody).innerHTML += style;
    fakeBody.appendChild(div);
    if (!body) {
      fakeBody.style.background = "";
      fakeBody.style.overflow = "hidden";
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = "hidden";
      docElement.appendChild(fakeBody);
    }
    ret = callback(div, rule);
    if (!body) {
      fakeBody.parentNode.removeChild(fakeBody);
      docElement.style.overflow = docOverflow;
    } else {
      div.parentNode.removeChild(div);
    }
    return !!ret;
  };
  Modernizr.prefixed = function(prop, obj, elem) {
    if (!obj) {
      return testPropsAll(prop, "pfx");
    } else {
      return testPropsAll(prop, obj, elem);
    }
  };
  return Modernizr;
}(this, this.document);});
Move.require.define("prefixed","prefixed/index.js",function(require,module,exports){module.exports.features = require("./Modernizr");

module.exports.dashedToCamelCase = function(dashed) {
  return dashed.replace(/(\-[a-z])/g, function(match, p1, offset, string) {
    return (offset === 0 ? p1.toLowerCase() : p1.toUpperCase()).replace("-", "");
  });
};

module.exports.camelCaseToDashed = function(camelCase) {
  return camelCase.replace(/([A-Z])/g, function(str, m1) {
    return "-" + m1.toLowerCase();
  }).replace(/^ms-/, "-ms-");
};

var lookup = module.exports.lookup = {
  css: {},
  js: {}
};

module.exports.addProperty = function(dashedOrCamelCase) {
  var camelCase = module.exports.dashedToCamelCase(dashedOrCamelCase);
  var dashed = module.exports.camelCaseToDashed(camelCase);
  var prefixedCC = module.exports.features.prefixed(camelCase);
  module.exports.lookup.js[camelCase] = prefixedCC;
  if (prefixedCC) {
    module.exports.lookup.css[dashed] = module.exports.camelCaseToDashed(prefixedCC);
  } else {
    module.exports.lookup.css[dashed] = prefixedCC;
    console.log("no support for", dashed, camelCase, prefixedCC);
  }
};});