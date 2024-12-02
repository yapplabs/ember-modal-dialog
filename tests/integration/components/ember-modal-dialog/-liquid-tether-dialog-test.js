import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | ember-modal-dialog/-liquid-tether-dialog',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`
        <EmberModalDialog::-LiquidTetherDialog
          @tetherTarget="body"
        >
          Hello world!
        </EmberModalDialog::-LiquidTetherDialog>
      `);

      assert.dom().hasText('Hello world!');
    });
  },
);
