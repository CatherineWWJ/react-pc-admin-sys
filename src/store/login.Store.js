// login module
import { makeAutoObservable } from "mobx"
import { http,setToken,getToken } from "@/utils"

class LoginStore {
    // 刷新之后这里的token就初始化为空了，因此每次刷新页面后要到本地去取token
    token = getToken() || ''
    constructor() {
        // 响应式
        makeAutoObservable(this)
    }
    getToken = async ({mobile, code})=>{
        // 调用登录接口
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations',{
            mobile, code
        })
        // console.log(res);
        // 往内存中 存入token
        this.token = res.data.token
        // 存入localStorage
        setToken(this.token)
    }
}

export default LoginStore