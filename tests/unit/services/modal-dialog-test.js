import { moduleFor, test } from 'ember-qunit';

moduleFor('service:modal-dialog', 'Unit | Service | modal dialog', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it reports ember-testing as the destinationElementId', function(assert) {
  let service = this.subject();
  assert.equal(service.get('destinationElementId'), 'ember-testing');
});
