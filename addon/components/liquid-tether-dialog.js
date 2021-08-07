import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import BasicDialog from './basic-dialog';
import layout from '../templates/components/liquid-tether-dialog';

@classic
@templateLayout(layout)
export default class LiquidTetherDialog extends BasicDialog {
  @computed('targetAttachment')
  get targetAttachmentClass() {
    let targetAttachment = this.targetAttachment || '';
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
  }

  targetAttachment = null;
  attachment = null;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    if (!this.attachment) {
      this.set('attachment', 'middle center');
    }
    if (!this.targetAttachment) {
      this.set('targetAttachment', 'middle center');
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
