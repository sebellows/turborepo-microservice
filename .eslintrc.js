module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `config`
  extends: ["config/eslint-preset"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
