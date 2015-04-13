import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingCustomStyles: false,
  isShowingAlignmentTarget: false,
  alignmentTargetDirection: 'right',
  customContainerClassNames: 'custom-styles-modal-container',
  nextAlignmentTargetDirection: function(){
    switch(this.alignmentTargetDirection) {
      case 'right':
        return 'bottom';
      case 'bottom':
        return 'left';
      case 'left':
        return 'top';
      case 'top':
        return 'right';
    }
    return false;
  },
  actions: {
    toggleBasic: function(){
      this.toggleProperty('isShowingBasic');
    },
    toggleTranslucent: function(){
      this.toggleProperty('isShowingTranslucent');
    },
    toggleCustomStyles: function(){
      this.toggleProperty('isShowingCustomStyles');
    },
    toggleAlignmentTargetSelector: function(){
      if (this.get('isShowingAlignmentTargetSelector')) {
        var newAlignment = this.nextAlignmentTargetDirection();
        this.set('alignmentTargetDirection', newAlignment);
        if (newAlignment !== 'right') {
          return;
        }
      }
      this.toggleProperty('isShowingAlignmentTargetSelector');
    },
    toggleAlignmentTargetView: function(){
      if (this.get('isShowingAlignmentTargetView')) {
        var newAlignment = this.nextAlignmentTargetDirection();
        this.set('alignmentTargetDirection', newAlignment);
        if (newAlignment !== 'right') {
          return;
        }
      }
      this.toggleProperty('isShowingAlignmentTargetView');
    },
    toggleAlignmentTargetElement: function(){
      if (this.get('isShowingAlignmentTargetElement')) {
        var newAlignment = this.nextAlignmentTargetDirection();
        this.set('alignmentTargetDirection', newAlignment);
        if (newAlignment !== 'right') {
          return;
        }
      }
      this.toggleProperty('isShowingAlignmentTargetElement');
    },
    toggleSubclassed: function(){
      this.toggleProperty('isShowingSubclassed');
    },
    closeAlignmentTargetSelector: function() {
      this.set('isShowingAlignmentTargetSelector', false);
      this.set('alignmentTargetDirection', 'right');
    },
    closeAlignmentTargetView: function() {
      this.set('isShowingAlignmentTargetView', false);
      this.set('alignmentTargetDirection', 'right');
    },
    closeAlignmentTargetElement: function() {
      this.set('isShowingAlignmentTargetElement', false);
      this.set('alignmentTargetDirection', 'right');
    }
  }
});
