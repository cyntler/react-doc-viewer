module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(txt|csv|mmdb)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            emitFile: true,
          },
        },
      ],
    });

    return config;
  },
};
