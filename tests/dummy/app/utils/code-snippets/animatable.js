export const codeSnippets = {
  'animated-transitions-js': `this.transition(
  this.hasClass('liquid-dialog-container'),
  this.use(
    'explode',
    {
      pick: '.ember-modal-overlay',
      use: ['fade', { maxOpacity: 0.5 }],
    },
    {
      pick: '.ember-modal-dialog',
      use: ['to-up'],
    },
  ),
);`,

  'basic-modal-dialog-animatable-hbs': `<ModalDialog
  @onClose={{action "toggleBasic"}}
  @overlayPosition="sibling"
  @clickOutsideToClose={{true}}
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Basic</p>
  <button
    type="button"
    {{action "toggleBasic"}}
  >
    Close
  </button>
</ModalDialog>`,

  'translucent-modal-dialog-animatable-hbs': `<ModalDialog
  @onClose={{action "toggleTranslucent"}}
  @translucentOverlay={{true}}
  @overlayPosition="sibling"
  @clickOutsideToClose={{true}}
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>With Translucent Overlay</p>
  <button
    type="button"
    {{action "toggleTranslucent"}}
  >
    Close
  </button>
</ModalDialog>`,

  'without-overlay-modal-dialog-animatable-hbs': `<ModalDialog
  @onClose={{action "toggleWithoutOverlay"}}
  @hasOverlay={{false}}
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Without Overlay</p>
  <button
    type="button"
    {{action "toggleWithoutOverlay"}}
  >
    Close
  </button>
</ModalDialog>`,

  'without-overlay-click-outside-to-close-modal-dialog-animatable-hbs': `<ModalDialog
  @onClose={{action
    "toggleWithoutOverlayClickOutsideToClose"
  }}
  @hasOverlay={{false}}
  @clickOutsideToClose={{true}}
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Without Overlay - Click Outside to Close</p>
  <button
    type="button"
    {{action "toggleWithoutOverlayClickOutsideToClose"}}
  >
    Close
  </button>
</ModalDialog>`,

  'custom-styles-modal-dialog-animatable-hbs': `<ModalDialog
  @onClose={{action (mut this.isShowingCustomStyles) false}}
  @containerClass="custom-styles-modal-container"
  @overlayClass="custom-styles-overlay"
  @wrapperClass="custom-styles-wrapper"
  @overlayPosition="sibling"
  @clickOutsideToClose={{true}}
  @targetAttachment="none"
  @animatable={{true}}
>
  <h1>Stop! Modal Time!</h1>
  <p>Custom Styles</p>
  <button
    type="button"
    {{action
      (action (mut this.isShowingCustomStyles) false)
    }}
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
    {{action "toggleSubclassed"}}
  >
    Close
  </button>
</MyCoolModalDialog>`,

  'subclass-styles-css': `.my-cool-modal {
  border-radius: 100px;
  padding: 40px;
}`,
};
