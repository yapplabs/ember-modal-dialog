import { layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import BasicDialog from './basic-dialog';
import layout from '../templates/components/tether-dialog';

@templateLayout(layout)
export default class TetherDialog extends BasicDialog {
  constructor() {
    super(...arguments);
    this._ensureAttachments();
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

  targetAttachment = null;
  attachment = null;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    this._ensureAttachments();
  }

  tetherTarget = null; // element, css selector, view instance, 'viewport', or 'scroll-handle'

  @computed
  get tetherClassPrefix() {
    return 'ember-tether';
  }

  set tetherClassPrefix(val) {
    if (val) {
      return val;
    }
    return 'ember-tether';
  }

  // offset - passed in
  // targetOffset - passed in
  // targetModifier - passed in
  _ensureAttachments() {
    if (!this.attachment) {
      this.set('attachment', 'middle center');
    }
    if (!this.targetAttachment) {
      this.set('targetAttachment', 'middle center');
    }
  }
}
