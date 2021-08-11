import { getDestinationElementIdFromConfig } from 'ember-modal-dialog/utils/config-utils';

let hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementOrId, id) {
  if (!hasDOM) {
    return;
  }

  let rootEl = rootElementOrId.appendChild
    ? rootElementOrId
    : document.querySelector(rootElementOrId);

  if (rootEl.querySelector('#' + id)) {
    return;
  }

  let modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

export default function (instance) {
  let config = instance.resolveRegistration('config:environment');
  let modalContainerElId = getDestinationElementIdFromConfig(config);

  appendContainerElement(instance.rootElement, modalContainerElId);
}
