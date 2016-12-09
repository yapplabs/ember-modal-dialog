import Ember from 'ember';

function fireNativeMouseEvent(eventType, selectorOrDomElement, context) {
  let event = new window.Event(eventType, { bubbles: true, cancelable: true, view: window });
  let target;
  if (typeof selectorOrDomElement === 'string') {
    target = Ember.$(selectorOrDomElement, context)[0];
  } else {
    target = selectorOrDomElement;
  }
  Ember.run(() => target.dispatchEvent(event));
}

export default function acceptanceTestHelpers() {

  Ember.Test.registerAsyncHelper('nativeClick', function(app, selectorOrDomElement, context) {
    fireNativeMouseEvent('click', selectorOrDomElement, context);
    wait();
  });

}

export default acceptanceTestHelpers();
