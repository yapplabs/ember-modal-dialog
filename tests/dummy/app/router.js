import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tethered');
  this.route('animatable');
  this.route('tethered-animatable');
});

export default Router;
