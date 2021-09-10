import { action, set } from '@ember/object';
import Controller from '@ember/controller';

export default class TetheredController extends Controller {
  isShowingTargetSelector = false;
  isShowingTargetElement = false;
  isShowingElementCenterModal = false;
  exampleTargetAttachment = 'middle left';
  exampleAttachment = 'middle right';

  nextAttachment(val) {
    switch (val) {
      case 'middle right':
        return 'bottom center';
      case 'bottom center':
        return 'middle left';
      case 'middle left':
        return 'top center';
      case 'top center':
        return 'middle right';
    }
    return false;
  }

  @action
  toggleTargetSelector() {
    if (this.isShowingTargetSelector) {
      let newTargetAttachment = this.nextAttachment(
        this.exampleTargetAttachment
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      set(this, 'exampleTargetAttachment', newTargetAttachment);
      set(this, 'exampleAttachment', newAttachment);
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.toggleProperty('isShowingTargetSelector');
  }

  @action
  toggleTargetElement() {
    if (this.isShowingTargetElement) {
      let newTargetAttachment = this.nextAttachment(
        this.exampleTargetAttachment
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      set(this, 'exampleTargetAttachment', newTargetAttachment);
      set(this, 'exampleAttachment', newAttachment);
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.toggleProperty('isShowingTargetElement');
  }

  @action
  closeTargetSelector() {
    set(this, 'isShowingTargetSelector', false);
    set(this, 'exampleTargetAttachment', 'middle left');
    set(this, 'exampleAttachment', 'middle right');
  }

  @action
  closeTargetElement() {
    set(this, 'isShowingTargetElement', false);
    set(this, 'exampleTargetAttachment', 'middle left');
    set(this, 'exampleAttachment', 'middle right');
  }
}
