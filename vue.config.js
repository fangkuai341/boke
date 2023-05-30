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
      "/api": {
        target: "https://show.bilibili.com/",
        changeOrigin: true,
        ws: true,
        headers: {
          Referer: "https://show.bilibili.com/",
          Origin: "https://show.bilibili.com/",
        },
      }

    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
    },
    mobile: {
      entry: 'src/mobile/main.js',
      template: 'public/mobileIndex.html',
    },
  },
});
