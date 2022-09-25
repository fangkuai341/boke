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
        target: "http://www.dls-lcy.com",
        changeOrigin: false,
        ws: false,
      },
      "/dianzan": {
        target: "http://www.dls-lcy.com",
        changeOrigin: true,
      },
      "/getmsg": {
        target: "http://www.dls-lcy.com",
        changeOrigin: true,
      },
      "/account": {
        target: "http://www.dls-lcy.com",
        changeOrigin: true,
      },
      "/msg": {
        target: "http://www.dls-lcy.com",
        changeOrigin: true,
      },
    },
  },
});
