/*globals document */
import Ember from 'ember';
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

export default function(container, application){
  const emberModalDialog = application.emberModalDialog || {};
  const modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';

  application.register('config:modals-container-id',
                       modalContainerElId,
                       { instantiate: false });

  application.inject('service:modal-dialog',
                     'destinationElementId',
                     'config:modals-container-id');

  var useEmberTether = application.MODAL_DIALOG_USE_TETHER;
  if (useEmberTether === undefined) {
    useEmberTether = Ember.isPresent(container.resolve('component:ember-tether'));
  }
  application.register('config:use-ember-tether',
                       useEmberTether,
                       { instantiate: false });

  application.inject('service:modal-dialog',
                     'useEmberTether',
                     'config:use-ember-tether');

  appendContainerElement(application.rootElement, modalContainerElId);
}
