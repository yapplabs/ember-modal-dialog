import Ember from 'ember';

export default Ember.Component.extend({
  translucent: true,
  originView: null,
  isPositioned: Ember.computed.bool('originView'),
  alignmentToOrigin: 'left',
  positionElement: function() {
    if (this.get('_state') !== 'inDOM') { return; }

    var $panel = this.$('.ember-modal-panel');

    if (!this.get('isPositioned')) {
      $panel.css('left', '').css('top', '');
      return;
    }

    var $originView = this.get('originView').$();
    var originOffset = $originView.offset();
    var alignmentToOrigin = this.get('alignmentToOrigin');
    var leftOffset, topOffset;

    switch (alignmentToOrigin) {
      case 'left':
        leftOffset = originOffset.left;
        topOffset = originOffset.top;

        break;
      case 'right':
        leftOffset = originOffset.left + $originView.outerWidth();
        topOffset = originOffset.top;

        break;
      case 'bottom':
        leftOffset = originOffset.left + $originView.outerWidth() / 2 + $panel.width() / 2;
        topOffset = originOffset.top + $originView.outerHeight();

        break;
      case 'center':
        leftOffset = originOffset.left + $originView.outerWidth() / 2 - $panel.width() / 2;
        topOffset = originOffset.top + $originView.outerHeight() / 2 - $panel.height() / 2;

        break;
      default:
        leftOffset = originOffset.left;
        topOffset = originOffset.top;

        break;
    }

    $panel.css('left', leftOffset)
          .css('top', topOffset);

  }.observes('isPositioned').on('didInsertElement'),
  actions: {
    close: function() {
      this.sendAction('close');
    }
  }
});

