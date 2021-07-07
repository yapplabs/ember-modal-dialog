import Ember from 'ember';

export function ignoreChildren([nextHandler]) {
  return function(...args) {
    let event = args[args.length - 1];
    if (event && event.target === event.currentTarget) {
      nextHandler.apply(this, args);
    }
  };
}

export default Ember.Helper.helper(ignoreChildren);