import Ember from 'ember';

var computed = Ember.computed;
var observer = Ember.observer;
var on = Ember.on;

export default Ember.Component.extend({

  alignmentTarget: null, // element selector, element, or Ember View passed in
  alignment: null, // passed in; valid values are:
                   // left, right, top, bottom (relative to alignmentTarget)
                   // center (relative to container)
  isPositioned: computed('alignment', 'alignmentTarget', function(){
    if (this.get('alignmentTarget') && this.get('alignment')) {
      return true;
    }
    return this.get('alignment') === 'center';
  }),

  didGetPositioned: observer('isPositioned', on('didInsertElement', function() {
    if (this._state !== 'inDOM') { return; }

    if (this.get('isPositioned')) {
      this.updateAlignment();
    } else {
      this.$().css('left', '').css('top', '');
    }
  })),

  //TODO: Add resize and scroll handlers
  updateAlignment: function() {
    var alignmentTarget = this.get('alignmentTarget');
    if (Ember.typeOf(alignmentTarget) === 'string') {
      let alignmentTargetSelector = alignmentTarget;
      alignmentTarget = Ember.$(alignmentTargetSelector)[0];
      Ember.assert(`No element found for modal-dialog's alignmentTarget selector '${alignmentTargetSelector}'.`, alignmentTarget);
    } else if (alignmentTarget && alignmentTarget.element) {
      alignmentTarget = alignmentTarget.element;
    }
    var $alignmentTarget = Ember.$(alignmentTarget);
    var originOffset = alignmentTarget && $alignmentTarget.offset();
    var alignment = this.get('alignment');

    var originOffsetTop;
    if (originOffset) {
      originOffsetTop = originOffset.top - Ember.$(window).scrollTop();
    }
    var elementWidth, elementHeight, targetWidth, targetHeight;
    elementWidth = this.$().outerWidth();
    switch (alignment) {
      case 'left':
        this.$().css('left', originOffset.left - elementWidth)
          .css('top', originOffsetTop);
        break;
      case 'right':
        targetWidth = $alignmentTarget.outerWidth();
        this.$().css('left', originOffset.left + targetWidth)
          .css('top', originOffsetTop);
        break;
      case 'bottom':
        targetWidth = $alignmentTarget.outerWidth();
        targetHeight = $alignmentTarget.outerHeight();
        this.$().css('left', (originOffset.left + targetWidth/2 - elementWidth/2))
          .css('top', originOffsetTop + targetHeight);
        break;
      case 'top':
        targetWidth = $alignmentTarget.outerWidth();
        elementHeight = this.$().outerHeight();
        this.$().css('left', (originOffset.left + targetWidth/2 - elementWidth/2))
          .css('top', originOffsetTop - elementHeight);
        break;
      case 'center':
        elementWidth = this.$().outerWidth();
        elementHeight = this.$().outerHeight();
        this.$().css('left', '50%')
          .css('top', '50%')
          .css('margin-left', elementWidth * -0.5)
          .css('margin-top', elementHeight * -0.5);
        break;
    }
  }
});
