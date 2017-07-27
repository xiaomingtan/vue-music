import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger' // 在控制台输出状态信息
import state from './state'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})