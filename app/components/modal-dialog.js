import Ember from 'ember';

export default Ember.Component.extend({
  translucent: true,
  originView: null,
  isPositioned: Ember.computed.bool('originView'),
  alignmentToOrigin: 'left',
  positionElement: function() {
    if (this.get('_state') !== 'inDOM') { return; }

    if (!this.get('isPositioned')) {
      this.$('.ember-modal-panel').css('left', '').css('top', '');
      return;
    }

    var originView = this.get('originView');
    var alignmentToOrigin = this.get('alignmentToOrigin');
    var width, height, $originView, originOffset;
    switch (alignmentToOrigin) {
      case 'left':
        originOffset = originView.$().offset();
        this.$('.ember-modal-panel').css('left', originOffset.left).css('top', originOffset.top);
        break;
      case 'right':
        $originView = originView.$();
        originOffset = $originView.offset();
        width = $originView.outerWidth();
        this.$('.ember-modal-panel').css('left', originOffset.left + width).css('top', originOffset.top);
        break;
      case 'bottom':
        var $panel = this.$('.ember-modal-panel');
        $originView = originView.$();
        originOffset = $originView.offset();
        width = $originView.outerWidth();
        height = $originView.outerHeight();
        $panel.css({
          left: originOffset.left + width / 2 + $panel.width() / 2,
          top: originOffset.top + height
        });
        break;
      case 'center':
        var $panel = this.$('.ember-modal-panel');
        $originView = originView.$();
        originOffset = $originView.offset();
        width = $originView.outerWidth();
        height = $originView.outerHeight();
        $panel.css({
          left: originOffset.left + width / 2 - $panel.width() / 2,
          top: originOffset.top + height / 2 - $panel.height() / 2
        });
    }
  }.observes('isPositioned').on('didInsertElement'),
  actions: {
    close: function() {
      this.sendAction('close');
    }
  }
});

