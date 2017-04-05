/*globals document */
let hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementId, id) {
  if (!hasDOM) {
    return;
  }

  if (document.getElementById(id)) {
    return;
  }

  let rootEl = document.querySelector(rootElementId);
  let modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

export default function(App) {
  let emberModalDialog = App.emberModalDialog || {};
  let modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';

  App.register('config:modals-container-id',
               modalContainerElId,
               { instantiate: false });

  App.inject('service:modal-dialog',
             'destinationElementId',
             'config:modals-container-id');

  appendContainerElement(App.rootElement, modalContainerElId);
}
