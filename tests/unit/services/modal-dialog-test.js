import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | modal dialog', function (hooks) {
  setupTest(hooks);

  test('it knows the destinationElementId', function (assert) {
    let service = this.owner.lookup('service:modal-dialog');
    assert.strictEqual(service.get('destinationElementId'), 'modal-overlays');
  });
});
