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

  let modalContainerElSelector;

  if (emberModalDialog.modalRootElementSelector) {
    modalContainerElSelector = emberModalDialog.modalRootElementSelector;
  } else  {
    let modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';
    modalContainerElSelector = `#${modalContainerElId}`;
    appendContainerElement(App.rootElement, modalContainerElId);
  }

  App.register('config:modals-container-selector',
               modalContainerElSelector,
               { instantiate: false });

  App.inject('service:modal-dialog',
             'destinationElementSelector',
             'config:modals-container-selector');
}
