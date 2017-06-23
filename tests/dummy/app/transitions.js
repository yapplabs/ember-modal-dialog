export default function() {
  // BEGIN-SNIPPET animated-transitions
  this.transition(
    this.hasClass('liquid-dialog-container'),
    this.use('explode', {
      pick: '.ember-modal-overlay',
      use: ['fade', { maxOpacity: 0.5 }]
    },{
      pick: '.ember-modal-dialog',
      use: ['to-up']
    })
  );
  // END-SNIPPET
  // BEGIN-SNIPPET animated-with-tether-transitions
  this.transition(
    this.matchSelector('#modal-overlay'),
    this.toValue((toValue, fromValue) => toValue === null || fromValue === null),
    this.use('fade')
  );

  this.transition(
    this.matchSelector('#modal-dialog'),
    this.toValue((toValue, fromValue) => toValue !== null && fromValue !== null),
    this.use('fly-to')
  );

  this.transition(
    this.matchSelector('#modal-dialog'),
    this.toValue((toValue, fromValue) => toValue === null || fromValue === null),
    this.use('to-up'),
    this.reverse('to-down')
  );

  this.transition(
    this.matchSelector('.modal-stack'),
    this.toValue((toValue, fromValue) => toValue === null || fromValue === null),
    this.use('to-up'),
    this.reverse('to-down')
  );

  this.transition(
    this.matchSelector('#modal-stack-b'),
    this.use('fly-to', { movingSide: 'new' })
  );
  // END-SNIPPET
}
