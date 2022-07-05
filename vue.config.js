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
        target: 'http://localhost:8080',
        changeOrigin: false,
        ws: false,
      },
      '/cityjson': {
        target: 'http://pv.sohu.com',
        changeOrigin: true,

      },
      '/WeatherApi': {
        target: 'http://wthrcdn.etouch.cn',
        changeOrigin: true,

      },
      '/dianzan': {
        target: 'http://localhost:8080',
        changeOrigin: true,

      },
      '/account': {
        target: 'http://localhost:8080',
        changeOrigin: true,

      },
    },
  }


})