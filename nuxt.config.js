module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'example_apollo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */

  modules: [
    // ['@nuxtjs/apollo', {
    //   clientConfigs: {
    //     default: {
    //       // required
    //       httpEndpoint: 'http://localhost:4000/api',
    //       // You can use `wss` for secure connection (recommended in production)
    //       // Use `null` to disable subscriptions
    //       // wsEndpoint: 'ws://localhost:4000/socket', // optional
    //       // LocalStorage token
    //       tokenName: 'apollo-token', // optional
    //       // Enable Automatic Query persisting with Apollo Engine
    //       persisting: false, // Optional
    //       // Use websockets for everything (no HTTP)
    //       // You need to pass a `wsEndpoint` for this to work
    //       websocketsOnly: false // Optional
    //     },
    //   },
    // }]

    ['@nuxtjs/apollo', {
      clientConfigs: {
        default: '~/graphql/apollo/defaultClient.js',
      },
    }]
  ],


  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    babel: {
      plugins: ["transform-class-properties"],
    }
  }
}

