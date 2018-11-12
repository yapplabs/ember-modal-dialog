/*globals document, Ember */
let hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementOrId, id) {
  if (!hasDOM) {
    return;
  }

  if (document.getElementById(id)) {
    return;
  }

  let rootEl = rootElementOrId.appendChild ? rootElementOrId : document.querySelector(rootElementOrId);
  let modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

export default function(App) {
  let emberModalDialog = App.emberModalDialog || {};
  let modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';

  App.register('config:modals-container-id',
               Ember.testing ? 'ember-testing' : modalContainerElId,
               { instantiate: false });

  App.inject('service:modal-dialog',
             'destinationElementId',
             'config:modals-container-id');

  appendContainerElement(App.rootElement, modalContainerElId);
}
