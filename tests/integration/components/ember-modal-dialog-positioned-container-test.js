import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | ember-modal-dialog-positioned-container',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`
        <EmberModalDialogPositionedContainer>
          Hello world!
        </EmberModalDialogPositionedContainer>
      `);

      assert.dom().hasText('Hello world!');
    });
  },
);
