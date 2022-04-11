import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TetheredController extends Controller {
  @tracked isShowingTargetSelector = false;
  @tracked isShowingTargetElement = false;
  @tracked isShowingElementCenterModal = false;
  @tracked exampleTargetAttachment = 'middle left';
  @tracked exampleAttachment = 'middle right';

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
      this.exampleTargetAttachment = newTargetAttachment;
      this.exampleAttachment = newAttachment;
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.isShowingTargetSelector = !this.isShowingTargetSelector;
  }

  @action
  toggleTargetElement() {
    if (this.isShowingTargetElement) {
      let newTargetAttachment = this.nextAttachment(
        this.exampleTargetAttachment
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      this.exampleTargetAttachment = newTargetAttachment;
      this.exampleAttachment = newAttachment;
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.isShowingTargetElement = !this.isShowingTargetElement;
  }

  @action
  closeTargetSelector() {
    this.isShowingTargetSelector = false;
    this.exampleTargetAttachment = 'middle left';
    this.exampleAttachment = 'middle right';
  }

  @action
  closeTargetElement() {
    this.isShowingTargetElement = false;
    this.exampleTargetAttachment = 'middle left';
    this.exampleAttachment = 'middle right';
  }
}
