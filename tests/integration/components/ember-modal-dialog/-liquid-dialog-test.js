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

      // Scope assertion to the modal dialog element specifically, not the entire test container.
      // liquid-fire keeps hidden animation artifacts in the DOM for transitions,
      // so checking the entire #ember-testing container would include those hidden copies.
      assert.dom('.ember-modal-dialog').hasText('Hello world!');
    });
  },
);
