import { run } from '@ember/runloop';
import { merge } from '@ember/polyfills';
import Application from '../../app';
import config from '../../config/environment';
import registerAssertHelpers from './modal-asserts';

export default function startApp(attrs) {
  let application;

  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    registerAssertHelpers();
  });

  return application;
}
