import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed, set } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import layout from '../templates/components/basic-dialog';
import { dasherize } from '@ember/string';
import { isIOS, clickHandlerDelay } from '../utils/config-utils';

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
      set(this, 'destinationElementId', this.modalService.destinationElementId);
    }
  }

  variantWrapperClass = 'emd-static';

  @computed(
    'attachmentClass',
    'containerClass',
    'containerClassNames.{[],join}',
    'targetAttachmentClass'
  )
  get containerClassNamesString() {
    let classNames =
      (this.containerClassNames?.join && this.containerClassNames?.join(' ')) ||
      this.containerClassNames;
    return [
      'ember-modal-dialog',
      classNames,
      this.targetAttachmentClass,
      this.attachmentClass,
      this.containerClass,
    ]
      .filter((className) => !isEmpty(className))
      .join(' ');
  }

  @computed('overlayClass', 'overlayClassNames.{[],join}', 'translucentOverlay')
  get overlayClassNamesString() {
    let classNames =
      (this.overlayClassNames?.join && this.overlayClassNames?.join(' ')) ||
      this.overlayClassNames;
    return [
      'ember-modal-overlay',
      classNames,
      this.translucentOverlay ? 'translucent' : null,
      this.overlayClass,
    ]
      .filter((className) => !isEmpty(className))
      .join(' ');
  }

  @computed(
    'targetAttachmentClass',
    'variantWrapperClass',
    'wrapperClass',
    'wrapperClassNames.{[],join}'
  )
  get wrapperClassNamesString() {
    let classNames =
      (this.wrapperClassNames?.join && this.wrapperClassNames?.join(' ')) ||
      this.wrapperClassNames;
    return [
      'ember-modal-wrapper',
      classNames,
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

    const registerDelay = clickHandlerDelay(this);

    const registerClick = () =>
      document.addEventListener('click', this.handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick, registerDelay);

    if (isIOS) {
      const registerTouch = () =>
        document.addEventListener('touchend', this.handleClick);
      setTimeout(registerTouch, registerDelay);
    }
    super.didInsertElement(...arguments);
  }

  willDestroyElement() {
    document.removeEventListener('click', this.handleClick);
    if (isIOS) {
      document.removeEventListener('touchend', this.handleClick);
    }

    super.willDestroyElement(...arguments);
  }
}
