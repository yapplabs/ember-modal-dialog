/* eslint-disable ember/require-tagless-components */
/* eslint-disable ember/no-classic-components */
import Component from '@ember/component';
import { action, set } from '@ember/object';

export default class ComponentThatUsesModalDialog extends Component {
  isShowingModalDialog = false;

  @action
  openModalDialog() {
    set(this, 'isShowingModalDialog', true);
  }

  @action
  closeModalDialog() {
    set(this, 'isShowingModalDialog', false);
  }
}
