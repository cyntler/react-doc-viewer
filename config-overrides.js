module.exports = {
  webpack: function (config, env) {
    if (env === "development") {
      config.entry = config.entry.replace(new RegExp("index.tsx$"), "demo.tsx");
    }

    return config;
  },
};
