import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { isIOS, clickHandlerDelay } from '../utils/config-utils';
import layout from '../templates/components/overlay';

@tagName('')
@templateLayout(layout)
export default class OverlayComponent extends Component {
  @action
  _onClickOverlay(event) {
    let { onClickOverlay } = this;
    if (onClickOverlay) {
      onClickOverlay(event);
    }
  }

  @action
  didInsert(element) {
    const registerClick = () => {
      element.addEventListener('click', this._onClickOverlay);
    };

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick, clickHandlerDelay(this));

    if (isIOS) {
      element.style.cursor = 'pointer';
    }
  }

  @action
  willDestroyNode(element) {
    element.removeEventListener('click', this._onClickOverlay);
  }
}
