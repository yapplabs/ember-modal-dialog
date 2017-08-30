import Component from '@ember/component';
import { dasherize } from '@ember/string';
import { computed } from '@ember/object';
import { isNone, isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import layout from '../templates/components/modal-dialog';
import { deprecate, warn } from '@ember/debug';
import { DEBUG } from '@glimmer/env';

const VALID_OVERLAY_POSITIONS = ['parent', 'sibling'];

function deprecateImplicitAnimatableWithLiquidTetherPresent() {
  deprecate(
    'Rendering modal-dialog with a tetherTarget and liquid-tether installed, and NOT explicitly specifying `animatable` will change behavior in 3.0.0 to use liquid-tether. Pass `animatable=false` to maintain current behavior and remove this message.',
    false,
    { id: 'ember-modal-dialog.implicit-animatable', until: '3.0.0' }
  );
}

function deprecateImplicitAnimatableWithLiquidWormholePresent() {
  deprecate(
    'Rendering modal-dialog with liquid-wormhole installed, and NOT explicitly specifying `animatable` will change behavior in 3.0.0 to use liquid-wormhole. Pass `animatable=false` to maintain current behavior and remove this message.',
    false,
    { id: 'ember-modal-dialog.implicit-animatable', until: '3.0.0' }
  );
}

export default Component.extend({
  tagName: '',
  layout,
  modalService: service('modal-dialog'),
  destinationElementId: computed.oneWay('modalService.destinationElementId'),
  modalDialogComponentName: computed('renderInPlace', 'tetherTarget', 'animatable', 'hasLiquidWormhole', 'hasLiquidTether', function(){
    let tetherTarget = this.get('tetherTarget');
    let hasLiquidTether = this.get('hasLiquidTether');
    let hasLiquidWormhole = this.get('hasLiquidWormhole');
    let animatable = this.get('animatable');

    if (this.get('renderInPlace')) {
      return 'ember-modal-dialog/-in-place-dialog';
    } else if (tetherTarget && hasLiquidTether && hasLiquidWormhole && isNone(animatable)) {
      deprecateImplicitAnimatableWithLiquidTetherPresent();
      this.ensureEmberTetherPresent();
      return 'ember-modal-dialog/-tether-dialog';
    } else if (tetherTarget && hasLiquidTether && hasLiquidWormhole && animatable === true) {
      return 'ember-modal-dialog/-liquid-tether-dialog';
    } else if (tetherTarget) {
      this.ensureEmberTetherPresent();
      return 'ember-modal-dialog/-tether-dialog';
    } else if (hasLiquidWormhole && isNone(animatable)) {
      deprecateImplicitAnimatableWithLiquidWormholePresent();
      return 'ember-modal-dialog/-basic-dialog';
    } else if (hasLiquidWormhole && animatable === true) {
      return 'ember-modal-dialog/-liquid-dialog';
    }
    return 'ember-modal-dialog/-basic-dialog';
  }),
  animatable: null,
  hasLiquidWormhole: computed.readOnly('modalService.hasLiquidWormhole'),
  hasLiquidTether: computed.readOnly('modalService.hasLiquidTether'),

  didReceiveAttrs() {
    this._super(...arguments);
    if (DEBUG) {
      this.validateProps();
    }
  },
  validateProps() {
    let overlayPosition = this.get('overlayPosition');
    if (VALID_OVERLAY_POSITIONS.indexOf(overlayPosition) === -1) {
      warn(
        `overlayPosition value '${overlayPosition}' is not valid (valid values [${VALID_OVERLAY_POSITIONS.join(', ')}])`,
        false,
        { id: 'ember-modal-dialog.validate-overlay-position'}
      );
    }
  },
  // onClose - set this from templates
  close: computed('onClose', {
    get() {
      return this.get('onClose');
    },
    set(key, value) {
      deprecate(
        'Specifying the `close` action for a modal-dialog/tether-dialog is deprecated in favor of `onClose`. Will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.close-action', until: '3.0.0' }
      );
      this.set('onClose', value);
    },
  }),

  // containerClass - set this from templates
  "container-class": computed('containerClass', {
    get() {
      return this.get('containerClass');
    },
    set(key, value) {
      deprecate(
        'Passing `container-class` (kebab-case) is deprecated in favor of `containerClass` (camelCase). Will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.kebab-props', until: '3.0.0' }
      );
      this.set('containerClass', value);
    },
  }),
  containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition

  // overlayClass - set this from templates
  "overlay-class": computed('overlayClass', {
    get() {
      return this.get('overlayClass');
    },
    set(key, value) {
      deprecate(
        'Passing `overlay-class` (kebab-case) is deprecated in favor of `overlayClass` (camelCase). Will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.kebab-props', until: '3.0.0' }
      );
      this.set('overlayClass', value);
    },
  }),
  overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition

  // wrapperClass - set this from templates
  "wrapper-class": computed('wrapperClass', {
    get() {
      return this.get('wrapperClass');
    },
    set(key, value) {
      deprecate(
        'Passing `wrapper-class` (kebab-case) is deprecated in favor of `wrapperClass` (camelCase). Will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.kebab-props', until: '3.0.0' }
      );
      this.set('wrapperClass', value);
    },
  }),
  wrapperClassNames: ['ember-modal-wrapper'], // set this in a subclass definition

  concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],

  hasOverlay: true,
  translucentOverlay: false,
  overlayPosition: 'parent', // `parent` or `sibling`
  clickOutsideToClose: false,
  renderInPlace: false,
  tetherTarget: null,
  stack: computed.oneWay('elementId'), // pass a `stack` string to set a "stack" to be passed to liquid-wormhole / liquid-tether
  value: 0, // pass a `value` to set a "value" to be passed to liquid-wormhole / liquid-tether
  target: computed({ // element, css selector, or view instance
    get() {
      return 'body';
    },
    set(key, value) {
      deprecate(
        'Specifying a `target` on `modal-dialog` is deprecated in favor of padding `tetherTarget`, which will trigger ember-tether usage. Support for `target` will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.modal-dialog-target', until: '3.0.0' }
      );
      return value;
    },
  }),

  targetAttachment: 'middle center',
  tetherClassPrefix: null,
  attachmentClass: computed('attachment', function() {
    let attachment = this.get('attachment');
    if (isEmpty(attachment)) {
      return;
    }
    return attachment.split(' ').map((attachmentPart) => {
      return `emd-attachment-${dasherize(attachmentPart)}`;
    }).join(' ');
  }),
  targetAttachmentClass: computed('targetAttachment', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    // Convert tether-styled values like 'middle right' to 'right'
    targetAttachment = targetAttachment.split(' ').slice(-1)[0];
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)} emd-target-attachment-${dasherize(targetAttachment)}`;
  }),
  ensureEmberTetherPresent() {
    if (!this.get('modalService.hasEmberTether')) {
      throw new Error('Please install ember-tether in order to pass a tetherTarget to modal-dialog');
    }
  },
  actions: {
    onClose() {
      this.sendAction('onClose');
    },
    onClickOverlay(e) {
      e.preventDefault();
      if (this.get('onClickOverlay')) {
        this.sendAction('onClickOverlay');
      } else {
        this.sendAction('onClose');
      }
    }
  }
});
