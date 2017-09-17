import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import BasicDialog from './basic-dialog';
import layout from '../templates/components/liquid-tether-dialog';

export default BasicDialog.extend({
  layout,

  targetAttachmentClass: computed('targetAttachment', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
  }),

  targetAttachment: null,
  attachment: null,
  didReceiveAttrs() {
    this._super(...arguments);
    if (!this.get('attachment')) {
      this.set('attachment', 'middle center');
    }
    if (!this.get('targetAttachment')) {
      this.set('targetAttachment', 'middle center');
    }
  },
  tetherClassPrefix: computed({
    get() {
      return 'liquid-tether';
    }, set(key, val) {
      if (val) {
        return val;
      }
      return 'liquid-tether';
    }
  }),
  hasOverlay: true,
  tetherTarget: null, // element, css selector, view instance, 'viewport', or 'scroll-handle'
  // offset - passed in
  // targetOffset - passed in
  // targetModifier - passed in
});
