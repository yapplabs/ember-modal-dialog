import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import layout from '../templates/components/basic-dialog';
import { dasherize } from '@ember/string';

@classic
@tagName('')
@templateLayout(layout)
export default class BasicDialog extends Component {
  containerClassNames = null;
  overlayClassNames = null;
  wrapperClassNames = null;
  destinationElementId = null;
  translucentOverlay = false;
  clickOutsideToClose = false;
  hasOverlay = true;
  isCentered = true;
  overlayPosition = null;

  @service('modal-dialog')
  modalService;

  init() {
    super.init(...arguments);
    if (!this.destinationElementId) {
      this.set('destinationElementId', this.modalService.destinationElementId);
    }
  }

  variantWrapperClass = 'emd-static';

  @computed(
    'containerClassNames.[]',
    'targetAttachmentClass',
    'attachmentClass',
    'containerClass'
  )
  get containerClassNamesString() {
    return [
      'ember-modal-dialog',
      this.containerClassNames?.join(' '),
      this.targetAttachmentClass,
      this.attachmentClass,
      this.containerClass,
    ]
      .filter((className) => !isEmpty(className))
      .join(' ');
  }

  @computed('overlayClassNames.[]', 'overlayClass', 'translucentOverlay')
  get overlayClassNamesString() {
    return [
      'ember-modal-overlay',
      this.overlayClassNames?.join(' '),
      this.translucentOverlay ? 'translucent' : null,
      this.overlayClass,
    ]
      .filter((className) => !isEmpty(className))
      .join(' ');
  }

  @computed(
    'wrapperClassNames.[]',
    'targetAttachmentClass',
    'variantWrapperClass',
    'wrapperClass'
  )
  get wrapperClassNamesString() {
    return [
      'ember-modal-wrapper',
      this.wrapperClassNames?.join(' '),
      this.targetAttachmentClass.replace('emd-', 'emd-wrapper-'),
      this.variantWrapperClass,
      this.wrapperClass,
    ]
      .filter((className) => !isEmpty(className))
      .join(' ');
  }

  @computed('overlayPosition')
  get isOverlaySibling() {
    return this.overlayPosition === 'sibling';
  }

  @computed('targetAttachment')
  get targetAttachmentClass() {
    let targetAttachment = this.targetAttachment || '';
    // Convert tether-styled values like 'middle right' to 'right'
    targetAttachment = targetAttachment.split(' ').slice(-1)[0];
    return `ember-modal-dialog-target-attachment-${dasherize(
      targetAttachment
    )} emd-target-attachment-${dasherize(targetAttachment)}`;
  }

  didInsertElement() {
    if (!this.clickOutsideToClose) {
      return;
    }
    this.makeOverlayClickableOnIOS();

    this.handleClick = ({ target }) => {
      // if the click has already resulted in the target
      // being removed or hidden, do nothing
      if (target.offsetWidth === 0 && target.offsetHeight === 0) {
        return;
      }

      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      let modalSelector = '.ember-modal-dialog';
      if (this.stack) {
        modalSelector = '#' + this.stack + modalSelector;
      }

      // if the click is within the dialog, do nothing
      let modalEl = document.querySelector(modalSelector);
      if (modalEl && modalEl.contains(target)) {
        return;
      }
      if (this.onClose) {
        this.onClose();
      }
    };

    const registerClick = () =>
      document.addEventListener('click', this.handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);

    if (this.isIOS) {
      const registerTouch = () =>
        document.addEventListener('touchend', this.handleClick);
      setTimeout(registerTouch);
    }
    super.didInsertElement(...arguments);
  }

  willDestroyElement() {
    document.removeEventListener('click', this.handleClick);
    if (this.isIOS) {
      document.removeEventListener('touchend', this.handleClick);
    }
    super.willDestroyElement(...arguments);
  }

  @computed
  get isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  makeOverlayClickableOnIOS() {
    if (this.isIOS) {
      let overlayEl = document.querySelector('div[data-emd-overlay]');
      if (overlayEl) {
        overlayEl.style.cursor = 'pointer';
      }
    }
  }
}
