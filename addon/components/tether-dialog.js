import Ember from 'ember';
import ModalDialog from './modal-dialog';
import layout from '../templates/components/tether-dialog';

const { dasherize } = Ember.String;
const { computed, get } = Ember;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

export default ModalDialog.extend({
  layout: layout,

  targetAttachmentClass: computed('targetAttachment', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
  }),

  targetAttachment: 'middle center',
  attachment: 'middle center',
  targetModifier: 'visible',
  hasOverlay: true,

  tetherClassPrefix: 'ember-tether',
  // offset - passed in
  // targetOffset - passed in

  makeOverlayClickableOnIOS: Ember.on('didInsertElement', function() {
    if (isIOS && get(this, 'hasOverlay')) {
      Ember.$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
    }
  })

});
