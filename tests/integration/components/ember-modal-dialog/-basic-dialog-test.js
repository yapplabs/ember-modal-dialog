import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | ember-modal-dialog/-basic-dialog',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`
        <EmberModalDialog::-BasicDialog>
          Hello world!
        </EmberModalDialog::-BasicDialog>
      `);

      assert.dom().hasText('Hello world!');
    });
  },
);
