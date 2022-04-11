import Service from '@ember/service';
import { getDestinationElementIdFromConfig } from 'ember-modal-dialog/utils/config-utils';
import { macroCondition, dependencySatisfies } from '@embroider/macros';
import { getOwner } from '@ember/application';

export default class extends Service {
  hasEmberTether = false;
  hasLiquidWormhole = false;
  hasLiquidTether = false;
  constructor() {
    super(...arguments);
    if (macroCondition(dependencySatisfies('ember-tether', '*'))) {
      this.hasEmberTether = true;
    }
    if (macroCondition(dependencySatisfies('liquid-wormhole', '*'))) {
      this.hasLiquidWormhole = true;
    }
    if (macroCondition(dependencySatisfies('liquid-wormhole', '*'))) {
      this.hasLiquidTether = true;
    }
  }
  get destinationElementId() {
    const ENV = getOwner(this).resolveRegistration('config:environment')
    return getDestinationElementIdFromConfig(ENV);
  }
}
