const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: BASE_URL,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    hot: true,
    inline: true,
    host: 'localhost',
    port: 8082,
    open:false,
    disableHostCheck: true,
    proxy: {
      '^/user': {
        target: 'http://129.0.97.23:30739',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/user': '/api/v1/user'
        }
      },
      '^/opinion': {
        target: 'http://127.0.0.1:7001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/opinion': '/api/v1/opinion'
        }
      },
      '^/opiniontag': {
        target: 'http://127.0.0.1:7001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/opiniontag': '/api/v1/opiniontag'
        }
      }
    }

  },
  
}