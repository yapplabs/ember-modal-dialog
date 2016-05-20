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

export default function() {
  let application = arguments[1] || arguments[0];
  let emberModalDialog = application.emberModalDialog || {};
  let modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';

  application.register('config:modals-container-id',
                       modalContainerElId,
                       { instantiate: false });

  application.inject('service:modal-dialog',
                     'destinationElementId',
                     'config:modals-container-id');

  appendContainerElement(application.rootElement, modalContainerElId);
}
