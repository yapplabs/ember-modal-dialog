import BasicDialog from './basic-dialog';

export default class LiquidDialog extends BasicDialog {
  hasOverlay = true;
  variantWrapperClass = 'emd-animatable';

  init() {
    super.init(...arguments);

    this.containerClassNames?.push('liquid-dialog');
  }
}
