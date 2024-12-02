import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | ember-modal-dialog/-liquid-dialog',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`
        <EmberModalDialog::-LiquidDialog>
          Hello world!
        </EmberModalDialog::-LiquidDialog>
      `);

      assert.dom().hasText('Hello world!');
    });
  },
);
