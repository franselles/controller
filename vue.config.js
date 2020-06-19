module.exports = {
  pwa: {
    lang: 'es-ES',
    name: 'CONTROLPLAYAS',
    short_name: 'CONTROLPLAYAS',
    themeColor: '#f37321',
    background_color: '#e7e552',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    display: 'minimal-ui',
    orientation: 'portrait',
    workboxOptions: {
      skipWaiting: true,
    },
  },
  productionSourceMap: false,
};
