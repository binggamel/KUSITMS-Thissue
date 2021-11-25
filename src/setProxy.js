const { proxy } = require("http-proxy-middleware");

module.exports = (app) => {
  // app.use(
  //     proxy("/", {
  //         target: "http://localhost:5000"
  //     })
  // )

  app.use(
    "/api",
    proxy({
      target: "http://localhost:5000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // 하위 url 초기화
      },
    })
  );
};

/*

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "[목적지 주소]",
            changeOrigin: true,
            pathRewrite: {
                '^/api': '' // 하위 url 초기화
            }

        })

    );
};

*/
