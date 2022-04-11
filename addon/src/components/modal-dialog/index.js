import { tagName } from '@ember-decorators/component';
import { action, computed, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { readOnly, oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { dasherize } from '@ember/string';
import { isEmpty, typeOf, isNone } from '@ember/utils';
import { assert, warn } from '@ember/debug';
import { DEBUG } from '@glimmer/env';
import { importSync } from '@embroider/macros';
import { ensureSafeComponent } from '@embroider/util';

const VALID_OVERLAY_POSITIONS = ['parent', 'sibling'];

@tagName('')
export default class ModalDialog extends Component {
  @service('modal-dialog')
  modalService;

  animatable = null;
  clickOutsideToClose = false;
  destinationElementId = null;
  hasOverlay = true;
  overlayPosition = 'parent'; // `parent` or `sibling`
  renderInPlace = false;
  targetAttachment = 'middle center';
  tetherClassPrefix = null;
  tetherTarget = null;
  translucentOverlay = false;
  value = 0; // pass a `value` to set a "value" to be passed to liquid-wormhole / liquid-tether

  @readOnly('modalService.hasLiquidWormhole')
  hasLiquidWormhole;

  @readOnly('modalService.hasLiquidTether')
  hasLiquidTether;

  @oneWay('elementId')
  stack; // pass a `stack` string to set a "stack" to be passed to liquid-wormhole / liquid-tether

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

  @computed(
    'renderInPlace',
    'tetherTarget',
    'animatable',
    'hasLiquidWormhole',
    'hasLiquidTether'
  )
  get whichModalDialogComponent() {
    let { animatable, hasLiquidTether, hasLiquidWormhole, tetherTarget } = this;
    let module = importSync('ember-modal-dialog/components/basic-dialog');

    if (this.renderInPlace) {
      module = importSync('ember-modal-dialog/components/in-place-dialog');
    } else if (
      tetherTarget &&
      hasLiquidTether &&
      hasLiquidWormhole &&
      animatable === true
    ) {
      module = importSync('ember-modal-dialog/components/liquid-tether-dialog');
    } else if (tetherTarget) {
      this.ensureEmberTetherPresent();
      module = importSync('ember-modal-dialog/components/tether-dialog');
    } else if (hasLiquidWormhole && animatable === true) {
      module = importSync('ember-modal-dialog/components/liquid-dialog');
    }

    return ensureSafeComponent(module.default, this);
  }

  init() {
    super.init(...arguments);

    if (!this.destinationElementId) {
      set(this, 'destinationElementId', this.modalService.destinationElementId);
    }
  }

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
