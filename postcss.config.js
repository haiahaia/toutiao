/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    {
      // 37.5px代表1rem
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*']
      }
    }
  ]
}

module.exports = config
