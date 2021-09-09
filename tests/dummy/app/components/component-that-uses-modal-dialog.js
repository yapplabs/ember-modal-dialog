import Component from '@ember/component';
import { action } from '@ember/object';

export default class ComponentThatUsesModalDialog extends Component {
  isShowingModalDialog = false;

  @action
  openModalDialog() {
    this.set('isShowingModalDialog', true);
  }

  @action
  closeModalDialog() {
    this.set('isShowingModalDialog', false);
  }
}
