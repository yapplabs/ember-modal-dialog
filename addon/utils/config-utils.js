import { getOwner } from '@ember/application';

export function getDestinationElementIdFromConfig(config) {
  // if (config.environment === 'test') {
  //   return 'ember-testing';
  // }
  let modalContainerId =
    config['ember-modal-dialog'] &&
    config['ember-modal-dialog'].modalRootElementId;
  modalContainerId = modalContainerId || 'modal-overlays';
  return modalContainerId;
}

export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

export function clickHandlerDelay(component) {
  let ENV = getOwner(component).resolveRegistration('config:environment');
  if (ENV.environment === 'test') {
    return 0;
  }
  return 300;
}
