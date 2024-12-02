import Component from '@ember/component';

export default class InPlaceDialog extends Component {
  tagName = '';

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
