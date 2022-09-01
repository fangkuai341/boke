const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    proxy: {
      "/wenzi": {
        target: "http://116.204.65.53",
        changeOrigin: false,
        ws: false,
      },
      "/dianzan": {
        target: "http://116.204.65.53",
        changeOrigin: true,
      },
      "/getmsg": {
        target: "http://116.204.65.53",
        changeOrigin: true,
      },
      "/account": {
        target: "http://116.204.65.53",
        changeOrigin: true,
      },
      "/msg": {
        target: "http://116.204.65.53",
        changeOrigin: true,
      },
    },
  },
});
