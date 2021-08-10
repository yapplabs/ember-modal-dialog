import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import BasicDialog from './basic-dialog';
import layout from '../templates/components/liquid-dialog';

@classic
@templateLayout(layout)
export default class LiquidDialog extends BasicDialog {
  hasOverlay = true;
  variantWrapperClass = 'emd-animatable';

  init() {
    super.init(...arguments);

    this.containerClassNames?.push('liquid-dialog');
  }
}
