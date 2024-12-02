import ModalDialogComponent from 'ember-modal-dialog/components/modal-dialog';

export default class MyCoolModalDialog extends ModalDialogComponent {
  translucentOverlay = true; // override default of false
  containerClassNames = ['my-cool-modal'];
  destinationElementId = 'modal-overlays';
}
