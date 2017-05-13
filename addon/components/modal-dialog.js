import Ember from 'ember';
import layout from '../templates/components/modal-dialog';
const { computed, inject } = Ember;
const { dasherize } = Ember.String;

export default Ember.Component.extend({
  tagName: '',
  layout,
  modalService: inject.service('modal-dialog'),
  destinationElementId: computed.oneWay('modalService.destinationElementId'),
  modalDialogComponentName: computed('renderInPlace', 'animatable', 'tetherTarget', 'hasLiquidTether', function(){
    if (this.get('renderInPlace')) {
      return 'ember-modal-dialog/-in-place-dialog';
    } else if (this.get('tetherTarget') && this.get('hasLiquidTether') && this.get('animatable')) {
      return 'ember-modal-dialog/-liquid-tether-dialog';
    } else if (this.get('tetherTarget')) {
      return 'ember-modal-dialog/-tether-dialog';
    } else if (this.get('animatable')) {
      return 'ember-modal-dialog/-liquid-dialog';
    }
    return 'ember-modal-dialog/-basic-dialog';
  }),
  hasOverlay: true,
  translucentOverlay: false,
  clickOutsideToClose: false,
  renderInPlace: false,
  tetherTarget: null,
  targetAttachment: null,
  animatable: computed.oneWay('modalService.hasLiquidWormhole'),
  hasLiquidTether: computed.readOnly('modalService.hasLiquidTether'),
  attachmentClass: computed('attachment', function() {
    let attachment = this.get('attachment') || '';
    return attachment.split(' ').map((attachmentPart) => {
      return `emd-attachment-${dasherize(attachmentPart)}`;
    }).join(' ');
  }),
  actions: {
    onClose() {
      this.sendAction('onClose');
    },
    onClickOverlay() {
      if (this.get('onClickOverlay')) {
        this.sendAction('onClickOverlay');
      } else {
        this.sendAction('onClose');
      }
    }
  }
});
