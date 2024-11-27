export const codeSnippets = {
  'custom-styles-modal-dialog-tethered-hbs': `<ModalDialog
  @onClose={{action (mut this.isShowingCustomStyles) false}}
  @tetherTarget="body"
  @targetModifier="visible"
  @targetAttachment="top right"
  @attachment="top right"
  @containerClass="custom-styles-modal-container"
  @overlayClass="custom-styles-overlay"
>
  <h1>Stop! Modal Time!</h1>
  <p>Custom Styles</p>
  <button
    onclick={{action
      (mut this.isShowingCustomStyles)
      false
    }}
    type="button"
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

  'target-selector-modal-dialog-tethered-hbs': `<ModalDialog
  @onClose={{action "toggleTargetSelector"}}
  @hasOverlay={{false}}
  @targetAttachment={{this.exampleTargetAttachment}}
  @attachment={{this.exampleAttachment}}
  @tetherTarget="#alignTetherDialogToMe"
>
  <h1>Stop! Modal Time!</h1>
  <p>Target - Selector: "#alignTetherDialogToMe"</p>
  <p>Target Attachment: {{this.exampleTargetAttachment}}</p>
  <p>Attachment: {{this.exampleAttachment}}</p>
  <button
    type="button"
    {{action "closeTargetSelector"}}
  >
    Close
  </button>
</ModalDialog>`,

  'target-element-modal-dialog-tethered-hbs': `<ModalDialog
  @onClose={{action "toggleTargetElement"}}
  @hasOverlay={{false}}
  @targetAttachment={{this.exampleTargetAttachment}}
  @attachment={{this.exampleAttachment}}
  @tetherTarget="#bwtde"
>
  <h1>Stop! Modal Time!</h1>
  <p>Target - Element #bwtde</p>
  <p>Target Attachment: {{this.exampleTargetAttachment}}</p>
  <p>Attachment: {{this.exampleAttachment}}</p>
  <button
    type="button"
    {{action "closeTargetElement"}}
  >
    Close
  </button>
</ModalDialog>`,

  'element-centered-modal-dialog-tethered-hbs': `<ModalDialog
  @translucentOverlay={{true}}
  @tetherTarget="#elementCenter"
  @onClose={{action
    (mut this.isShowingElementCenterModal)
    false
  }}
>
  <p>Centered on element.</p>
</ModalDialog>`,
};
