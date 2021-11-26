const { proxy } = require("http-proxy-middleware");

module.exports = (app) => {
  // app.use(
  //     proxy("/", {
  //         target: "http://localhost:5000"
  //     })
  // )
  app.use(
    proxy("/api", {
      target: "http://localhost:5000/",
    })
  );
};

/*

module.exports = function (app) {
    app.use(
        proxy("/api", {
            target: "http://localhost:5000/"
        })

    );
};


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
  
*/
