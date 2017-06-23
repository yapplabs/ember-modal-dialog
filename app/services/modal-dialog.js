import Ember from 'ember';
import ENV from '../config/environment';

const { computed, Service } = Ember;

function computedFromConfig(prop) {
  return computed(function(){
    return ENV['ember-modal-dialog'] && ENV['ember-modal-dialog'][prop];
  });
}

export default Service.extend({
  hasEmberTether: computedFromConfig('hasEmberTether'),
  hasLiquidWormhole: computedFromConfig('hasLiquidWormhole'),
  hasLiquidTether: computedFromConfig('hasLiquidTether'),
  destinationElementId: computed(function() {
    /*
      everywhere except test, this property will be overwritten
      by the initializer that appends the modal container div
      to the DOM. because initializers don't run in unit/integration
      tests, this is a nice fallback.
    */
    if (ENV.environment === 'test') {
      return 'ember-testing';
    }
  })
});
