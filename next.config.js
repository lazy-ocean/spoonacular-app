const appConfig = require("./config/app.config");
const withPWA = require("next-pwa");
const publicRuntimeConfig = {
  ...appConfig,
};

require("dotenv").config();

module.exports = withPWA({
  publicRuntimeConfig,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
});
