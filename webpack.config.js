const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

/** This function takes the original object containing the default webpack configuration
 *  and returns a modified one with an applied HotModuleReplacementPlugin plugin.
 *  Used to add hot reload to the server. doc: https://docs.nestjs.com/recipes/hot-reload
 */
module.exports = function(options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', './src/main.ts'],
    watch: true,
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
  };
};
