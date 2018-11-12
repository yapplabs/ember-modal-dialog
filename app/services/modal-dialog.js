import { computed } from '@ember/object';
import Service from '@ember/service';
import ENV from '../config/environment';

function computedFromConfig(prop) {
  return computed(function(){
    return ENV['ember-modal-dialog'] && ENV['ember-modal-dialog'][prop];
  });
}

export default Service.extend({
  hasEmberTether: computedFromConfig('hasEmberTether'),
  hasLiquidWormhole: computedFromConfig('hasLiquidWormhole'),
  hasLiquidTether: computedFromConfig('hasLiquidTether'),
  destinationElementId: null, // injected by initializer
});
