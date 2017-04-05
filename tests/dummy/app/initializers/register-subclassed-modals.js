export default {
  after: 'add-modals-container',
  name: 'custom-modals',
  initialize(App) {
    let customModals = ['my-cool-modal-dialog'];
    customModals.forEach(function(customModal) {
      App.inject(`component:${customModal}`,
                 'destinationElementId',
                 'config:modals-container-id');
    });
  }
};
