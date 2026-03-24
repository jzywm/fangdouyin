import { createRouter, createWebHistory } from 'vue-router'

import mainVideo from '../components/mainVedio.vue'
import recommend from '../components/mainRecommend.vue'
import search from '../components/mainSearch.vue'
import follow from '../components/mainFollow.vue'
import friends from '../components/mainFriends.vue'
import profile from '../components/mainProfile.vue'
import live from '../components/mainLive.vue'
import theater from '../components/mainTheater.vue'
import shortPlays from '../components/mainShortPlay.vue'
import games from '../components/mainGames.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainVideo',
      component: mainVideo,
    }, {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    }, {
      path: '/search',
      name: 'search',
      component: search
    }, {
      path: '/follow',
      name: 'follow',
      component: follow
    }, {
      path: '/friends',
      name: 'friends',
      component: friends
    }, {
      path: '/profile',
      name: 'profile',
      component: profile
    }, {
      path: '/live',
      name: 'live',
      component: live
    }, {
      path: '/theater',
      name: 'theater',
      component: theater
    }, {
      path: '/shortPlays',
      name: 'shortPlays',
      component: shortPlays
    }, {
      path: '/games',
      name: 'games',
      component: games
    }
  ]
})

let lastRouteChangeTime = 0
const routerTimeDiff = 3000 // 3秒

router.beforeEach((to, from, next) => {
  const currentTime = Date.now()

  if (currentTime - lastRouteChangeTime < routerTimeDiff) {
    // 显示提示
    if (from.path !== to.path) {
      alert('不要频繁切换路由，请过三秒后再试')
      return
    }
  }
  // 更新时间并允许导航
  lastRouteChangeTime = currentTime
  next()
})

export default router