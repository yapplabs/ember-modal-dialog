import Ember from 'ember';
import BasicDialog from './basic-dialog';
import layout from '../templates/components/liquid-tether-dialog';

const { dasherize } = Ember.String;
const { computed } = Ember;

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
    if (!this.get('tetherClassPrefix')) {
      this.set('tetherClassPrefix', 'liquid-tether');
    }
  },
  hasOverlay: true,
  tetherTarget: null, // element, css selector, view instance, 'viewport', or 'scroll-handle'
  tetherClassPrefix: null, // passed in
  // offset - passed in
  // targetOffset - passed in
  // targetModifier - passed in
});
