import { defineStore } from 'pinia'

interface HeaderOption {
    id: number;
    title: string;
    icon: string;
}

export const useHeaderOptionStore = defineStore('headerOption', {
    state: () => ({
        headerOptionList: [
            { id: 1, title: '充钻石', icon: 'icon-zuanshi' },
            { id: 2, title: '客户端', icon: 'icon-xiazai' },
            { id: 3, title: '壁纸', icon: 'icon-bizhi' },
            { id: 4, title: '通知', icon: 'icon-tongzhi' },
            { id: 5, title: '私信', icon: 'icon-sixin' },
            { id: 6, title: '投稿', icon: 'icon-tougao' },
            { id: 7, title: '登录', icon: 'icon-wode' }
        ]        
    })
});