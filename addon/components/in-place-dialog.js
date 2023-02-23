import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/in-place-dialog';

@tagName('')
@templateLayout(layout)
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
