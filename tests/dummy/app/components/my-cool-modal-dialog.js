// BEGIN-SNIPPET subclass
import classic from 'ember-classic-decorator';
import ModalDialogComponent from 'ember-modal-dialog/components/modal-dialog';

@classic
export default class MyCoolModalDialog extends ModalDialogComponent {
  translucentOverlay = true; // override default of false
  containerClassNames = ['my-cool-modal'];
  destinationElementId = 'modal-overlays';
}
// END-SNIPPET
