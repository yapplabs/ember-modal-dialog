import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-dialog', 'Integration | Component | modal dialog', {
  integration: true,

  beforeEach() {
    let modalDialogService = this.container.lookup('service:modal-dialog');
    modalDialogService.set('destinationElementId', 'test-modal-destination');
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

  assert.equal(modalDialogAriaRole, 'dialog');
});
