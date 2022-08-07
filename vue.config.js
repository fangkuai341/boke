const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    proxy: {
      '/wenzi': {
        target: 'http://139.224.162.183',
        changeOrigin: false,
        ws: false,
      },
      '/dianzan': {
        target: 'http://139.224.162.183',
        changeOrigin: true,

      },
      '/getmsg': {
        target: 'http://139.224.162.183',
        changeOrigin: true,

      },
      '/account': {
        target: 'http://139.224.162.183',
        changeOrigin: true,

      },
      '/msg': {
        target: 'http://139.224.162.183',
        changeOrigin: true,
      },
    },
  }


})
