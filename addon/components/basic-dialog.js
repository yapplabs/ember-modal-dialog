import Ember from 'ember';
import layout from '../templates/components/basic-dialog';

const { $, computed, guidFor } = Ember;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const computedJoin = function(prop) {
  return computed(prop, function() {
    return this.get(prop).join(' ');
  });
};

export default Ember.Component.extend({
  tagName: '',
  layout,

  // containerClass - set this from templates
  containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition
  containerClassNamesString: computedJoin('containerClassNames'),

  // 'overlayClass - set this from templates
  overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition
  overlayClassNamesString: computedJoin('overlayClassNames'),

  // 'wrapperClass - set this from templates
  wrapperClassNames: ['ember-modal-wrapper'], // set this in a subclass definition
  wrapperClassNamesString: computedJoin('wrapperClassNames'),

  concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],

  translucentOverlay: false,
  clickOutsideToClose: false,
  destinationElementId: null,
  hasOverlay: true,

  makeOverlayClickableOnIOS: Ember.on('didInsertElement', function() {
    if (isIOS) {
      Ember.$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
    }
  }),

  didInsertElement() {
    if (!this.get('clickOutsideToClose')) {
      return;
    }

    const handleClick = (event) => {
      let $eventTarget = $(event.target);

      // if the click has already resulted in the target
      // being removed or hidden, do nothing
      if (!$eventTarget.is(':visible')) {
        return;
      }

      // if the click is within the dialog, do nothing
      if ($eventTarget.closest('.ember-modal-dialog').length) {
        return;
      }

      this.onClose();
    };
    const registerClick = () => $(document).on(`click.ember-modal-dialog-${guidFor(this)}`, handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);

    if (isIOS) {
      const registerTouch = () => $(document).on(`touchend.ember-modal-dialog-${guidFor(this)}`, handleClick);
      setTimeout(registerTouch);
    }
    this._super(...arguments);
  },

  willDestroyElement() {
    $(document).off(`click.ember-modal-dialog-${guidFor(this)}`);
    if (isIOS) {
      $(document).off(`touchend.ember-modal-dialog-${guidFor(this)}`);
    }
    this._super(...arguments);
  }
});
