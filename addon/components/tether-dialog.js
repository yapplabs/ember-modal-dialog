import Ember from 'ember';
import ModalDialog from './modal-dialog';
import layout from '../templates/components/tether-dialog';

const { dasherize } = Ember.String;
const { computed, get } = Ember;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

export default ModalDialog.extend({
  layout,

  targetAttachmentClass: computed('targetAttachment', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
  }),

  targetAttachment: 'middle center',
  attachment: 'middle center',
  hasOverlay: true,
  target: 'viewport', // element, css selector, view instance, 'viewport', or 'scroll-handle'

  mouseleaveToClose: false,

  // if `mouseleaveToClose`, cache this in didInsertElement so that each dialog has a unqiue listener namespace
  _eventListenerNameSpace: null,

  tetherClassPrefix: 'ember-tether',
  // offset - passed in
  // targetOffset - passed in
  // targetModifier - passed in

  makeOverlayClickableOnIOS: Ember.on('didInsertElement', function() {
    if (isIOS && get(this, 'hasOverlay')) {
      Ember.$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    if (this.get('mouseleaveToClose')) {
      this._eventListenerNameSpace = `ember-modal-dialog.${this._mouseLeaveEventId}`;

      Ember.$('.ember-modal-dialog').on(`mouseleave.${this._eventListenerNameSpace}`, (event) => {
        // DON'T close if the mouse is leaving the target and entering the target
        if (!event.relatedTarget || !Ember.$(event.relatedTarget).hasClass('ember-tether-target')) {
          this.send('close');
        }
      });
      Ember.$(this.get('target')).on(`mouseleave.${this._eventListenerNameSpace}`, (event) => {
        // DON'T close if the mouse is leaving the target and entering the dialog
        if (!event.relatedTarget || !Ember.$(event.relatedTarget).hasClass('ember-modal-dialog')) {
          this.send('close');
        }
      });

    }
  },

  willDestroyElement() {
    this._super(...arguments);

    Ember.$('.ember-modal-dialog').off(`mouseleave.${this._eventListenerNameSpace}`);
    Ember.$(this.get('target')).off(`mouseleave.${this._eventListenerNameSpace}`);
  }
});
