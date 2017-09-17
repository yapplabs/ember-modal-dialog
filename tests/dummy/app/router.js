import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tethered');
  this.route('animatable');
  this.route('tethered-animatable');
  this.route('tether-dialog'); //deprecated
});

export default Router;
