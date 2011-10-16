# UILayer

UILayer provides an API on top of the WebKit DOM **for working with the concept of layers**. Instead of manipulating DOM elements using a myriad of mixed concepts, you go though a single, well defined API.


## Examples

- [Psychotic layers randomly moving around inside another layer](http://rsms.me/uilayer/examples/)
- [Flip some pages in the Flip Book](http://rsms.me/uilayer/examples/flip-book.html)

See the ["examples" directory in the source repository](https://github.com/rsms/uilayer/tree/master/examples) for more examples.

> Note: UILayer only works in WebKit-based environments, such as web views on Apple iOS, OS X and Android or in web browsers like Google Chrome and Safari.


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


### layer.scale ⇄ number (0-inf]

Scale of the layer. Defaults to 1.0 (100%).


### layer.scaleBy(x, y:0, z:0)

Modify scale of the layer.


### layer.moveBy(x, y:0, z:0)

Modify position of the layer.


### layer.rotateBy(x, y:0, z:0)

Modify rotation of the layer. Degrees are expressed as [0-360].


### layer.anchorPoint ⇄ [x, y, z]

Defines the anchor point of the layer's bounds rectangle. Animatable.

Described in the unit coordinate space. The value of this property is specified in points. Defaults to (0.5, 0.5, 0), the center of the bounds rectangle.

Example: [examples/anchorPoint.html](http://rsms.me/uilayer/examples/anchorPoint.html)


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

### layer.color ⇄ string

Foreground (text) color of the layer. Defaults to the inherited value (from the environment, i.e. default browser style or host website style).

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
    layer.frame.x = 100
    # Layer moves 100 px to the right during 500ms


### layer.animationDuration ⇄ number (0-inf]

Duration in milliseconds of animations implied by changing properties. Only effective if `layer.animated` is set to true.

Example:

    layer = UILayer {x:0, y:0, width:100, height:100}
    layer.animated = true
    layer.animationDuration = 200
    layer.frame.x = 100
    # Layer moves 100 px to the right during 200ms


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
    # Layer moves 100 px to the right during 500ms, slowing down in the end


## Layer hierarchy

### layer.superlayer → layer

Parent layer.


### layer.sublayers → [layer, ..]

A list of all sublayers (other layers that are owned by, or live within, the layer).


### layer.firstSublayer → layer

First sublayer (equivalent to `layer.sublayers[0]`).


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

Register *handler* to be triggered each time *event* is emitted on the receiving layer. *type* can be any string, including DOM Level 3 official events and custom, arbitrary events.

### layer.removeEventListener(type:string, handler:^(event)) → bool

Remove an event handler.

### layer.emit(type, bubbles:true, cancelable:true, ...) → bool
### layer.emit(type, {bubbles:true, cancelable:true, ...}) → bool

Emit (or: trigger/raise/send) an event on the receiving layer.

*type* can be any string, including DOM Level 3 official events and custom, arbitrary events. All arguments or options (in positional call-style) except "type" will be added to the event object that is then sent to all listening event handlers.

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

