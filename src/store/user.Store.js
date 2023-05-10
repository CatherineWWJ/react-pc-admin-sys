import { makeAutoObservable } from 'mobx'
import {http} from '@/utils'

// 跟用户信息相关的内容
class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }
    getUserInfo = async () => {
        // 调用接口获取数据
        const res = await http.get('/user/profile')
        this.userInfo = res.data
    }
}

export default UserStore