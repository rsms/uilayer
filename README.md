# UILayer

UILayer provides a JavaScript API on top of WebKit **for working with the concept of layers**. Instead of manipulating DOM elements using a myriad of mixed concepts, you go though a single, well defined API.


## Demo and example

- [Psychotic layers randomly moving around](http://rsms.me/uilayer/examples/animate-combo.html)
- [Flip some pages in the Flip Book](http://rsms.me/uilayer/examples/flip-book.html)
- [Interactive 3D perspective](http://rsms.me/uilayer/examples/perspective.html)
- [More examples...](http://rsms.me/uilayer/examples/)

> Note: UILayer only works in WebKit-based environments, such as web views on Apple iOS, OS X and Android or in web browsers like Google Chrome and Safari.

Here's a simple example: A layer inside another layer which moves 50px to the right when touched, rotating the inner layer like a wheel:

<div>
<pre class="plain-text"><code>layer1 = <a href="#api">UILayer</a>({ x:10, y:10, width:300, height:300, <a href="#animation">animated</a>:true });
layer2 = <a href="#api">UILayer</a>({ x:50, y:50, width:200, height:200, <a href="#animation">animated</a>:true });
layer1.<a href="#layer-hierarchy">addSublayer</a>(layer2);
layer1.<a href="#style-attributes">backgroundColor</a> = 'salmon'
layer1.<a href="#handling-events">on('touchstart'</a>, function () {
  layer1.<a href="#geometry">frame</a>.x += 50
  layer2.<a href="#geometry">rotation.z</a> += 20
});
document.body.appendChild(layer1.<a href="#dom">element</a>)</code></pre>
</div>

[Try it (written in Move) →](http://rsms.me/uilayer/examples/example1.html)<br>
[Try it (written in JavaScript) →](http://rsms.me/uilayer/examples/example1-javascript.html)

## Usage

Either use the precompiled [uilayer.js](https://raw.github.com/rsms/uilayer/master/uilayer.js) JavaScript library together with the [Move runtime](http://movelang.org/move-rt.js) or use the [Move](http://movelang.org/) source files in the "src" directory directly.

You can also build a JavaScript library from the source files (requires [move](http://movelang.org/) >=0.4.4):

    move compile -d src -o uilayer.js


# API

### UILayer(x, y, z, width, height, scale, frame, element, animated, style, sublayers, ..) → layer

Create a new UILayer with optional initial properties.


## Geometry

### layer.frame ⇄ UIFrame {x:number, y:number, z:number, width:number, height:number}

The position and size of the layer in the coordinate space of its parent layer.

The returned `UIFrame` object is a mutable proxy which when modified affects the layer. That is you can do `layer.frame.x = 10` to move the layer to x position 10, rather than `frame = layer.frame; frame.x = 10; layer.frame = frame`.

Providing a width and/or height of 0 (zero) makes the layer span the width and/or height of it's parent.


### layer.anchor ⇄ object | string

Layer anchor defined in superlayer coordinates controls which edges of the superlayer the layer is attached to, or originates from. Defaults to `{top:0, left:0}`.

This property always returns an object (never a string) which might contain any or none of the following values:

    { top:number|string, right::number|string,
      bottom:number|string, left:number|string}

If a value is undefined, that edge is not part of the layers anchor.

Example of having a layer originating from the bottom right corner of its superview:

    layer.anchor = 'bottom right'
    print layer.anchor  # -> { bottom: 0, right: 0 }

Example of having a layer originating from the bottom right corner of its superview with an offset of 20 pixels:

    layer.anchor = {bottom:20, right:20}
    print layer.anchor  # -> { bottom: 20, right: 0 }

Example of making a layer span the entire width of its superlayer, automatically being resized as the superlayer's frame size changes (note that we do not specify a frame size):

    layer = UILayer {anchor:'top right bottom left'}

Example of creating a layer that spans the width of its superlayer, attached to the bottom:

    layer = UILayer {anchor:'left bottom right', height:100}

Example: [examples/anchor.html](http://rsms.me/uilayer/examples/anchor.html)


### layer.moveBy(x, y:0, z:0)

Modify position of the layer.

### layer.rotation ⇄ Rotation {x:number, y:number, z:number}

Rotation of the layer. Defaults to `{x:0, y:0, z:0}`. The returned object is a proxy, meaning it's possible to manipulate the values directly (e.g. `layer.rotation.x = 45`). Angles are expressed in degrees (0-360).

When setting this value (rather than manipulating the returned proxy object), you only need to pass the values which you would like to modify. There's also a single ["change:rotation"](#change-rotation-oldvalues-x-y-z-) event emitted, rather than one even per axis, as implied by manipulating the proxy object.

Example of rotating a layer around its Z-axis (spinning like a wheel):

    layer.rotation.z = 45

Example of setting several axis, causing a single change event to be emitted:

    layer.rotation = {x:20, z:45}

Example: [examples/rotation.html](http://rsms.me/uilayer/examples/rotation.html)


### layer.scale ⇄ number (0-inf]

Scale of the layer. Defaults to 1.0 (100%).


### layer.scaleBy(x, y:0, z:0)

Modify scale of the layer.


### layer.transformOrigin ⇄ [x, y, z]

Defines the transformation origin of the layer's bounds rectangle. Affects how transformations like scale and rotation behaves. Animatable.

Described in the unit coordinate space. Defaults to (0.5, 0.5, 0), the center of the bounds rectangle.

Example: [examples/transformOrigin.html](http://rsms.me/uilayer/examples/transformOrigin.html)


### layer.zPosition ⇄ number

Layers with a larger zPosition will be placed in front of those with a smaller one. Defaults to 0.


## Style attributes

### UILayer.debug ⇄ bool

If set to true, new layers will be assigned a random semi-opaque background color, aiding in development. Defaults to false.

Example: [examples/debug.html](http://rsms.me/uilayer/examples/debug.html)

### layer.doubleSided ⇄ bool

Determines whether the receiver is displayed when facing away from the viewer. Defaults to false.

### layer.cornerRadius ⇄ number

Specifies a radius used to draw the rounded corners of the receiver’s background. Defaults to 0.

Note: cornerRadius does not affect hit testing.

### layer.backgroundColor ⇄ string

The background color of the layer. Defaults to "transparent" (no background color).

Accepts any [CSS 3 color value](http://www.w3.org/TR/css3-color/) as a string, including:

- [`"#000000-#ffffff"` or `"#000-#fff"`](http://www.w3.org/TR/css3-color/#numerical)
- [`"rgb(0-255, 0-255, 0-255)"`](http://www.w3.org/TR/css3-color/#rgb-color)
- [`"rgba(0-255, 0-255, 0-255, 0-1)"`](http://www.w3.org/TR/css3-color/#rgba-color)
- [`"hsl(0-359, 0-100%, 0-100%)"`](http://www.w3.org/TR/css3-color/#hsl-color)
- [`"hsl(0-359, 0-100%, 0-100%, 0-1)"`](http://www.w3.org/TR/css3-color/#hsla-color)
- [`"red"`, `"salmon"`, `"transparent"`, ...](http://www.w3.org/TR/css3-color/#svg-color)

Also accepts (but will canonicalize) arrays of relative RGBA values:

- R, G, B, A -- `[0-1, 0-1, 0-1, 0-1]`
- R, G, B -- `[0-1, 0-1, 0-1]`
- RGB, A -- `[0-1, 0-1]`
- RGB -- `[0-1]`

### layer.color ⇄ string

Foreground (text) color of the layer. Defaults to the inherited value (from the environment, i.e. default browser style or host website style).

Accepts any [CSS 3 color value](http://www.w3.org/TR/css3-color/) as a string. See description of [`layer.backgroundColor`](#layer.backgroundcolor-string) for more information.

### layer.opacity ⇄ number [0-1]

Opacity of the layer. Defaults to 1 (fully opaque).


### layer.hidden ⇄ bool

Hide or show the layer. Defaults to false.

A hidden view disappears from its window and does not receive input events. It remains in its superview’s list of sublayers, however, and participates in autoresizing as usual. Hiding a view with sublayers has the effect of hiding those sublayers and any view descendants they might have. This effect is implicit and does not alter the hidden state of the receiver’s descendants.

If you want to know if a layer is in a DOM tree (no matter if it's visible), see [`layer.document`](http://rsms.me/uilayer/#layer.document-htmldocument).

### layer.computedStyle → Style

Returns a style object defining the layers computed style (equivalent to `window.computedStyle` for an element).

### layer.style ⇄ Style

The explicit (CSS) style of the layer.


### layer.masksToBounds ⇄ bool

Determines whether sublayers are confined to the bounds of the receiver. Defaults to false.

Setting this value to true causes sublayers to be clipped to the bounds of the receiver. If set to false, sublayers whose frames extend beyond the visible bounds of the receiver are not clipped.

Example: [examples/masksToBounds.html](http://rsms.me/uilayer/examples/masksToBounds.html)


### layer.perspective ⇄ number

Used to give an illusion of depth; it determines how layers change size based on their z-offset from the z=0 plane. You can think of it as though you're looking at the page from a distance p away. Layers on the z=0 plane appear in their normal size. Something at a z offset of p/2 (halfway between the viewer and the z=0 plane) will look twice as big, and something at a z offset of -p will look half as big. Thus, large values give a little foreshortening effect, and small values lots of foreshortening. Values between 500 and 1000 give a reasonable-looking result for most content.

Defaults to "none" (i.e. "no perspective" or "orthographic projection").

The default origin for the perspective effect is the center of the layer, but you can control this with [`perspectiveOrigin`](http://rsms.me/uilayer/#layer.hidden-bool).

Example: [examples/perspective.html](http://rsms.me/uilayer/examples/perspective.html)


### layer.perspectiveOrigin ⇄ [x, y, z]

Perspective origin. Defaults to `[0.5, 0.5, 0]`.


### layer.preserve3d ⇄ bool

When set to false (the default value), transformed sublayers are flattened into the plane of their superlayer (think of the 3D transform as simply a painting effect). However, when setting this to true, the layer to which it is assigned does not flatten its sublayers into it; instead, those sublayers live in a shared 3D space with the superlayer.


## Animation

### layer.animated ⇄ bool | string

Animate property changes. Defaults to false.

The value `true` indicates all properties should be animated. A string value signifies only a subset of properties should be animated. For instance:

- "all" -- animate all properties. Equivalent to `true`
- "geometry" -- animate changes to geometry
- "opacity" -- animate changes to opacity

You can define a list of CSS properties to be animated by separating them with a comma. E.g. a value of `"width, height, opacity"` would cause frame size and opacity to be animated, but not scale, position, etc.

Example:

    layer = UILayer {x:0, y:0, width:100, height:100}
    layer.animated = true
    layer.on 'touchstart', ^{ layer.frame.x += 100 }
    # Layer moves 100 px to the right during 500ms when touched


### layer.animationDuration ⇄ number (0-inf]

Duration in milliseconds of animations implied by changing properties. Only effective if `layer.animated` is set to true.

Example:

    layer = UILayer {x:0, y:0, width:100, height:100}
    layer.animated = true
    layer.animationDuration = 200
    layer.on 'touchstart', ^{ layer.frame.x += 100 }
    # Layer moves 100 px to the right during 200ms when touched


### layer.animationTimingFunction ⇄ string

Available timing functions:

- `"linear"` – The linear function just returns as its output the input that it received.
- `"ease"` – The default function, ease, is equivalent to cubic-bezier(0.25, 0.1, 0.25, 1.0).
- `"ease-in"` – The ease-in function is equivalent to cubic-bezier(0.42, 0, 1.0, 1.0).
- `"ease-out"` – The ease-out function is equivalent to cubic-bezier(0, 0, 0.58, 1.0).
- `"ease-in-out"` – The ease-in-out function is equivalent to cubic-bezier(0.42, 0, 0.58, 1.0)
- `"cubic-bezier(x1, y1, x2, y2)"` – Specifies a cubic-bezier curve whose P0 and P3 points are (0,0) and (1,1) respectively. The four values specify points P1 and P2 of the curve as (x1, y1, x2, y2).

Example:

    layer = UILayer {x:0, y:0, width:100, height:100}
    layer.animated = true
    layer.animationTimingFunction = 'ease-out'
    layer.frame.x = 100
    # Layer moves 100 px to the right during 500ms,
    # slowing down in the end




## Custom drawing

### layer.drawContent ⇄ ^{...}

Provide a function to perform custom drawing of the layer's content. This function will be invoked every time the frame size changes or the layer is added to the DOM.

> Note: A layer that implements custom drawing can not have sublayers.

Example of drawing a triangle:

    layer = UILayer {width:300, height:300, drawContent:^{
      g = @graphicsContext2D
      g.strokeStyle = 'red'
      g.moveTo 50,50
      g.lineTo 250,50
      g.lineTo 150,250
      g.lineTo 50,50
      g.stroke()
    }}

Example: [examples/drawContent.html](http://rsms.me/uilayer/examples/drawContent.html)


### layer.graphicsContext2D → CanvasRenderingContext2D

The 2D drawing context for a layer with a `drawContent` implementation.

### layer.graphicsContext3D → CanvasRenderingContext3D

The 3D (WebGL) drawing context for a layer with a `drawContent` implementation.


## Layer hierarchy

### layer.superlayer → layer

Parent layer.


### layer.sublayers → [layer, ..]

A list of all sublayers (other layers that are owned by, or live within, the layer).


### layer.firstSublayer → layer

First sublayer (equivalent to `layer.sublayers[0]` but better performing in cases where a layer have many sublayers).


### layer.addSublayer(layer:sublayer) → sublayer

Add a layer as a sublayer to the receiving layer. Returns the same sublayer that was passed as input.


### layer.removeSublayer(layer:sublayer, index:number) → sublayer

Remove a sublayer by reference or index. Returns the sublayer removed or undefined if no matching sublayer was found.


### layer.removeAllSublayers() → [layer, ..]

Remove all sublayers. Returns the layers that was removed.


### layer.removeFromSuperlayer()

Removes the layer from the superlayer.


### layer.isSublayerOf(layer:superlayer) → bool

Test if a layer is a sublayer of another layer.


## Hit testing

### UILayer.hitTest(x, y) → layer

Returns the farthest descendant of the layer hierarchy that contains a specified point.

Example: [examples/hitTest.html](http://rsms.me/uilayer/examples/hitTest.html)

### layer.excludedFromHitTesting ⇄ bool

Controls whether the layer is included in hit testing. Defaults to true. Setting this to false causes the layer to stop accepting user input -- such as touches and clicks -- and also being ignored by `UILayer.hitTest`.


## DOM

### layer.element → HTMLElement

The DOM node which is used to represent the layer in the document. Can be assigned during creation, but not later.


### layer.ownerDocument → HTMLDocument

The DOM document which this layer is owned by (created by). Note that a layer always have a ownerDocument, even if it's not in a DOM tree.


### layer.document → HTMLDocument

The DOM document which this layer is currently presented in, if any. You can use this to test if the layer is part of the DOM tree or not.

If you just want to know if a layer is visible or not, see [`layer.hidden`](http://rsms.me/uilayer/#layer.hidden-bool).


## Handling events

### layer.on(type:string, handler:^(event)) → handler

Register *handler* to be triggered each time *event* is emitted on the receiving layer. *type* can be any string, including [DOM Level 3 events](http://www.w3.org/TR/DOM-Level-3-Events/) and custom, arbitrary events.

### layer.removeEventListener(type:string, handler:^(event)) → bool

Remove an event handler.

### layer.emit(type, bubbles:true, cancelable:true, ...) → bool
### layer.emit(type, {bubbles:true, cancelable:true, ...}) → bool

Emit (or: trigger/raise/send) an event on the receiving layer.

*type* can be any string, including [DOM Level 3 events](http://www.w3.org/TR/DOM-Level-3-Events/) and custom, arbitrary events. All arguments or options (in positional call-style) except "type" will be added to the event object that is then sent to all listening event handlers.

Example:

    layer.on 'my-custom-event', ^(ev) {
      print 'my-custom-event triggered with foo:', ev.foo
    }
    layer.emit 'my-custom-event', { foo:'Hello' }



## Performance and edge-cases


### layer.is3DBacked → bool

Indicates whether the layer is backed by high-performance 3D rendering or not.


## Identifying the layer at runtime

### layer.tag ⇄ string

Assign a document-wide unique tag to this layer. This will effectively set `id="tag"` on the underlying element.

Example: [examples/tag.html](http://rsms.me/uilayer/examples/tag.html)

### UILayer.layerWithTag(tag:string) → layer

Find a layer anywhere in the document which has the specified tag.



## Events

A layer can emit any DOM Level 3 Events as well as arbitrary, user-defined events. Listed below are the UILayer-specific events.

### uilayer:added-to-superlayer {superlayer:UILayer}

The receiving layer was added as a sublayer to another layer (superlayer).

### uilayer:removed-from-superlayer {superlayer:UILayer}

The receiving layer was removed from a layer (superlayer).

### uilayer:added-sublayer {sublayer:UILayer}

A sublayer was added to the receiving layer.

### uilayer:removed-sublayer {sublayer:UILayer}

A sublayer was removed from the receiving layer.

### change:frame {oldValues:{x:, y:, z:, width:, height:}}

Emitted when `layer.rotation` changed. The oldValues object contains the old values of changes properties.

### change:rotation {oldValues:{x:, y:, z:}}

Emitted when `layer.rotation` changed. The oldValues object contains the old values of changes properties.
