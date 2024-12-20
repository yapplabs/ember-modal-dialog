'use strict';

module.exports = {
  overrides: [
    {
      files: '*.hbs',
      options: {
        printWidth: 64,
        singleQuote: false,
      },
    },
    {
      files: '*.{js,ts}',
      options: {
        printWidth: 80,
        singleQuote: true,
      },
    },
  ],
};
