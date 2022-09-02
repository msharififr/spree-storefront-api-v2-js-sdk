const { resolve } = require('path')
const baseDirectoryPath = __dirname
const srcDirectoryPath = resolve(baseDirectoryPath, 'src')
const ProgressBar = require('./webpack-plugins/ProgressBar')
const DeleteBeforeEmit = require('./webpack-plugins/DeleteBeforeEmit')

module.exports = {
  context: baseDirectoryPath,
  plugins: [
    new ProgressBar(),
    new DeleteBeforeEmit(resolve(baseDirectoryPath, 'types'))
  ],
  entry: {
    index: [
      resolve(srcDirectoryPath, 'index.ts')
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              onlyCompileBundledFiles: true
            }
          }
        ],
        include: srcDirectoryPath
      },
      {
        test: /\.js$/,
        use: [
          'source-map-loader'
        ],
        include: /node_modules/,
        enforce: 'pre'
      }
    ]
  },
  resolveLoader: {
    modules: [
      srcDirectoryPath,
      'node_modules'
    ]
  },
  resolve: {
    symlinks: false,
    extensions: ['.tsx', '.ts', '.js']
  }
}
