module.exports = {
  context: __dirname,
  entry: './lib/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    library: "EntryPoint"
  },
  resolve: {
    extensions: ['*', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
