/*globals document*/
export default function(container, application){
  var rootEl = document.querySelector(application.rootElement);
  var modalContainerEl = document.createElement('div');
  var emberModalDialog = application.emberModalDialog || {};
  var modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';
  modalContainerEl.id = modalContainerElId;
  rootEl.appendChild(modalContainerEl);

  application.register('config:modals-container-id',
                       modalContainerElId,
                       { instantiate: false });

  application.inject('service:modal-dialog',
                     'destinationElementId',
                     'config:modals-container-id');
}
