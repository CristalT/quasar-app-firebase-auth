import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import main from './main'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    main
  }
})

if (process.env.DEV && module.hot) {
  module.hot.accept(['./main'], () => {
    const newShowcase = require('./main').default
    store.hotUpdate({ modules: { showcase: newShowcase } })
  })
}

export default store