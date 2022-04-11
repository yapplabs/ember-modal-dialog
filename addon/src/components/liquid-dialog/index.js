import BasicDialog from '../basic-dialog/index';

export default class LiquidDialog extends BasicDialog {
  hasOverlay = true;
  variantWrapperClass = 'emd-animatable';

  init() {
    super.init(...arguments);

    this.containerClassNames?.push('liquid-dialog');
  }
}
