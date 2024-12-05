export const codeSnippets = {
  'animated-with-tether-transitions-js': `this.transition(
  this.matchSelector('#modal-overlay'),
  this.toValue(
    (toValue, fromValue) => toValue === null || fromValue === null,
  ),
  this.use('fade'),
);

this.transition(
  this.matchSelector('#modal-dialog'),
  this.toValue(
    (toValue, fromValue) => toValue !== null && fromValue !== null,
  ),
  this.use('fly-to'),
);

this.transition(
  this.matchSelector('#modal-dialog'),
  this.toValue(
    (toValue, fromValue) => toValue === null || fromValue === null,
  ),
  this.use('to-up'),
  this.reverse('to-down'),
);

this.transition(
  this.matchSelector('.modal-stack'),
  this.toValue(
    (toValue, fromValue) => toValue === null || fromValue === null,
  ),
  this.use('to-up'),
  this.reverse('to-down'),
);

this.transition(
  this.matchSelector('#modal-stack-b'),
  this.use('fly-to', { movingSide: 'new' }),
);`,

  'custom-styles-modal-dialog-liquid-tether-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @tetherTarget="body"
  @targetAttachment="top right"
  @targetModifier="visible"
  @attachment="top right"
  @containerClass="custom-styles-modal-container"
  @overlayClass="custom-styles-overlay"
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Custom Styles</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'custom-styles-css': `.custom-styles-overlay {
  background-color: rgba(15, 157, 88, .77);
}

.custom-styles-overlay,
.custom-styles-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.custom-styles-modal-container {
  background: #222;
  color: white;
  margin-left: -25px;
  margin-top: 10px;
  width: 300px;

  h1 {
    color: #0f9d58;
  }
}`,

  'target-selector-modal-dialog-liquid-tether-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @hasOverlay={{false}}
  @targetAttachment={{this.exampleTargetAttachment}}
  @attachment={{this.exampleAttachment}}
  @tetherTarget="#alignTetherDialogToMe"
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Target - Selector: "#alignTetherDialogToMe"</p>
  <p>Target Attachment: {{this.exampleTargetAttachment}}</p>
  <p>Attachment: {{this.exampleAttachment}}</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'target-element-modal-dialog-liquid-tether-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @hasOverlay={{false}}
  @targetAttachment={{this.exampleTargetAttachment}}
  @attachment={{this.exampleAttachment}}
  @tetherTarget="#bwtde"
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Target - Element #bwtde</p>
  <p>Target Attachment: {{this.exampleTargetAttachment}}</p>
  <p>Attachment: {{this.exampleAttachment}}</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'element-centered-modal-dialog-liquid-tether-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @translucentOverlay={{true}}
  @tetherTarget="#elementCenter"
  @animatable={{true}}
>
  <p>Centered on element.</p>
</ModalDialog>`,

  'separate-stacks-modal-dialog-liquid-tether-hbs': `{{#if this.isShowingSeparateStacksModal1}}
  <ModalDialog
    @stack="modal-stack-a"
    @containerClass="modal-stack"
    @onClose={{this.closeModal1}}
    @hasOverlay={{false}}
    @clickOutsideToClose={{true}}
    @tetherTarget="#separateStacksButton1"
    @targetAttachment="bottom center"
    @attachment="top center"
    @animatable={{true}}
  >
    <p>I am modal 1.</p>
  </ModalDialog>
{{/if}}
{{#if this.isShowingSeparateStacksModal2}}
  <ModalDialog
    @stack="modal-stack-b"
    @value={{2}}
    @containerClass="modal-stack"
    @onClose={{this.closeModal2}}
    @hasOverlay={{false}}
    @clickOutsideToClose={{true}}
    @tetherTarget="#separateStacksButton2"
    @targetAttachment="top center"
    @attachment="bottom center"
    @animatable={{true}}
  >
    <p>I am modal 2.</p>
  </ModalDialog>
{{/if}}
{{#if this.isShowingSeparateStacksModal3}}
  <ModalDialog
    @stack="modal-stack-b"
    @value={{2}}
    @containerClass="modal-stack"
    @onClose={{this.closeModal3}}
    @hasOverlay={{false}}
    @clickOutsideToClose={{true}}
    @tetherTarget="#separateStacksButton3"
    @targetAttachment="middle right"
    @attachment="middle left"
    @animatable={{true}}
  >
    <p>I am modal 3.</p>
  </ModalDialog>
{{/if}}`,
};
