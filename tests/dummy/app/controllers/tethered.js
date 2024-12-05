import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

import { codeSnippets } from '../utils/code-snippets/tethered';

export default class TetheredController extends Controller {
  codeSnippets = codeSnippets;

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

  @action toggleTarget() {
    const newTargetAttachment = this.nextAttachment(
      this.exampleTargetAttachment,
    );
    const newAttachment = this.nextAttachment(this.exampleAttachment);

    this.exampleTargetAttachment = newTargetAttachment;
    this.exampleAttachment = newAttachment;
  }
}
