# Ember Modal Dialog [![Build Status](https://travis-ci.org/yapplabs/ember-modal-dialog.svg?branch=master)](https://travis-ci.org/yapplabs/ember-modal-dialog) [![Ember Observer Score](http://emberobserver.com/badges/ember-modal-dialog.svg)](http://emberobserver.com/addons/ember-modal-dialog)

The ember-modal-dialog addon provides components to implement modal dialogs throughout an Ember application using a simple, consistent pattern.

Unlike other modal libraries for Ember, ember-modal-dialog uses our [ember-wormhole](//github.com/yapplabs/ember-wormhole) addon to render a modal as a top-level DOM element for layout purposes while retaining its logical position in the Ember view hierarchy. This difference introduces a certain elegance and, dare we say, joy, into the experience of using modals in your app. (For more info on this,
see the "Wormhole" section below!)

## Live Demo

View a live demo here: [http://yapplabs.github.io/ember-modal-dialog/](http://yapplabs.github.io/ember-modal-dialog/)

## Test Examples

Test examples are located in `tests/dummy/app/templates/application.hbs` and can be run locally by following the instructions in the "Installation" and "Running" sections below.

## Including In An Ember Application

Here is the simplest way to get started with ember-modal-dialog:

```sh
ember install ember-modal-dialog
ember install ember-cli-sass
```

In Ember CLI versions < 0.2.3, the install command should be:

```sh
ember install:addon ember-modal-dialog
ember install:addon ember-cli-sass
```

**app.scss**
```scss
@import "ember-modal-dialog/ember-modal-structure";
@import "ember-modal-dialog/ember-modal-appearance";
```

**application.hbs**
```htmlbars
{{#modal-dialog}}
  Oh hai there!
{{/modal-dialog}}
```

## Controller-bound Usage

Here is a more useful example of how to conditionally display a modal based on a user interaction.

**Template**

```htmlbars
<button {{action "toggleModal"}}>Toggle Modal</button>

{{#if isShowingModal}}
  {{#modal-dialog close="toggleModal"
                  alignment="center"
                  translucentOverlay=true}}
    Oh hai there!
  {{/modal-dialog}}
{{/if}}
```

**Controller**

```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingModal: false,
  actions: {
    toggleModal: function() {
      this.toggleProperty('isShowingModal');
    }
  }
});
```

## Routable Usage

To have a modal open for a specific route, just drop the `{{modal-dialog}}` into that route's template. Don't forget to have an `{{outlet}}` on the parent route.

## Configurable Properties

The following properties of the modal-dialog component are configurable:

Property              | Purpose
--------------------- | -------------
`hasOverlay`          | `true|false` (default: `true`)
`translucentOverlay`  | `true|false` (default: `false`)
`clickOutsideToClose` | `true|false` (default: `false`) Allows you to click outside the modal to close without an overlay. Useful if your modal isn't the focus of interaction, and you want hover effects to still work outside the modal.
`overlay-class`       | CSS class name(s) to append to overlay divs. Set this from template.`)
`overlayClassNames`   | CSS class names to append to overlay divs. This is a concatenated property, so it does **not** replace the default overlay class (default: `'ember-modal-overlay'`. If you subclass this component, you may define this in your subclass.)
`container-class`     | CSS class name(s) to append to container divs. Set this from template.`)
`containerClassNames` | CSS class names to append to container divs. This is a concatenated property, so it does **not** replace the default container class (default: `'ember-modal-dialog'`. If you subclass this component, you may define this in your subclass.)
`alignment`           | `top|right|left|bottom|center|none` (for use with `alignmentTarget`)
`alignmentTarget`     | Element selector, element, or Ember View reference for modal position (for use with `alignment`)
`close`               | The action handler for the dialog's `close` action. This action triggers when the user clicks the modal overlay.
`attachment`          | A string of the form 'vert-attachment horiz-attachment' (see "Positioning" section below)
`targetAttachment`    | A string of the form 'vert-attachment horiz-attachment' (see "Positioning" section below)
`renderInPlace`       | A boolean, when true renders the modal without positioning or DOM position manipulation, useful for including a modal in a style guide

If using ember-tether, the following additional properties of the modal-dialog component are configurable. Please see [Hubspot Tether](http://github.hubspot.com/tether/) for usage documentation.

- `tetherClassPrefix`
- `offset`
- `targetOffset`

## Positioning With or Without ~~Bono~~ Ember Tether

This component **optionally** uses our [ember-tether](//github.com/yapplabs/ember-tether) addon to position modal dialogs near another element or view on the page.

If you include ember-tether as a dependency in your Ember app, ember-modal-dialog will use it. If you do not include the ember-tether dependency, ember-modal-dialog will fallback to its default positioning behavior.

Pros and cons of each approach are detailed below.

### Positioning With Ember Tether

ember-tether provides the ability for attached modals to remain tethered to their targets when users scroll or resize the window.

#### Caveats

Event delegation originating from content inside ember-tether blocks will only work for Ember apps that use Ember's default root element of the `body` tag. This is because the Hubspot Tether library appends its positioned elements to the body tag.

If you are not overriding the default root element, then don't worry and carry on. ember-tether will work just fine for you.

#### How To Position Modal Dialogs Using Ember Tether

- Install ember-tether as a dependency of **your ember app**.

    `ember install ember-tether`

- Specify the following properties on a `modal-dialog` component:

    - `alignmentTarget`
    - `attachment`
    - `targetAttachment`

Note that `attachment` and `targetAttachment` expect a string of the form 'vert-attachment horiz-attachment':

- vert-attachment can be any of 'top', 'middle', 'bottom'
- horiz-attachment can be any of 'left', 'center', 'right'

Extreme detail can be found on the [Hubspot Tether](http://github.hubspot.com/tether/) site.

### Positioning Without Ember Tether

If you do not carry a dependency on Hubspot Tether, ember-modal-dialog will fallback to its own positioning logic. Just specify the `alignment` and `alignmentTarget` properties as you see fit.

Note that this positioning logic is not nearly as sophisticated as the positioning logic in Ember Tether. That's why we made Ember Tether.

## Wormholes

Display of a modal dialog is typically triggered by a user interaction. While the content in the dialog is related to the content in the user interaction, the underyling display mechanism for the dialogs can be shared across the entire application.

The `add-modals-container` initializer appends a container element to the `application.rootElement`. It injects a reference to this container element id as a property of the `modal-dialog` service, which is then used in the `modal-dialog` component. The property is injected into a service instead of directly into the `modal-dialog` component to make it easier to extend the component and make custom modals.

This component uses the ember-wormhole component to render a dialog by appending a morph to a dedicated element in the DOM. This decouples the DOM location of a modal from the DOM location of whatever triggered its display... hence wormholes!

## Configuring the Modal Root Element Id

This default id of the modal root element is `modal-overlays` and can be overridden in environment application options as follows:

```javascript
module.exports = function(environment) {
  var ENV = {
    ...
    APP: {
      emberModalDialog: {
        modalRootElementId: 'custom-modal-root-element'
      }
    }
  };
  ...

  return ENV;
};

```

## Configuring Styles

Modal dialogs are rendered as child nodes of a modals container div with a default id of `modal-overlays`.

Each modal dialog consists of an overlay div with class `ember-modal-overlay` followed by the a dialog div with class `ember-modal-dialog`.

The resultant portion of the DOM looks like this:

```html
<div id="modal-overlays">
  <div class="ember-modal-overlay"></div>
  <div class="ember-modal-dialog">
  ... MODAL DIALOG CONTENT HTML HERE ...
  </div>
</div>
```

The addon packages default styles for modal structure and appearance. To use these styles, install ember-cli-sass and import the relevant SCSS file(s) in `app.scss`.

```sh
> ember install ember-cli-sass
```

Or, in Ember CLI versions < 0.2.3:

```sh
ember install:addon ember-cli-sass
```

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

export default ModalDialog.extend({
  setup: function() {
    Ember.$('body').on('keyup.modal-dialog', (e) => {
      if (e.keyCode == 27) {
        this.sendAction('close');
      }
    });
  }.on('didInsertElement'),

  teardown: function() {
    Ember.$('body').off('keyup.modal-dialog');
  }.on('willDestroyElement'),
});
```

This can work, but some apps require a more sophisticated approach. One approach, inspired by Cocoa, takes advantage of the [ember-key-responder](https://github.com/yapplabs/ember-key-responder) library. Here's an example:

```javascript
// app/components/modal-dialog.js
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  acceptsKeyResponder: true,
  becomeKeyResponderWhenInserted: function() {
    this.becomeKeyResponder();
  }.on('didInsertElement'),

  resignKeyResponderWhenDestroyed: function() {
    this.resignKeyResponder();
  }.on('willDestroyElement'),

  cancel: function() {
    this.sendAction('close');
  }
});
```

View [the library](https://github.com/yapplabs/ember-key-responder) for more information.

## iOS

In order for taps on the overlay to be functional on iOS, a `cursor: pointer` style is added to the `div` when on iOS. If you need to change this behavior, subclass modal-dialog and override `makeOverlayClickableOnIOS`.

## Custom Modals

If you have various different styles of modal dialog in your app, it can be useful to subclass the dialog as a new component:

```js
// app/components/full-screen-modal.js

import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  containerClassNames: "full-screen-modal",
  hasOverlay: false,
  alignment: "none"
});
```

This can then be used like so:

```htmlbars
{{#full-screen-modal}}
  Custom modal contents
{{/full-screen-modal}}
```

## Dependencies

* Requires Ember CLI >= 0.2.0
* Requires Ember >= 1.10.0 (Due to a bug in these versions of Ember, you may have trouble with Ember 1.13.7, 1.13.8 and 1.13.9 -- See #71)

## Installation

* `ember install ember-modal-dialog`

Or, in Ember CLI versions < 0.2.3:

```sh
ember install:addon ember-modal-dialog
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember try:testall`
* `ember test`
* `ember test --server`

## Unit Tests

When running unit tests on components that use ember-modal-dialog it is necessary to create and register the container for ember-modal-dialog to wormhole itself into.  See this [example](tests/unit/components/component-that-uses-modal-dialog-test.js) for how to set this up in a unit test.

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Generating the Changelog

This project uses [https://github.com/skywinder/github-changelog-generator](https://github.com/skywinder/github-changelog-generator) to generate its changelog.

## Credits

Contributions from @stefanpenner, @krisselden, @chrislopresto, @lukemelia, @raycohen and
others. [Yapp Labs](http://yapplabs.com) is an Ember.js consultancy based in NYC.
