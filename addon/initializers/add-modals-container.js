/*globals document */
const hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementId, id) {
  if (!hasDOM) {
    return;
  }

  const rootEl = document.querySelector(rootElementId);
  const modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

export default function() {
  const application = arguments[1] || arguments[0];
  const emberModalDialog = application.emberModalDialog || {};
  const modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';

  application.register('config:modals-container-id',
                       modalContainerElId,
                       { instantiate: false });

  application.inject('service:modal-dialog',
                     'destinationElementId',
                     'config:modals-container-id');

  appendContainerElement(application.rootElement, modalContainerElId);
}
