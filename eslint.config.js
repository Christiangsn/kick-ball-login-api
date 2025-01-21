const eslint = require('@eslint/js');
const importHelpers = require('eslint-plugin-import-helpers');
const unusedImports = require('eslint-plugin-unused-imports');
const globals = require('globals');
const tseslint = require('typescript-eslint');
 
const plugins = {
  'import-helpers': importHelpers,
  'unused-imports': unusedImports,
}

const ignores =  [
  '**/*.md',
  '**/*.gql',
  '**/node_modules',
  '**/dist',
  '**/coverage',
  'src/**/**.md',
  'src/@code-gen/schema.gql',
  'src/code-gen.types.ts',
  'src/code-gen.types.ts',
  'public/*',
  '**/public',
  '**/public/',
  '**/docs/',
  '**/docs',
  '**/jest.config.ts',
  '**/commitlint.config.js',
  '**/jest.setup.ts',
  '**/jest.e2e.config.ts',
  '**/*.html',
  'eslint.config.js'
]

const rules = {
  'import-helpers/order-imports': ['warn', {
      newlinesBetween: 'always',
      groups: [
          'module',
          '/^@main/',
          '/^@shared/',
          '/^@domain/',
          '/^@application/',
          '/^@infra/',
          'parent',
          'sibling',
          'index',
      ],

      alphabetize: {
          order: 'asc',
          ignoreCase: true,
      },
  }],
  'indent': ['error', 2],
  'semi': ['error', 'never'],
  "no-unused-vars": "off",
  "eol-last": ["error", "always"],
  "no-useless-catch":'off',
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": [
      "warn",
      {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
      },
  ],
  "@typescript-eslint/no-namespace": "off",
  "@typescript-eslint/return-await": "off",
  '@typescript-eslint/no-require-imports': 'off',
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
  "new-cap": "off",
  "no-unused-vars": "off", //
  "unused-imports/no-unused-imports": "error",
  "@typescript-eslint/consistent-type-definitions": "off",
  "@typescript-eslint/no-namespace": "off",
  "@typescript-eslint/return-await": "off",
  "@typescript-eslint/strict-boolean-expressions": "off",
  "@typescript-eslint/prefer-nullish-coalescing": "off",
  "no-extra-boolean-cast": "off",
  "@typescript-eslint/explicit-function-return-type": "off",
  "no-useless-escape": "off",
  "@typescript-eslint/interface-name-prefix": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "quotes": ["error", "single"],
  "@typescript-eslint/prefer-readonly": "off",
  "@typescript-eslint/ban-types": "off",
  "no-mixed-operators": "off",
  "@typescript-eslint/no-base-to-string": "off",
  "@typescript-eslint/no-confusing-void-expression": "off",
  "@typescript-eslint/no-floating-promises": "off",
  "@typescript-eslint/no-invalid-void-type": "off",
  "@typescript-eslint/await-thenable": "off",
  "@typescript-eslint/no-unused-expressions": "off",
  "no-void": "off",
  "@typescript-eslint/no-useless-constructor": "off",
  "@typescript-eslint/no-unnecessary-type-assertion": "off",
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/no-misused-promises": "off",
  "accessor-pairs": "off",
  "@typescript-eslint/no-redeclare": "off",
  "@typescript-eslint/restrict-template-expressions": "off",
  "@typescript-eslint/no-unused-vars": "off",
  "no-unreachable": "off",
  "@typescript-eslint/consistent-type-assertions": "off",
  "unused-imports/no-unused-vars": "off",
  "@typescript-eslint/no-extraneous-class": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "@typescript-eslint/ban-ts-comment": "off",
  "no-new-wrappers": "off",
  "array-callback-return": "off",
  "@typescript-eslint/unbound-method": "off",
  "import/export": "off",
  "@typescript-eslint/consistent-type-imports": "off",
  "@typescript-eslint/prefer-optional-chain": "off",
  "@typescript-eslint/no-dynamic-delete": "off",
  "promise/param-names": "off",
  "@typescript-eslint/triple-slash-reference": "off",
  "prefer-const": "off",
  "n/handle-callback-err": "off",
  "no-prototype-builtins": "off"
}

module.exports = tseslint.config(
  {
      ignores,
      plugins
  },
  ...tseslint.configs.recommended.map((config) => ({
      ...config,
      plugins,
      ignores,
      rules,
      files: ['**/*.ts'],
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.strict,
      ]
  }))
)