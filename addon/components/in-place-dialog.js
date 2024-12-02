import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@tagName('')
export default class InPlaceDialog extends Component {
  get containerClassNamesString() {
    const addonClassNamesString = [
      'ember-modal-dialog',
      'ember-modal-dialog-in-place',
      'emd-in-place',
    ].join(' ');

    const containerClassNamesString =
      (this.containerClassNames?.join && this.containerClassNames?.join(' ')) ||
      this.containerClassNames ||
      '';

    return `${addonClassNamesString} ${containerClassNamesString}`;
  }
}
