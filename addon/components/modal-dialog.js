import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { action, computed, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { readOnly, oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { dasherize } from '@ember/string';
import { isEmpty, typeOf, isNone } from '@ember/utils';
import layout from '../templates/components/modal-dialog';
import { assert, warn } from '@ember/debug';
import { DEBUG } from '@glimmer/env';

const VALID_OVERLAY_POSITIONS = ['parent', 'sibling'];

@tagName('')
@templateLayout(layout)
export default class ModalDialog extends Component {
  @service('modal-dialog')
  modalService;

  destinationElementId = null;

  init() {
    super.init(...arguments);
    
    if (!this.destinationElementId) {
      set(this, 'destinationElementId', this.modalService.destinationElementId);
    }
  }

  @computed(
    'renderInPlace',
    'tetherTarget',
    'animatable',
    'hasLiquidWormhole',
    'hasLiquidTether'
  )
  get modalDialogComponentName() {
    let tetherTarget = this.tetherTarget;
    let hasLiquidTether = this.hasLiquidTether;
    let hasLiquidWormhole = this.hasLiquidWormhole;
    let animatable = this.animatable;

    if (this.renderInPlace) {
      return 'ember-modal-dialog/-in-place-dialog';
    } else if (
      tetherTarget &&
      hasLiquidTether &&
      hasLiquidWormhole &&
      animatable === true
    ) {
      return 'ember-modal-dialog/-liquid-tether-dialog';
    } else if (tetherTarget) {
      this.ensureEmberTetherPresent();
      return 'ember-modal-dialog/-tether-dialog';
    } else if (hasLiquidWormhole && animatable === true) {
      return 'ember-modal-dialog/-liquid-dialog';
    }
    return 'ember-modal-dialog/-basic-dialog';
  }

  animatable = null;

  @readOnly('modalService.hasLiquidWormhole')
  hasLiquidWormhole;

  @readOnly('modalService.hasLiquidTether')
  hasLiquidTether;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    if (DEBUG) {
      this.validateProps();
    }
  }

  validateProps() {
    let overlayPosition = this.overlayPosition;
    if (VALID_OVERLAY_POSITIONS.indexOf(overlayPosition) === -1) {
      warn(
        `overlayPosition value '${overlayPosition}' is not valid (valid values [${VALID_OVERLAY_POSITIONS.join(
          ', '
        )}])`,
        false,
        { id: 'ember-modal-dialog.validate-overlay-position' }
      );
    }
  }

  hasOverlay = true;

  translucentOverlay = false;
  overlayPosition = 'parent'; // `parent` or `sibling`
  clickOutsideToClose = false;
  renderInPlace = false;
  tetherTarget = null;

  @oneWay('elementId')
  stack; // pass a `stack` string to set a "stack" to be passed to liquid-wormhole / liquid-tether

  value = 0; // pass a `value` to set a "value" to be passed to liquid-wormhole / liquid-tether
  targetAttachment = 'middle center';
  tetherClassPrefix = null;

  @computed('attachment')
  get attachmentClass() {
    let attachment = this.attachment;
    if (isEmpty(attachment)) {
      return undefined;
    }
    return attachment
      .split(' ')
      .map((attachmentPart) => {
        return `emd-attachment-${dasherize(attachmentPart)}`;
      })
      .join(' ');
  }

  ensureEmberTetherPresent() {
    if (!this.modalService.hasEmberTether) {
      throw new Error(
        'Please install ember-tether in order to pass a tetherTarget to modal-dialog'
      );
    }
  }

  @action
  onCloseAction() {
    const onClose = this.onClose;
    // we shouldn't warn if the callback is not provided at all
    if (isNone(onClose)) {
      return;
    }

    assert(
      'onClose handler must be a function',
      typeOf(onClose) === 'function'
    );

    onClose();
  }

  @action
  onClickOverlayAction(e) {
    e.preventDefault();

    const onClickOverlay = this.onClickOverlay;
    // we shouldn't warn if the callback is not provided at all
    if (isNone(onClickOverlay)) {
      this.onCloseAction();
      return;
    }

    assert(
      'onClickOverlay handler must be a function',
      typeOf(onClickOverlay) === 'function'
    );

    onClickOverlay();
  }
}
