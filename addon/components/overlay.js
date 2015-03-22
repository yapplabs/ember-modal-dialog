import Ember from 'ember';
import template from '../templates/components/overlay';

var computed = Ember.computed;

export default Ember.Component.extend({
  layout: template,
  tagName: '',
  overlayClassNamesString: computed('overlayClassNames.[]', 'translucent', function() {
    var overlayClassNames = this.get('overlayClassNames');
    var cns = [];
    if (this.get('translucent')) {
      cns.push('translucent');
    }
    if (overlayClassNames) {
      cns.push(this.get('overlayClassNames').join(' '));
    }
    if (cns) {
      return cns.join(' ');
    }
  }),

  translucent: false,

  containerElementId: null, // injected via initializer, defaults to 'modal-overlays'
  containerElement: computed('containerElementId', function() {
    return document.getElementById(this.get('containerElementId'));
  }),

  render: function(buffer) {
    var containerElement = this.get('containerElement');
    this._morph = buffer.dom.appendMorph(containerElement);
    this._super.apply(this, arguments);
  },

  willClearRender: function() {
    var morph = this._morph;
    Ember.run.schedule('render', morph, morph.destroy);
    this._super.apply(this);
  },

  actions: {
    close: function() {
      this.sendAction('close');
    }
  }
});
