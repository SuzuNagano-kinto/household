const path = require('path')

module.exports = {
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, '/')
    return config
  },
  // resolve: {
  //   alias: {
  //     "~": path.join(__dirname, "/")
  //   }
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}