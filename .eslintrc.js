module.exports = {
    env: {
        es6: true
    },
    parserOptions: {
        ecmaVersion: 8
    },
    //extends: ['eslint:recommended'],
    rules: {
        semi: [2, 'always'],
        'no-unused-vars': ['error', { args: 'none' }],
    },
};
