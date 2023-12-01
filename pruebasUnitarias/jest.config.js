module.exports = {
    testEnvironment: 'node', // O el entorno que estés utilizando
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };