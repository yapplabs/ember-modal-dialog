import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingCustomStyles: false,
  isShowingAlignmentTarget: false,
  alignmentTargetDirection: 'right',
  customContainerClassNames: 'custom-styles-modal-container',
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
    toggleAlignmentTarget: function(){
      if (this.get('isShowingAlignmentTarget')) {
        switch(this.alignmentTargetDirection) {
          case 'right':
            this.set('alignmentTargetDirection', 'bottom');
            break;
          case 'bottom':
            this.set('alignmentTargetDirection', 'left');
            break;
          case 'left':
            this.set('alignmentTargetDirection', 'top');
            break;
          case 'top':
            this.toggleProperty('isShowingAlignmentTarget');
            this.set('alignmentTargetDirection', 'right');
            break;
        }
      } else {
        this.toggleProperty('isShowingAlignmentTarget');
      }
    },
    closeAlignmentTarget: function() {
      this.set('isShowingAlignmentTarget', false);
      this.set('alignmentTargetDirection', 'right');
    }
  }
});
