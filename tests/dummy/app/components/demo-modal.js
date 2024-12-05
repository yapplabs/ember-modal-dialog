import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class DemoModal extends Component {
  @tracked isModalOpen = false;

  @action closeModal() {
    this.isModalOpen = false;

    this.args.onClose?.();
  }

  @action openModal() {
    this.isModalOpen = true;

    this.args.onOpen?.();
  }
}
