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

  getWrappedAlignmentElement: function() {
    var alignmentTarget = this.get('alignmentTarget');
    if (!alignmentTarget) { return null; }

    if (Ember.typeOf(alignmentTarget) === 'string') {
      let alignmentTargetSelector = alignmentTarget;
      let wrappedElement = Ember.$(alignmentTargetSelector).eq(0);
      Ember.assert(`No element found for modal-dialog's alignmentTarget selector '${alignmentTargetSelector}'.`, wrappedElement); // '
      return wrappedElement;
    }

    // passed an ember view or component
    if (alignmentTarget.element) {
      return Ember.$(alignmentTarget.element);
    }

    // passed an element directly
    return Ember.$(alignmentTarget);
  },

  //TODO: Add resize and scroll handlers
  updateAlignment: function() {
    var alignment = this.get('alignment');
    var alignmentMethod = 'align' + Ember.String.capitalize(alignment);
    var alignmentElement = this.getWrappedAlignmentElement();

    this[alignmentMethod](alignmentElement);
  },

  alignCenter: function() {
    var elementWidth = this.$().outerWidth();
    var elementHeight = this.$().outerHeight();

    this.$().css('left', '50%')
      .css('top', '50%')
      .css('margin-left', elementWidth * -0.5)
      .css('margin-top', elementHeight * -0.5);
  },

  alignLeft: function(alignmentElement) {
    Ember.assert('Left alignment requires a target', alignmentElement.length > 0);

    var elementWidth = this.$().outerWidth();
    var originOffset = alignmentElement.offset();
    var originOffsetTop = originOffset.top - Ember.$(window).scrollTop();

    this.$().css('left', originOffset.left - elementWidth)
      .css('top', originOffsetTop);
  },

  alignRight: function(alignmentElement) {
    Ember.assert('Right alignment requires a target', alignmentElement.length > 0);

    var targetWidth = alignmentElement.outerWidth();
    var originOffset = alignmentElement.offset();
    var originOffsetTop = originOffset.top - Ember.$(window).scrollTop();

    this.$().css('left', originOffset.left + targetWidth)
      .css('top', originOffsetTop);
  },

  alignTop: function(alignmentElement) {
    Ember.assert('Top alignment requires a target', alignmentElement.length > 0);

    var elementWidth = this.$().outerWidth();
    var elementHeight = this.$().outerHeight();
    var originOffset = alignmentElement.offset();
    var originOffsetTop = originOffset.top - Ember.$(window).scrollTop();
    var targetWidth = alignmentElement.outerWidth();

    this.$().css('left', (originOffset.left + targetWidth/2 - elementWidth/2))
      .css('top', originOffsetTop - elementHeight);
  },

  alignBottom: function(alignmentElement) {
    Ember.assert('Bottom alignment requires a target', alignmentElement.length > 0);

    var elementWidth = this.$().outerWidth();
    var originOffset = alignmentElement.offset();
    var originOffsetTop = originOffset.top - Ember.$(window).scrollTop();
    var targetWidth = alignmentElement.outerWidth();
    var targetHeight = alignmentElement.outerHeight();

    this.$().css('left', (originOffset.left + targetWidth/2 - elementWidth/2))
      .css('top', originOffsetTop + targetHeight);
  }
});
