const path = require("path");

module.exports = {
  paths: function (paths) {
    paths.appPublic = path.resolve(__dirname, "src/demoapp");
    paths.appHtml = path.resolve(__dirname, "src/demoapp/index.html");

    return paths;
  },
  webpack: function (config, env) {
    if (env === "development") {
      config.entry = config.entry.replace(
        new RegExp("index.tsx$"),
        "demoapp/index.tsx"
      );
    }

    return config;
  },
};
