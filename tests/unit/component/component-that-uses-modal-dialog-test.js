import { test, moduleForComponent } from 'ember-qunit';
/* global Ember */

moduleForComponent('component-that-uses-modal-dialog', {
  /*
  * Setting up the container for the modal dialog to wormhole into and
  * injecting the id of that element into the modal-dialog component
  */
  beforeEach: function(){
    var modalContainerEl = document.createElement("div");
    modalContainerEl.id = 'modal-overlays';
    var rootEl = document.querySelector("#ember-testing");
    rootEl.appendChild(modalContainerEl);
    this.container.register('config:modals-container-id', 'modal-overlays', {instantiate: false});
    this.container.injection('component:modal-dialog', 'destinationElementId', 'config:modals-container-id');
  },
  needs: [
    'component:modal-dialog',
    'component:ember-modal-dialog-positioned-container',
    'component:ember-wormhole'
  ]
});

test("it doesn't show component on start", function(assert){
  assert.expect(1);

  var component = this.subject();
  // render the component
  this.$();

  // cannot use this.$ because the modal-dialog exists outside of the component
  assert.equal(Ember.$('.ember-modal-dialog').length, 0);
});

test('it shows component when open modal clicked', function(assert){
  assert.expect(1);

  var component = this.subject();

  this.$('button.open').click();

  // cannot use this.$ because the modal-dialog exists outside of the component
  assert.equal(Ember.$('.ember-modal-dialog').length, 1);
});
