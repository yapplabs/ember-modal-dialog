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

var initialize = function(container, application){
  const emberModalDialog = application.emberModalDialog || {};
  const modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';

  application.register('config:modals-container-id',
                       modalContainerElId,
                       { instantiate: false });

  application.inject('service:modal-dialog',
                     'destinationElementId',
                     'config:modals-container-id');

  // const service = application.__container__.lookup('service:modal-dialog');
  if (!Ember.testing) {
    // This logic allows the tests to stub the modalDialogService with
    // hasEmberTether values of true or false while the dummy app
    // will always get a hasEmberTether value of true
    application.register('config:has-ember-tether',
                         true,
                         { instantiate: false });

    application.inject('service:modal-dialog',
                       'hasEmberTether',
                       'config:has-ember-tether');
  }

  appendContainerElement(application.rootElement, modalContainerElId);
};

export default {
  name: 'add-modals-container',
  initialize: initialize
};
