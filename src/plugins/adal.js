import Vue from 'vue'
import Adal from 'vue-adal'
import router from '../router'
import config from '../../config'

Vue.use(Adal, {
  // This config gets passed along to Adal, so all settings available to adal can be used here.
  config,

  // Set this to true for authentication on startup
  requireAuthOnInitialize: false,

  // Pass a vue-router object in to add route hooks with authentication and role checking
  router
})
