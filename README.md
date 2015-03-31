# Ember Modal Dialog [![Build Status](https://travis-ci.org/yapplabs/ember-modal-dialog.svg?branch=master)](https://travis-ci.org/yapplabs/ember-modal-dialog) [![Ember Observer Score](http://emberobserver.com/badges/ember-modal-dialog.svg)](http://emberobserver.com/addons/ember-modal-dialog)

The ember-modal-dialog addon provides components to implement modal dialogs throughout an Ember application using a simple, consistent pattern.

Unlike other modal libraries for Ember, ember-modal-dialog uses advanced features of HTMLBars to render a modal as a top-level DOM element for layout purposes while retaining its logical position in the Ember view hierarchy. This difference introduces a certain elegance and, dare we say, joy, into the experience of using modals in your app. (For more info on this,
see the "Wormhole" section below!)

Test examples are located in `tests/dummy/app/templates/application.hbs` and can be run locally by following the instructions in the "Installation" and "Running" sections below.

## Including In An Ember Application

Here is the simplest way to get started with ember-modal-dialog.

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
  {{#modal-dialog alignment='center'
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
    toggleModal: function(){
      this.toggleProperty('isShowingModal');
    }
  }
});
```

## Routable Usage

To have a modal open for a specific route, just drop the `{{modal-dialog}}` into that route's template.

## Configurable Properties

The following properties of the modal-dialog component are configurable:

Property              | Purpose
--------------------- | -------------
`hasOverlay`          | `true|false` (default: `true`)
`translucentOverlay`  | `true|false` (default: `false`)
`overlayClassNames`   | CSS class names to append to overlay divs. **NOTE:** does **not** replace the default overlay class (default: `'ember-modal-overlay'`)
`containerClassNames` | CSS class names to append to container divs. **NOTE:** does **not** replace the default container class (default: `'ember-modal-dialog'`)
`alignment`           | `top|right|left|bottom|center|none` (for use with `alignmentTarget`)
`alignmentTarget`     | Element selector frame of reference for modal position (for use with `alignment`)
`close`               | The action handler for the dialog's `close` action

## Wormholes

Display of a modal dialog is typically triggered by a user interaction. While the content in the dialog is related to the content in the user interaction, the underyling display mechanism for the dialogs can be shared across the entire application.

The `add-modals-container` initializer appends a container element to the `application.rootElement`. It injects a reference to this container element id as a property of the internal `ember-modal-dialog-overlay` component.

This overlay component renders a dialog by appending a morph to a dedicated element in the DOM. This decouples the DOM location of a modal from the DOM location of whatever triggered its display... hence wormholes!

## Configuring the Modal Root Element Id

This default id of the modal root element is `modals-overlay` and can be overridden in environment application options as follows:

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
> ember install:addon ember-cli-sass
```

**app.scss**
```scss
@import "ember-modal-dialog/ember-modal-structure";
@import "ember-modal-dialog/ember-modal-appearance";
```

## Wiring Up a Key Responder

Here is an example of how to extend the `modal-dialog` component within an Ember app that is using [ember-key-responder](https://github.com/yapplabs/ember-key-responder).

**app/components/modal-dialog.js**

```javascript
import Component from 'ember-modal-dialog/components/modal-dialog';

export default Component.extend({
  acceptsKeyResponder: true,
  becomeKeyResponderWhenInserted: function(){
    this.becomeKeyResponder();
  }.on('didInsertElement'),

  resignKeyResponderWhenDestroyed: function(){
    this.resignKeyResponder();
  }.on('willDestroyElement'),

  cancel: function() {
    this.sendAction('close');
  }
});
```

## Dependencies

* Requires Ember CLI >= 0.2.0
* Requires Ember >= 1.11.0-beta.5

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember try:testall`
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
