export default {
  after: 'add-modals-container',
  name: 'custom-modals',
  initialize() {
    let App = arguments[1] || arguments[0];
    let customModals = ['my-cool-modal-dialog'];
    customModals.forEach(function(customModal) {
      App.inject(`component:${customModal}`,
                         'destinationElementId',
                         'config:modals-container-id');
    });
  }
};
