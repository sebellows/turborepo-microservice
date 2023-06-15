module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `config`
  extends: ["custom"],
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
