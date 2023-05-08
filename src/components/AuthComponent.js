// 1.判断token是否存在
// 2.如果存在 直接正常渲染
// 3.如果不存在 重定向到登录路由

/**
 * 高阶组件：
 * 把一个组件当成另外一个组件的参数传入 然后通过一定的判断 返回新的组件
 */

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

function AuthComponent({ children }) {
    const token = getToken()
    if (token) {
        return (
            <>{children}</>
        )
    } else {
        return <Navigate to="/login" replace></Navigate>
    }
}

/**
 * 使用示范：
 * <AuthComponent><Layout/></AuthComponent>
 * 以下是2种情况：
 * 登录状态：<><Layout/></>
 * 非登录状态：<Navigate to="/login" replace />
 * 
 * 使用场景：
 * 需要进行token校验的路由才套娃
 */

export {
    AuthComponent
}