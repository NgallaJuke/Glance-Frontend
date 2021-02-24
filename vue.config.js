module.exports = {
  transpileDependencies: ['vuetify'],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
};
