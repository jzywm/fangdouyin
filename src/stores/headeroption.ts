import { defineStore } from 'pinia'

interface HeaderOption {
    id: number;
    title: string;
    icon: string;
}

export const useHeaderOptionStore = defineStore('headerOption', {
    state: () => ({
        headerOptionList: [
            { id: '0', title: '充钻石', icon: 'icon-zuanshi' },
            { id: '0', title: '客户端', icon: 'icon-xiazai' },
            { id: '0', title: '壁纸', icon: 'icon-bizhi' },
            { id: '0', title: '通知', icon: 'icon-tongzhi' },
            { id: '0', title: '私信', icon: 'icon-sixin' },
            { id: '2', title: '投稿', icon: 'icon-tougao' },
        ]        
    })
});