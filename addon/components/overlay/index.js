import Component from '@glimmer/component';
import { isIOS } from '../../utils/config-utils';
import { htmlSafe } from '@ember/template';

export default class OverlayComponent extends Component {
  get cssClasses() {
    return htmlSafe(`emd-debug ${isIOS ? 'pointer-cursor' : ''}`);
  }
  handleClick = (event) => {
    this.args.onClickOverlay?.(event);
  };
}
