import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#000000',
    secondary: '#ffd520',
    accent: '#6ac4ae',
    error: '#e30438',
    info: '#00b1c7',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
