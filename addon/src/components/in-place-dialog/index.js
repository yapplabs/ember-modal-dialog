import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@tagName('')
export default class InPlaceDialog extends Component {
  containerClass = null; // passed in

  init() {
    super.init(...arguments);

    this.containerClassNames = [
      'ember-modal-dialog',
      'ember-modal-dialog-in-place',
      'emd-in-place',
    ]; // set this in a subclass definition
  }

  get containerClassNamesString() {
    return (
      (this.containerClassNames?.join && this.containerClassNames?.join(' ')) ||
      this.containerClassNames ||
      ''
    );
  }
}
