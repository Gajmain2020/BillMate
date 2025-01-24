module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],

    plugins,
  };
};
