import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import registerAssertHelpers from './modal-asserts';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    registerAssertHelpers();
  });

  return application;
}
