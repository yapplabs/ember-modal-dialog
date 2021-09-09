import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/in-place-dialog';

@tagName('')
@templateLayout(layout)
export default class InPlaceDialog extends Component {
  containerClass = null; // passed in

  constructor() {
    super(...arguments);

    this.containerClassNames = [
      'ember-modal-dialog',
      'ember-modal-dialog-in-place',
      'emd-in-place',
    ]; // set this in a subclass definition
  }

  get containerClassNamesString() {
    return this.containerClassNames.join(' ');
  }
}
