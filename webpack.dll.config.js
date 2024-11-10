const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'recharts'
    ]
  },
  output: {
    path: path.join(__dirname, 'public', 'dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'public', 'dll', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}; 