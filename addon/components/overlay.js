import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

import { isIOS } from '../utils/config-utils';

export default class OverlayComponent extends Component {
  get cssClasses() {
    return htmlSafe(`emd-debug ${isIOS ? 'pointer-cursor' : ''}`);
  }
  handleClick = (event) => {
    this.args.onClickOverlay?.(event);
  };
}
