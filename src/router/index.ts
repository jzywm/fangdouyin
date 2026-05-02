import { createRouter, createWebHistory } from 'vue-router'

import mainVideo from '../components/siderouter/mainVedio.vue'
import recommend from '../components/siderouter/mainRecommend.vue'
import search from '../components/siderouter/mainSearch.vue'
import follow from '../components/siderouter/mainFollow.vue'
import friends from '../components/siderouter/mainFriends.vue'
import profile from '../components/siderouter/mainProfile.vue'
import live from '../components/siderouter/mainLive.vue'
import theater from '../components/siderouter/mainTheater.vue'
import shortPlays from '../components/siderouter/mainShortPlay.vue'
import games from '../components/siderouter/mainGames.vue'
import detailVideo from '../components/detailvideo/detailVedio.vue'

import { useUserStore } from '../stores/user'
import { useModalStore } from '../stores/module'

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
      component: follow,
      meta: { requiresAuth: true }
    }, {
      path: '/friends',
      name: 'friends',
      component: friends,
      meta: { requiresAuth: true }
    }, {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: { requiresAuth: true }
    }, {
      path: '/live',
      name: 'live',
      component: live,
      meta: { requiresAuth: true }
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
    }, {
      path: '/detailvideo/:id',
      name: 'detailVideo',
      component: detailVideo,
      meta: { fullScreen: true }
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

  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    const userStore = useUserStore()
    if (!userStore.userid) {
      // 打开登录模态框
      const modalStore = useModalStore()
      alert("请先登录"),
        modalStore.modeloption = '1'
      return
    }
  }

  // 更新时间并允许导航
  lastRouteChangeTime = currentTime
  next()
})

export default router
