export function stubResolver(app, name, factory) {
  if (app.__container__._registry) {
    // 1.11 and later
    app.__container__._registry._resolveCache[name] = factory;
  } else {
    // 1.10 and prior
    // TODO: Find sane approach for 1.10... or in general
  }
}
