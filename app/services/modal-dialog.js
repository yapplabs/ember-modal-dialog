import Ember from 'ember';
import Service from 'ember-modal-dialog/services/modal-dialog';
import ENV from '../config/environment';

const {
  computed
} = Ember;

export default Service.extend({
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
