module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    'no-var': 'error',  // Enforce `let` or `const` everywhere except in global declarations
    'no-undef': 'off',  // Avoid undefined errors for global variables
  },
  overrides: [
    {
      files: ['global.d.ts'],
      rules: {
        'no-var': 'off',  // Disable `no-var` in global.d.ts where it is necessary
      },
    },
  ],
};
