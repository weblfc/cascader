module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['off', 'windows'],
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    indent: ["off", "tab"],
    'no-trailing-spaces': 0,
    quotes: 'off',
    semi: 'off',
    'comma-dangle': 'off',
    eqeqeq: ['off'],
    "global-require": 0,
    "no-param-reassign": 0
  },
  overrides: [
      {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    }, 
  ],
};
