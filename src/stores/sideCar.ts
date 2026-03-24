import { defineStore } from 'pinia'

export const useSideCarStore = defineStore('sideCar', {
  state: () => ({
    activeIndex: 1,
    activeRouterpath: '/mainVideo',
    sideCarShow: [
      { car: 1, id: 1, title: '精选', icon: 'icon-jingxuan', router: '/' },
      { car: 1, id: 2, title: '推荐', icon: 'icon-tuijian1', router: '/recommend' },
      { car: 1, id: 3, title: '搜索', icon: 'icon-sousuo', router: '/search' },
      { car: 1, id: 4, title: '关注', icon: 'icon-wodeguanzhu', router: '/follow' },
      { car: 1, id: 5, title: '朋友', icon: 'icon-pengyou', router: '/friends' },
      { car: 1, id: 6, title: '我的', icon: 'icon-wode', router: '/profile' },
      { car: 1, id: 7, title: '直播', icon: 'icon-zhibo', router: '/live' },
      { car: 1, id: 8, title: '放映厅', icon: 'icon-changjingku', router: '/theater' },
      { car: 1, id: 9, title: '短剧', icon: 'icon-dianying', router: '/shortPlays' },
      { car: 1, id: 10, title: '小游戏', icon: 'icon-xiaoyouxi', router: '/games' },
    ],
    moreShow: [
      { car: 2, id: 1, title: '设置', icon: 'icon-shezhi' },
      { car: 2, id: 2, title: '更多', icon: 'icon-gengduo' },
      { car: 2, id: 3, title: '关于', icon: 'icon-guanyu' },
      { car: 2, id: 4, title: '反馈', icon: 'icon-fankui' },
    ],
    settingMoreShow: [
      { car: 3, id: 1, title: '默认首页设置', icon: 'icon-shouye' },
      { car: 3, id: 2, title: '深浅模式', icon: 'icon-shenqianmoshi' },
      { car: 3, id: 3, title: '通用设置', icon: 'icon-tongyongshezhi' },
      { car: 3, id: 4, title: 'AI设置', icon: 'icon-AIshezhi' },
      { car: 3, id: 5, title: '键盘快捷键', icon: 'icon-jianpankuaijiejian' },
      { car: 3, id: 6, title: '常见问题', icon: 'icon-changjianwenti' },
      { car: 3, id: 7, title: '我的客服', icon: 'icon-wodekefu' },
    ],
    aboutShow: [
      { car: 4, id: 1, title: '关于抖音' },
      { car: 4, id: 2, title: '创作服务' },
      { car: 4, id: 3, title: '安全与信任中心' },
      { car: 4, id: 4, title: '抖音直播伴侣' },
      { car: 4, id: 5, title: '抖音电商' },
      { car: 4, id: 6, title: '生活服务' },
      { car: 4, id: 7, title: '广告投放' },
      { car: 4, id: 8, title: '开放平台' },
    ],
    questionShow: [
      { car: 5, id: 1, title: '常见问题' },
      { car: 5, id: 2, title: '联系客服' },
    ],
  }),
  actions: {
    getrouterid(id: number) {
      this.activeIndex = id
      console.log('Activated item:', id)
    },
    getAlert(itemId: number) {
      console.log(itemId)
    },
  },
})
