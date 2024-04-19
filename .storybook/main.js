const path = require('path')

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (config) => {
    config.resolve.alias.reactPdfDist = path.resolve(__dirname, '../node_modules/react-pdf/dist/cjs/')
    config.module.rules.push({
      test: /\.(txt|csv|eps|mmdb)$/,
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

  docs: {
    autodocs: true,
  },
};
