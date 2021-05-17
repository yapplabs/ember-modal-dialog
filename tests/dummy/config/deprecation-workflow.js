/*global self*/
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-views.curly-components.jquery-element" },
    { handler: "silence", matchId: "computed-property.override" },
    { handler: "silence", matchId: "deprecated-run-loop-and-computed-dot-access" },
    { handler: "silence", matchId: "ember-global" },
    { handler: "silence", matchId: "ember.built-in-components.import" },
    { handler: "silence", matchId: "this-property-fallback" },
  ]
};
