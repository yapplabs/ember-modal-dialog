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

      // Debug: log the DOM structure
      const testingDiv = document.querySelector('#ember-testing');
      console.log('=== Full DOM Structure ===');
      console.log(testingDiv.innerHTML);
      console.log('\n=== Text content count ===');
      const allText = testingDiv.textContent;
      const count = (allText.match(/Hello world!/g) || []).length;
      console.log(`Found "Hello world!" ${count} times`);

      // Find all elements containing the text
      console.log('\n=== Elements containing "Hello world!" ===');
      const walker = document.createTreeWalker(
        testingDiv,
        NodeFilter.SHOW_TEXT,
        null,
        false,
      );
      let node;
      while ((node = walker.nextNode())) {
        if (node.textContent.includes('Hello world!')) {
          console.log('Text node:', node.textContent.trim());
          console.log('Parent element:', node.parentElement.className);
          console.log(
            'Parent display:',
            window.getComputedStyle(node.parentElement).display,
          );
          console.log(
            'Parent visibility:',
            window.getComputedStyle(node.parentElement).visibility,
          );
          console.log('---');
        }
      }

      assert.dom('.ember-modal-dialog').hasText('Hello world!');
    });
  },
);
