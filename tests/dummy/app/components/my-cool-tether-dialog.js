// BEGIN-SNIPPET subclass-tether-dialog-component
import TetherDialog from 'ember-modal-dialog/components/tether-dialog';

export default TetherDialog.extend({
  containerClassNames: 'my-cool-modal',
  clickOutsideToClose: true,
  hasOverlay: false
});
// END-SNIPPET
