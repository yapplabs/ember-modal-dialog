// BEGIN-SNIPPET subclass-modal-dialog-component
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  translucentOverlay: true, // override default of false
  containerClassNames: 'my-cool-modal',
  destinationElementId: 'modal-overlays'
});
// END-SNIPPET
