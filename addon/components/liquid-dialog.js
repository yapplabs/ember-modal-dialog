import { layout as templateLayout } from '@ember-decorators/component';
import BasicDialog from './basic-dialog';
import layout from '../templates/components/liquid-dialog';

@templateLayout(layout)
export default class LiquidDialog extends BasicDialog {
  hasOverlay = true;
  variantWrapperClass = 'emd-animatable';

  constructor() {
    super(...arguments);

    this.containerClassNames?.push('liquid-dialog');
  }
}
