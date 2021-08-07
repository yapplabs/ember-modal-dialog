import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/in-place-dialog';

@classic
@tagName('')
@templateLayout(layout)
export default class InPlaceDialog extends Component {
  containerClass = null; // passed in

  init(){
    super.init(...arguments);

    this.containerClassNames = ['ember-modal-dialog', 'ember-modal-dialog-in-place', 'emd-in-place']; // set this in a subclass definition
  }

  get containerClassNamesString() {
    return this.containerClassNames.join(' ');
  }
}
