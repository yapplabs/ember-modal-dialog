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

export default function(container, application) {
  const emberModalDialog = application.emberModalDialog || {};
  const modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';
  const modalDefaultStructure = emberModalDialog.defaultStructure || 'simple';

  application.register('config:modals-container-id',
                       modalContainerElId,
                       { instantiate: false });
  application.register('config:modals-default-structure',
                       modalDefaultStructure,
                       { instantiate: false });

  application.inject('service:modal-dialog',
                     'destinationElementId',
                     'config:modals-container-id');
  application.inject('service:modal-dialog',
                     'defaultStructure',
                     'config:modals-default-structure');

  appendContainerElement(application.rootElement, modalContainerElId);
}
