// BEGIN-SNIPPET subclass
import Component from 'ember-modal-dialog/components/modal-dialog';

export default Component.extend({
  translucentOverlay: true, // override default of false
  containerClass: 'my-cool-modal',
  destinationElementId: 'modal-overlays'
});
// END-SNIPPET
