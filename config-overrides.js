const webpackConfig = require('./config/webpack.config')

const { overrideDevServer } = require('customize-cra')
module.exports = {
  webpack: webpackConfig,
  // 开发环境代理配置
  devServer: overrideDevServer((config) => {
    config.proxy = {
      [process.env.REACT_APP_API]: {
        target: process.env.REACT_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: (p) => p.replace(new RegExp(process.env.REACT_APP_API), "")
      }
    }
    return config
  })
}
