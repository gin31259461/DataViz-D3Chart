const pkg = require('./package.json');
const path = require('path');
module.exports = {
  title: `Chart Component v${pkg.version}`,
  components: 'src/*/*.js',
  
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  },
  
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');

    return `import { ${name} } from '${pkg.name}';`;
  },
};