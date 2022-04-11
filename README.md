# Ember Modal Dialog [![Build Status](https://travis-ci.org/yapplabs/ember-modal-dialog.svg?branch=master)](https://travis-ci.org/yapplabs/ember-modal-dialog) [![Ember Observer Score](http://emberobserver.com/badges/ember-modal-dialog.svg)](http://emberobserver.com/addons/ember-modal-dialog)

The ember-modal-dialog addon provides components to implement modal dialogs throughout an Ember application using a simple, consistent pattern.

Unlike some other modal libraries for Ember, ember-modal-dialog uses solutions like [ember-wormhole](//github.com/yapplabs/ember-wormhole) to render a modal structure as a top-level DOM element for layout purposes while retaining its logical position in the Ember view hierarchy. This difference introduces a certain elegance and, dare we say, joy, into the experience of using modals in your app. For more info on this, see the "Wormhole" section below.

## Table of Contents

<!-- toc -->

- [Ember Modal Dialog ![Build Status](https://travis-ci.org/yapplabs/ember-modal-dialog) [![Ember Observer Score](http://emberobserver.com/badges/ember-modal-dialog.svg)](http://emberobserver.com/addons/ember-modal-dialog)](#ember-modal-dialog--)
  - [Table of Contents](#table-of-contents)
  - [Live Demo and Test Examples](#live-demo-and-test-examples)
  - [Including In An Ember Application](#including-in-an-ember-application)
  - [Upgrading](#upgrading)
  - [Controller-bound Usage](#controller-bound-usage)
  - [Routable Usage](#routable-usage)
  - [Configurable Properties](#configurable-properties)
    - [modal-dialog](#modal-dialog)
      - [Tethering](#tethering)
      - [Animation](#animation)
    - [Optional Dependencies](#optional-dependencies)
  - [Which Component Should I Use?](#which-component-should-i-use)
  - [Positioning](#positioning)
      - [Caveats](#caveats)
  - [Wormholes](#wormholes)
  - [Configuring the Modal Root Element Id](#configuring-the-modal-root-element-id)
  - [Configuring Styles](#configuring-styles)
  - [Keyboard shortcuts](#keyboard-shortcuts)
  - [iOS](#ios)
  - [Custom Modals](#custom-modals)
  - [Using as a nested addon](#using-as-a-nested-addon)
  - [Dependencies](#dependencies)
  - [Additional Resources](#additional-resources)
  - [Contributing](#contributing)
  - [Credits](#credits)

<!-- tocstop -->

## Live Demo and Test Examples

View a live demo here: [http://yapplabs.github.io/ember-modal-dialog/](http://yapplabs.github.io/ember-modal-dialog/)

Test examples are located in `test-app/app/templates/application.hbs` and can be run locally by following the instructions in the "Installation" and "Running" sections below.

[![Video image](https://i.vimeocdn.com/video/558401687_640x360.jpg)](https://vimeo.com/157192323)

## Including In An Ember Application

Here is the simplest way to get started with ember-modal-dialog:

```sh
ember install ember-modal-dialog
```

Then import the CSS files

**app.css**
```css
@import "ember-modal-dialog/ember-modal-structure.css";
@import "ember-modal-dialog/ember-modal-appearance.css";
```

If you’re using SASS then just import the CSS slightly differently

**app.scss**
```scss
@import "ember-modal-dialog/ember-modal-structure";
@import "ember-modal-dialog/ember-modal-appearance";
```

**application.hbs**
```hbs
{{#modal-dialog}}
  Oh hai there!
{{/modal-dialog}}
```

## Upgrading

Earlier versions of `ember-modal-dialog` required `ember-cli-sass` and an `app.scss` file to import styling.

Please be aware this is no longer the case.

Existing applications should continue to work correctly but if you were using `ember-cli-sass` solely due to `ember-modal-dialog` it might be worthwhile removing `ember-cli-sass` completely and just importing the styles directly into `app.css` instead, as shown above.

## Controller-bound Usage

Here is a more useful example of how to conditionally display a modal based on a user interaction.

**Template**

```hbs
<button {{on 'click' this.toggleModal}}>Toggle Modal</button>

{{#if this.isShowingModal}}
  <ModalDialog
      @onClose={{this.toggleModal}}
      @targetAttachment="center"
      @translucentOverlay={{true}}
  >
    Oh hai there!
  </ModalDialog>
{{/if}}
```

**Controller**

```javascript
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked isShowingModal = false;
  @action toggleModal() {
    this.isShowingModal = !this.isShowingModal;
  }
}
```

## Routable Usage

To have a modal open for a specific route, just drop the `<ModalDialog>` into that route's template. Don't forget to have an `{{outlet}}` on the parent route.

## Configurable Properties

### &lt;ModalDialog&gt;

The modal-dialog component supports the following properties:

Property              | Purpose
--------------------- | -------------
`hasOverlay`          | Toggles presence of overlay div in DOM
`translucentOverlay`  | Indicates translucence of overlay, toggles presence of `translucent` CSS selector
`onClose`               | The action handler for the dialog's `onClose` action. This action triggers when the user clicks the modal overlay.
`onClickOverlay`      | An action to be called when the overlay is clicked. If this action is specified, clicking the overlay will invoke it instead of `onClose`.
`clickOutsideToClose` | Indicates whether clicking outside a modal *without* an overlay should close the modal. Useful if your modal isn't the focus of interaction, and you want hover effects to still work outside the modal.
`renderInPlace`       | A boolean, when true renders the modal without wormholing or tethering, useful for including a modal in a style guide
`overlayPosition`     | either `'parent'` or `'sibling'`,  to control whether the overlay div is rendered as a parent element of the container div or as a sibling to it (default: `'parent'`)
`containerClass`      | CSS class name(s) to append to container divs. Set this from template.
`containerClassNames` | CSS class names to append to container divs. If you subclass this component, you may define this in your subclass.)
`overlayClass`        | CSS class name(s) to append to overlay divs. Set this from template.
`overlayClassNames`   | CSS class names to append to overlay divs. If you subclass this component, you may define this in your subclass.)
`wrapperClass`        | CSS class name(s) to append to wrapper divs. Set this from template.
`wrapperClassNames`   | CSS class names to append to wrapper divs. If you subclass this component, you may define this in your subclass.)
`animatable`          | A boolean, when `true` makes modal animatable using `liquid-fire` (requires `liquid-wormhole` to be installed, and for tethering situations `liquid-tether`. Having these optional dependencies installed and not specifying `animatable` will make `animatable=true` be the default.)

#### Tethering

If you specify a `tetherTarget`, you are opting into "tethering" behavior, and you must have either `ember-tether` or `liquid-tether` installed.

Property              | Purpose
--------------------- | -------------
`tetherTarget`        | Element selector or element reference for that serves as the reference for modal position

We use the amazing [Tether.js](http://tether.io/) library (via [ember-tether](https://github.com/yapplabs/ember-tether)) to let you position your dialog relative to other elements in the DOM.

\* Please see [Hubspot Tether](http://github.hubspot.com/tether/) for usage documentation.

When in a tethering scenario, you may also pass the following properties, which are passed through to Tether:

Property              | Purpose
--------------------- | -------------
`attachment`          | Delegates to Hubspot Tether*
`targetAttachment`    | Delegates to Hubspot Tether*
`tetherClassPrefix`   | Delegates to Hubspot Tether*
`offset`              | Delegates to Hubspot Tether*
`targetOffset`        | Delegates to Hubspot Tether*
`constraints`         | Delegates to Hubspot Tether*

#### Animation

This component supports animation when certain addons are present (liquid-wormhole, liquid-tether).

Detection is be automatic. To opt out of using animatable features when you have these `liquid-*` addons installed, pass `animatable={{false}}`.

When in an animatable scenario, you may also pass the following properties, which are passed through to liquid-wormhole or liquid-tether:

Property              | Purpose
--------------------- | -------------
`stack`               | Delegates to liquid-wormhole/liquid-tether

### Optional Dependencies

Dependency                      | Documentation
--------------------------------|------------
`ember install ember-tether`    | [Docs](//github.com/yapplabs/ember-tether/)
`ember install liquid-wormhole` | [Docs](//pzuraq.github.io/liquid-wormhole/)
`ember install liquid-tether`   | [Docs](//pzuraq.github.io/liquid-tether/)
`ember install liquid-fire`     | [Docs](//ember-animation.github.io/liquid-fire/)


## Which Component Should I Use?

Various modal use cases are best supported by different DOM structures. Ember Modal Dialog's `ModalDialog` component provides the following capabilities:

- ModalDialog without passing a `tetherTarget`: Uses ember-wormhole to append the following parent divs to the destination element: wrapper div > overlay div > container div

    ![](test-app/public/modal-dialog.png)

This can be customized (see `overlayPosition`).

- modal-dialog, with a `tetherTarget` provided: Uses ember-tether to display modal container div. Uses ember-wormhole to append optional overlay div to the destination element. Requires separate installation of [ember-tether](//github.com/yapplabs/ember-tether) dependency.

    ![](test-app/public/tether-dialog.png)

## Positioning

With the default CSS provided, your modal will be centered in the viewport. By adjusting the CSS, you can adjust this logic.

Pass a `tetherTarget` in order to position our modal in relation to the target and enable your modal remain positioned near their targets when users scroll or resize the window.

Use `attachment` and `targetAttachment` properties to configure positioning of the modal dialog near its target. Ember Modal Dialog uses the syntax from Hubspot Tether for these properties: "top|middle|bottom left|center|right|elementCenter"... e.g. `'middle left'`

To enable this behavior, install ember-tether as a dependency of **your ember app**.

    ember install ember-tether

Then pass a selector as `tetherTarget` for the modal you wish to position this way:

```hbs
<ModalDialog
  @tetherTarget="#target-element-id"
  @targetAttachment="middle right"
  @attachment="middle left"
>
  I am a modal that will remain tethered to the right of the element with id 'target-element-id'
</ModalDialog>
```

#### Caveats

Event delegation originating from content inside ember-tether blocks will only work for Ember apps that use Ember's default root element of the `body` tag. This is because, generally speaking, the Hubspot Tether library appends its positioned elements to the body element.

If you are not overriding the default root element, then don't worry and carry on. ember-tether will work just fine for you.

## Wormholes

Display of a modal dialog is typically triggered by a user interaction. While the content in the dialog is related to the content in the user interaction, the underlying display mechanism for the dialogs can be shared across the entire application.

The `add-modals-container` initializer appends a container element to the `application.rootElement`. It injects a reference to this container element id as a property of the `modal-dialog` service, which is then used in the `modal-dialog` component. The property is injected into a service instead of directly into the `modal-dialog` component to make it easier to extend the component and make custom modals.

ember-modal-dialog uses ember-wormhole to append modal overlays and contents to a dedicated element in the DOM. This decouples the DOM location of a modal from the DOM location of whatever triggered its display... hence wormholes!

## Configuring the Modal Root Element Id

This default id of the modal root element is `modal-overlays` and can be overridden in environment application options as follows:

**environment.js**
```javascript
module.exports = function(environment) {
  var ENV = {
    // ...
    APP: {
      // ...
      emberModalDialog: {
        modalRootElementId: 'custom-modal-root-element'
      }
    }
  };
  // ...

  return ENV;
};
```

## Configuring Styles

You can import the CSS files directly

**app.css**
```css
@import "ember-modal-dialog/ember-modal-structure.css";
@import "ember-modal-dialog/ember-modal-appearance.css";
```

If you’re using SASS then just import the CSS slightly differently

**app.scss**
```scss
@import "ember-modal-dialog/ember-modal-structure";
@import "ember-modal-dialog/ember-modal-appearance";
```

## Keyboard shortcuts

A quick-and-dirty way to implement keyboard shortcuts (e.g. to dismiss your modals with `escape`) is to subclass the dialog and attach keyboard events:

```js
// app/components/modal-dialog.js
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

const ESC_KEY = 27;

export default ModalDialog.extend({
  didInsertElement() {
    this._super(...arguments);
    this._initEscListener();
  },

  willDestroyElement(){
    this._super(...arguments);
    Ember.$('body').off('keyup.modal-dialog');
  },

  _initEscListener() {
    const closeOnEscapeKey = (ev) => {
      if (ev.keyCode === ESC_KEY) { get(this, 'onClose')(); }
    };

    Ember.$('body').on('keyup.modal-dialog', closeOnEscapeKey);
  },
});
```

This can work, but some apps require a more sophisticated approach. One approach takes advantage of the [ember-keyboard](https://github.com/null-null-null/ember-keyboard) library. Here's an example:

```javascript
// app/components/modal-dialog.js
import { on } from '@ember/object/evented';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import { EKMixin as EmberKeyboardMixin, keyDown } from 'ember-keyboard';

export default ModalDialog.extend(EmberKeyboardMixin, {
  init() {
    this._super(...arguments);

    set(this, 'keyboardActivated', true);
  },

  closeOnEsc: on(keyDown('Escape'), function() {
    get(this, 'onClose')();
  })
});
```

View [the library](https://github.com/null-null-null/ember-keyboard) for more information.

## iOS

In order for taps on the overlay to be functional on iOS, a `cursor: pointer` style is added to the `div` when on iOS. If you need to change this behavior, subclass modal-dialog and override `makeOverlayClickableOnIOS`.

## Custom Modals

If you have various different styles of modal dialog in your app, it can be useful to subclass the dialog as a new component:

```js
// app/components/full-screen-modal.js

import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  containerClassNames: "full-screen-modal",
  targetAttachment: "none"
});
```

By subclassing `ModalDialog` your component will use the default modal dialog template. Therefore, you do not need to create a `app/templates/components/full-screen-modal.hbs` file.
Your component can then be used like so:

```hbs
<FullScreenModal>
  Custom modal contents
</FullScreenModal>
```
## Using as a nested addon

If you create an addon that you want to depend on ember-modal-dialog, you need to provide for ember-modal-dialog's config hook to run. You do this in the config hook of your addon. Example:

```js
// index.js

module.exports = {
  name: 'my-addon',
  config(environment, appConfig) {
    let initialConfig = _.merge({}, appConfig);
    let updatedConfig = this.addons.reduce((config, addon) => {
      if (addon.config) {
        _.merge(config, addon.config(environment, config));
      }
      return config;
    }, initialConfig);
    return updatedConfig;
  }
};
```

## Dependencies

* For Ember versions >= 3.20, use the latest published version
* For Ember versions >= 2.8 and < 3.20, use the latest 3.x version (Note that ember-cli >= 2.13 is required, though your ember version may be >= 2.8)
* For Ember versions >= 2.4 and < 2.8, use the latest 2.x version
* For Ember versions >= 1.10 and < 2.4, use ember-modal-dialog 1.0.0 _(Due to a bug in these versions of Ember, you may have trouble with Ember 1.13.7, 1.13.8 and 1.13.9 -- See #71)_

## Additional Resources

* [Screencast on using ember-modal-dialog](https://www.emberscreencasts.com/posts/74-ember-modal-dialog)

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## Credits

Contributions from @stefanpenner, @krisselden, @chrislopresto, @lukemelia, @raycohen, @andrewhavens, @samselikoff and
others. [Yapp Labs](http://yapplabs.com) was an Ember.js consultancy based in NYC, that has since been folded into [Yapp](https://www.yapp.us).
