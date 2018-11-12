/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import BasicDialog from './basic-dialog';
import layout from '../templates/components/liquid-dialog';

export default BasicDialog.extend({
  layout,
  hasOverlay: true,
  containerClassNames: ['liquid-dialog'],
  variantWrapperClass: 'emd-animatable'
});
