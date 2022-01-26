import { getDestinationElementIdFromConfig } from 'ember-modal-dialog/utils/config-utils';
import { getOwner } from '@ember/application';

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

  // As there is only a single `Router` across the whole app, which is owned
  // by the root `Application`, this reliably finds the root `Application`
  // from an `Application` or `Engine`.
  // eslint-disable-next-line ember/no-private-routing-service
  let app = getOwner(instance.lookup('router:main'));

  appendContainerElement(app.rootElement, modalContainerElId);
}
