import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { codeSnippets } from '../utils/code-snippets/tethered-animatable';

export default class TetheredAnimatableController extends Controller {
  codeSnippets = codeSnippets;

  @tracked exampleTargetAttachment = 'middle left';
  @tracked exampleAttachment = 'middle right';
  @tracked isShowingSeparateStacksModal1 = false;
  @tracked isShowingSeparateStacksModal2 = false;
  @tracked isShowingSeparateStacksModal3 = false;

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

  @action closeSeparateStackModal1() {
    this.isShowingSeparateStacksModal1 = false;
  }

  @action closeSeparateStackModal2() {
    this.isShowingSeparateStacksModal2 = false;
  }

  @action closeSeparateStackModal3() {
    this.isShowingSeparateStacksModal3 = false;
  }

  @action openSeparateStackModal1() {
    this.isShowingSeparateStacksModal1 = true;
  }

  @action openSeparateStackModal2() {
    this.isShowingSeparateStacksModal2 = true;
  }

  @action openSeparateStackModal3() {
    this.isShowingSeparateStacksModal3 = true;
  }

  @action toggleTarget() {
    const newTargetAttachment = this.nextAttachment(
      this.exampleTargetAttachment,
    );
    const newAttachment = this.nextAttachment(this.exampleAttachment);

    this.exampleTargetAttachment = newTargetAttachment;
    this.exampleAttachment = newAttachment;
  }
}
