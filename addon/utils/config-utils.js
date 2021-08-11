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
