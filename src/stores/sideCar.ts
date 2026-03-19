import { defineStore } from 'pinia'

export const useSideCarStore = defineStore('sideCar', {
  state: () => ({
    activeIndex: 1,
    activeId: 1,
    sideCarShow: [
      { car: 1, id: 1, title: '精选' },
      { car: 1, id: 2, title: '推荐' },
      { car: 1, id: 3, title: '搜索' },
      { car: 1, id: 4, title: '关注' },
      { car: 1, id: 5, title: '朋友' },
      { car: 1, id: 6, title: '我的' },
      { car: 1, id: 7, title: '直播' },
      { car: 1, id: 8, title: '放映厅' },
      { car: 1, id: 9, title: '短剧' },
      { car: 1, id: 10, title: '小游戏' },
    ],
    moreShow: [
      { car: 2, id: 1, title: '设置' },
      { car: 2, id: 2, title: '更多' },
      { car: 2, id: 3, title: '关于' },
      { car: 2, id: 4, title: '反馈' },
    ],
    settingMoreShow: [
      { car: 3, id: 1, title: '默认首页设置' },
      { car: 3, id: 2, title: '深浅模式' },
      { car: 3, id: 3, title: '通用设置' },
      { car: 3, id: 4, title: 'AI设置' },
      { car: 3, id: 5, title: '键盘快捷键' },
      { car: 3, id: 6, title: '常见问题' },
      { car: 3, id: 7, title: '我的客服' },
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
    getcomponent(itemId: number) {
      this.activeId = itemId
      console.log(itemId)
    },
    getAlert(itemId: number) {
      console.log(itemId)
    },
  },
})
