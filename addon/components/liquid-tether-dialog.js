/* eslint-disable ember/no-computed-properties-in-native-classes */
import { layout as templateLayout } from '@ember-decorators/component';
import { computed, set } from '@ember/object';
import { dasherize } from '@ember/string';
import BasicDialog from './basic-dialog';
import layout from '../templates/components/liquid-tether-dialog';

@templateLayout(layout)
export default class LiquidTetherDialog extends BasicDialog {
  @computed('targetAttachment')
  get targetAttachmentClass() {
    let targetAttachment = this.targetAttachment || '';
    // Convert tether-styled values like 'middle right' to 'right'
    targetAttachment = targetAttachment.split(' ').slice(-1)[0];
    return `ember-modal-dialog-target-attachment-${dasherize(
      targetAttachment,
    )} emd-target-attachment-${dasherize(targetAttachment)}`;
  }

  targetAttachment = null;
  attachment = null;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    if (!this.attachment) {
      set(this, 'attachment', 'middle center');
    }
    if (!this.targetAttachment) {
      set(this, 'targetAttachment', 'middle center');
    }
  }

  @computed
  get tetherClassPrefix() {
    return 'liquid-tether';
  }

  set tetherClassPrefix(val) {
    if (val) {
      return val;
    }
    return 'liquid-tether';
  }

  hasOverlay = true;

  tetherTarget = null; // element, css selector, view instance, 'viewport', or 'scroll-handle'
  // offset - passed in
  // targetOffset - passed in
  // targetModifier - passed in
}
