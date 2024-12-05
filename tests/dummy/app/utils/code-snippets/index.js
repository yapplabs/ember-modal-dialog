export const codeSnippets = {
  'basic-modal-dialog-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Basic</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'translucent-modal-dialog-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @translucentOverlay={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>With Translucent Overlay</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'translucent-modal-dialog-with-callback-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @translucentOverlay={{true}}
  @onClickOverlay={{this.onClickTranslucentOverlay}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Translucent Overlay with Callback</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'modal-dialog-without-overlay-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @hasOverlay={{false}}
  @clickOutsideToClose={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Without Overlay</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'translucent-modal-dialog-sibling-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @translucentOverlay={{true}}
  @overlayPosition="sibling"
>
  <h1>Stop! Modal Time!</h1>
  <p>With Translucent Overlay as Sibling</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'custom-styles-modal-dialog-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @targetAttachment="none"
  @containerClass={{this.customContainerClassNames}}
  @overlayClass="custom-styles-overlay"
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

  'target-selector-modal-dialog-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @targetAttachment={{this.exampleTargetAttachment}}
  @attachment={{this.exampleAttachment}}
  @target="#alignModalDialogToMe"
>
  <h1>Stop! Modal Time!</h1>
  <p>Target - Selector: "#alignModalDialogToMe"</p>
  <p>Target Attachment: {{this.exampleTargetAttachment}}</p>
  <p>Attachment: {{this.exampleAttachment}}</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'target-element-modal-dialog-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @targetAttachment={{this.exampleTargetAttachment}}
  @attachment={{this.exampleAttachment}}
  @target="#bwmde"
>
  <h1>Stop! Modal Time!</h1>
  <p>Target - Element #bwmde</p>
  <p>Target Attachment: {{this.exampleTargetAttachment}}</p>
  <p>Attachment: {{this.exampleAttachment}}</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'subclass-js': `import ModalDialogComponent from 'ember-modal-dialog/components/modal-dialog';

export default class MyCoolModalDialog extends ModalDialogComponent {
  translucentOverlay = true; // override default of false
  containerClassNames = ['my-cool-modal'];
  destinationElementId = 'modal-overlays';
}`,

  'subclass-modal-dialog-animatable-hbs': `<MyCoolModalDialog
  @onClose={{action "toggleSubclassed"}}
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Via Subclass</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</MyCoolModalDialog>`,

  'subclass-modal-dialog-hbs': `<MyCoolModalDialog
  @onClose={{this.closeModal}}
  @translucentOverlay={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Via Subclass</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</MyCoolModalDialog>`,

  'subclass-styles-css': `.my-cool-modal {
  border-radius: 100px;
  padding: 40px;
}`,

  'subclass-modal-dialog-2-hbs': `<MyCoolModalDialogTwo
  @onClose={{this.closeModal}}
  @translucentOverlay={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Via Subclass</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</MyCoolModalDialogTwo>`,

  'in-place-modal-dialog-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @renderInPlace={{true}}
  @targetAttachment="none"
  @containerClass="ember-modal-dialog-in-place my-custom-class"
  @overlayClass="ember-modal-overlay-in-place"
>
  <h1>Stop! Modal Time!</h1>
  <p>In Place</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'in-place-css': `.ember-modal-overlay-in-place {
  height: initial;
  opacity: initial;
  position: initial;
}

.emd-in-place {
  position: initial;
}`,

  'in-place-modal-dialog-2-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @renderInPlace={{true}}
  @targetAttachment="none"
  @containerClassNames="ember-modal-dialog-in-place my-custom-class-2"
  @overlayClassNames="ember-modal-overlay-in-place"
>
  <h1>Stop! Modal Time!</h1>
  <p>In Place</p>
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'centered-scrolling-modal-dialog-hbs': `<ModalDialog
  @onClose={{this.closeModal}}
  @translucentOverlay={{true}}
  @targetAttachment="none"
  @containerClass="centered-scrolling-container"
  @overlayClass="centered-scrolling-overlay"
  @wrapperClass="centered-scrolling-wrapper"
>
  <h1>Really Long Content To Demonstrate Scrolling</h1>
  <ul>
    <li>Hover over modal and scroll</li>
    <li>Also hover over overlay and scroll</li>
  </ul>
  {{lorem-ipsum length=30000}}
  <button
    type="button"
    {{on "click" this.closeModal}}
  >
    Close
  </button>
</ModalDialog>`,

  'centered-scrolling-css': `body.centered-modal-showing {
  overflow: hidden;
}
.centered-scrolling-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
}

.centered-scrolling-overlay {
  position: relative;
  height: auto;
  min-height: 100vh;
  padding: 1em;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* basic modal style (an example, this is not necessary for the centering) */
.centered-scrolling-container {
  position: relative;
  background-color: white;
  min-width: 30em;
  max-width: 650px;
  min-height: 20em;
  padding: 3em;
  margin-top: 30px;
  margin-bottom: 30px;
  box-sizing: border-box;
  box-shadow: 0px 4px 25px 4px rgba(0,0,0,0.30);
}`,

  'element-centered-modal-dialog-hbs': `<ModalDialog
  data-test="my-data-test"
  @onClose={{this.closeModal}}
  @elementId={{this.elementId}}
  @translucentOverlay={{true}}
  @targetAttachment="elementCenter"
  @target="#elementCenter"
>
  <p>Centered on element.</p>
</ModalDialog>`,
};
