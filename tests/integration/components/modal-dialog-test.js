import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// Stub the modal dialog service and set the destinationElementId prop
const modalDialogServiceStub = Ember.Service.extend({
  destinationElementId: 'test-modal-destination'
});

moduleForComponent('modal-dialog', 'Integration | Component | modal dialog', {
  integration: true,

  beforeEach() {
    this.register('service:modal-dialog', modalDialogServiceStub);
    this.inject.service('modal-dialog', { as: 'modalService' });
  }
});

test('has aria role', function(assert) {
  let modalDialogAriaRole;

  this.render(hbs`
    <div id="test-modal-destination"></div>
    {{#if isShowingModalDialog}}
      {{#modal-dialog
        close='toggleBasic'
        targetAttachment='none'}}
        <h1>Stop! Modal Time!</h1>
        <p>Should have ARIA Role!</p>
        <button {{action 'toggleBasic'}}>Close</button>
      {{/modal-dialog}}
    {{/if}}
  `);

  this.set('isShowingModalDialog', true);

  modalDialogAriaRole = this.$('.ember-modal-dialog').attr('role');

  assert.ok(modalDialogAriaRole);
  assert.equal(modalDialogAriaRole, 'dialog');
});
