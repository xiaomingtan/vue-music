import Vue from 'vue'
import Router from 'vue-router'
import Rank from  '@/components/rank/rank'
import Recommend from  '@/components/recommend/recommend'
import Search from  '@/components/search/search'
import Singer from  '@/components/singer/singer'
import SingerDetail from  '@/components/singer-detail/singer-detail'
import TopList from  '@/components/top-list/top-list'
import disc from  '@/components/disc/disc'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect : '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend' ,
      component: Recommend,
      children: [{
        path: ':id',
        component: disc ,
      }]
    },
    {
      path: '/rank',
      name: 'rank' ,
      component: Rank,
      children: [{
        path: ':id' ,
        component: TopList
      }]
    },
    {
      path: '/singer',
      name: 'singer' ,
      component: Singer,
      children: [{
        path: ':id' ,
        component: SingerDetail
      }]
    },
    {
      path: '/search',
      name: 'search' ,
      component: Search
    },
  ]
})
