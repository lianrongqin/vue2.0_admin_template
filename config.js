'use strict';


exports.Host = "0.0.0.0";
exports.Port = 8081;
exports.AppPathPrefix = '';

exports.Proxy = {
  '/api': {
    target: process.env.VUE_APP_PAY_BASEURL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  },
};
