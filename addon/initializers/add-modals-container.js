import Application, { getOwner } from '@ember/application';
import Engine from '@ember/engine';
import { assert } from '@ember/debug'
import Ember from 'ember';

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

export default function(AppOrEngine) {
  let App;
  if (AppOrEngine instanceof Application) {
    App = AppOrEngine;
  } else if (AppOrEngine instanceof Engine) {
    // As there is only a single `Router` across the whole app, which is owned
    // by the root `Application`, this reliably finds the root `Application`
    // from an`Engine`.
    // eslint-disable-next-line ember/no-private-routing-service
    App = getOwner(getOwner(AppOrEngine).lookup('router:main'));
  } else {
    assert(`Could not find the root Application for '${AppOrEngine}'.`);
  }

  let emberModalDialog = AppOrEngine.emberModalDialog ?? App.emberModalDialog ?? {};
  let modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';

  AppOrEngine.register(
    'config:modals-container-id',
    Ember.testing ? 'ember-testing' : modalContainerElId,
    { instantiate: false }
  );

  AppOrEngine.inject(
    'service:modal-dialog',
    'destinationElementId',
    'config:modals-container-id'
  );

  appendContainerElement(App.rootElement, modalContainerElId);
}
