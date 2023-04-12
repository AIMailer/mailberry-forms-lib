const path = require('path');

module.exports = {
  devtool: false,
  entry: './src/mailberry-forms.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mailberry-forms.js',
    globalObject: 'this',
    library: {
      name: 'mailberryForms',
      type: 'umd',
    },
  },
};