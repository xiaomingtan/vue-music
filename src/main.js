// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import globalMixin from './common/js/global.mixin'

Vue.config.productionTip = false
import '@/common/stylus/index.styl'

fastclick.attach(document.body) //去除点击300ms延时

Vue.use(VueLazyload, {
  loading: require('@/common/image/default.png')
})

Vue.mixin(globalMixin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
