import ModalDialogComponent from 'ember-modal-dialog/components/modal-dialog';

export default class MyCoolModalDialogTwo extends ModalDialogComponent {
  translucentOverlay = true; // override default of false
  containerClassNames = 'my-cool-modal my-cool-modal-2';
  destinationElementId = 'modal-overlays';
}
