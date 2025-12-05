import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { dasherize } from '../utils/string-utils';
import { typeOf } from '@ember/utils';
import { assert, warn } from '@ember/debug';
import { DEBUG } from '@glimmer/env';
import { importSync } from '@embroider/macros';
import { ensureSafeComponent } from '@embroider/util';
import { guidFor } from '@ember/object/internals';

const VALID_OVERLAY_POSITIONS = ['parent', 'sibling'];

// Args:
// `hasOverlay`          | Toggles presence of overlay div in DOM
// `translucentOverlay`  | Indicates translucence of overlay, toggles presence of `translucent` CSS selector
// `onClose`               | The action handler for the dialog's `onClose` action. This action triggers when the user clicks the modal overlay.
// `onClickOverlay`      | An action to be called when the overlay is clicked. If this action is specified, clicking the overlay will invoke it instead of `onClose`.
// `clickOutsideToClose` | Indicates whether clicking outside a modal *without* an overlay should close the modal. Useful if your modal isn't the focus of interaction, and you want hover effects to still work outside the modal.
// `renderInPlace`       | A boolean, when true renders the modal without wormholing or tethering, useful for including a modal in a style guide
// `overlayPosition`     | either `'parent'` or `'sibling'`,  to control whether the overlay div is rendered as a parent element of the container div or as a sibling to it (default: `'parent'`)
// `containerClass`      | CSS class name(s) to append to container divs. Set this from template.
// `containerClassNames` | CSS class names to append to container divs. If you subclass this component, you may define this in your subclass.)
// `overlayClass`        | CSS class name(s) to append to overlay divs. Set this from template.
// `overlayClassNames`   | CSS class names to append to overlay divs. If you subclass this component, you may define this in your subclass.)
// `wrapperClass`        | CSS class name(s) to append to wrapper divs. Set this from template.
// `wrapperClassNames`   | CSS class names to append to wrapper divs. If you subclass this component, you may define this in your subclass.)
// `animatable`          | A boolean, when `true` makes modal animatable using `liquid-fire` (requires `liquid-wormhole` to be installed, and for tethering situations `liquid-tether`. Having these optional dependencies installed and not specifying `animatable` will make `animatable=true` be the default.)
// `tetherTarget`        | If you specify a `tetherTarget`, you are opting into "tethering" behavior, and you must have either `ember-tether` or `liquid-tether` installed.
// `destinationElementId`| optional
// `targetAttachment`    | Delegates to Hubspot Tether*
// `tetherClassPrefix`   | Delegates to Hubspot Tether*
// `offset`              | Delegates to Hubspot Tether*
// `targetOffset`        | Delegates to Hubspot Tether*
// `constraints`         | Delegates to Hubspot Tether*
// `stack`               | Delegates to liquid-wormhole/liquid-tether
// `value`               | pass a `value` to set a "value" to be passed to liquid-wormhole / liquid-tether

export default class ModalDialog extends Component {
  @service('modal-dialog') modalService;

  get value() {
    // pass a `value` to set a "value" to be passed to liquid-wormhole / liquid-tether
    return this.args.value || 0;
  }
  get hasLiquidWormhole() {
    return this.modalService.hasLiquidWormhole;
  }

  get hasLiquidTether() {
    return this.modalService.hasLiquidTether;
  }

  get hasOverlay() {
    return this.args.hasOverlay ?? true;
  }

  get stack() {
    // this `stack` string will be set as this element's ID and passed to liquid-wormhole / liquid-tether
    return guidFor(this);
  }

  get containerClassNamesVal() {
    return this.args.containerClassNames || this.containerClassNames || null;
  }

  get attachmentClass() {
    let { attachment } = this.args;
    if (!attachment) {
      return undefined;
    }
    return attachment
      .split(' ')
      .map((attachmentPart) => {
        return `emd-attachment-${dasherize(attachmentPart)}`;
      })
      .join(' ');
  }

  get targetAttachment() {
    return this.args.targetAttachment || 'middle center';
  }

  get whichModalDialogComponent() {
    let { hasLiquidTether, hasLiquidWormhole } = this;
    let { animatable, tetherTarget, renderInPlace } = this.args;
    let module = importSync('ember-modal-dialog/components/basic-dialog');

    if (renderInPlace) {
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

  get destinationElementId() {
    return (
      this.args.destinationElementId || this.modalService.destinationElementId
    );
  }

  validateProps() {
    let overlayPosition = this.overlayPosition;
    if (VALID_OVERLAY_POSITIONS.indexOf(overlayPosition) === -1) {
      warn(
        `overlayPosition value '${overlayPosition}' is not valid (valid values [${VALID_OVERLAY_POSITIONS.join(
          ', ',
        )}])`,
        false,
        { id: 'ember-modal-dialog.validate-overlay-position' },
      );
    }
  }

  get overlayPosition() {
    let result = this.args.overlayPosition || 'parent';
    if (DEBUG && VALID_OVERLAY_POSITIONS.indexOf(result) === -1) {
      warn(
        `overlayPosition value '${result}' is not valid (valid values [${VALID_OVERLAY_POSITIONS.join(
          ', ',
        )}])`,
        false,
        { id: 'ember-modal-dialog.validate-overlay-position' },
      );
    }
    return result;
  }

  ensureEmberTetherPresent() {
    if (!this.modalService.hasEmberTether) {
      throw new Error(
        'Please install ember-tether in order to pass a tetherTarget to modal-dialog',
      );
    }
  }

  onCloseAction = () => {
    const { onClose } = this.args;
    // we shouldn't warn if the callback is not provided at all
    if (!onClose) {
      return;
    }

    assert(
      'onClose handler must be a function',
      typeOf(onClose) === 'function',
    );

    onClose();
  };

  onClickOverlayAction = (ev) => {
    ev.preventDefault();

    const { onClickOverlay } = this.args;
    // we shouldn't warn if the callback is not provided at all
    if (!onClickOverlay) {
      this.onCloseAction();
      return;
    }

    assert(
      'onClickOverlay handler must be a function',
      typeOf(onClickOverlay) === 'function',
    );

    onClickOverlay();
  };
}
