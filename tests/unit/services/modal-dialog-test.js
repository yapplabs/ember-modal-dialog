import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | modal dialog', function(hooks) {
  setupTest(hooks);

  test('it reports ember-testing as the destinationElementId', function(assert) {
    let service = this.owner.lookup('service:modal-dialog');
    assert.equal(service.get('destinationElementId'), 'ember-testing');
  });
});
