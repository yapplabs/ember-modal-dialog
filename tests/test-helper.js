import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import registerAssertHelpers from './helpers/modal-asserts';

setApplication(Application.create(config.APP));
registerAssertHelpers();

start();
