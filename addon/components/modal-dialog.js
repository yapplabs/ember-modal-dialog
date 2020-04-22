import { oneWay, readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import { dasherize } from '@ember/string';
import { computed } from '@ember/object';
import { isEmpty, typeOf, isNone } from '@ember/utils';
import { inject as service } from '@ember/service';
import layout from '../templates/components/modal-dialog';
import { assert, warn } from '@ember/debug';
import { DEBUG } from '@glimmer/env';

const VALID_OVERLAY_POSITIONS = ['parent', 'sibling'];

export default Component.extend({
  tagName: '',
  layout,
  modalService: service('modal-dialog'),
  destinationElementId: null,

  init() {
    this._super(...arguments);
    if (!this.get('destinationElementId')) {
      this.set('destinationElementId', this.get('modalService.destinationElementId'));
    }
  },

  modalDialogComponentName: computed('renderInPlace', 'tetherTarget', 'animatable', 'hasLiquidWormhole', 'hasLiquidTether', function(){
    let tetherTarget = this.get('tetherTarget');
    let hasLiquidTether = this.get('hasLiquidTether');
    let hasLiquidWormhole = this.get('hasLiquidWormhole');
    let animatable = this.get('animatable');

    if (this.get('renderInPlace')) {
      return 'ember-modal-dialog/-in-place-dialog';
    } else if (tetherTarget && hasLiquidTether && hasLiquidWormhole && animatable === true) {
      return 'ember-modal-dialog/-liquid-tether-dialog';
    } else if (tetherTarget) {
      this.ensureEmberTetherPresent();
      return 'ember-modal-dialog/-tether-dialog';
    } else if (hasLiquidWormhole && animatable === true) {
      return 'ember-modal-dialog/-liquid-dialog';
    }
    return 'ember-modal-dialog/-basic-dialog';
  }),
  animatable: null,
  hasLiquidWormhole: readOnly('modalService.hasLiquidWormhole'),
  hasLiquidTether: readOnly('modalService.hasLiquidTether'),

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

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */

  // containerClass - set this from templates
  containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition

  // overlayClass - set this from templates
  overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition

  // wrapperClass - set this from templates
  wrapperClassNames: ['ember-modal-wrapper'], // set this in a subclass definition

  concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],
  /* eslint-enable ember/avoid-leaking-state-in-ember-objects */

  hasOverlay: true,
  translucentOverlay: false,
  overlayPosition: 'parent', // `parent` or `sibling`
  clickOutsideToClose: false,
  renderInPlace: false,
  tetherTarget: null,
  stack: oneWay('elementId'), // pass a `stack` string to set a "stack" to be passed to liquid-wormhole / liquid-tether
  value: 0, // pass a `value` to set a "value" to be passed to liquid-wormhole / liquid-tether

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
      const onClose = this.get('onClose');
      // we shouldn't warn if the callback is not provided at all
      if (isNone(onClose)) {
        return;
      }

      assert('onClose handler must be a function', typeOf(onClose) === 'function');

      onClose();
    },
    onClickOverlay(e) {
      e.preventDefault();

      const onClickOverlay = this.get('onClickOverlay');
      // we shouldn't warn if the callback is not provided at all
      if (isNone(onClickOverlay)) {
        this.send('onClose');
        return;
      }

      assert('onClickOverlay handler must be a function', typeOf(onClickOverlay) === 'function');

      onClickOverlay();
    }
  }
});
