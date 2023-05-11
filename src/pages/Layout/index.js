import { Layout, Menu, Popconfirm } from 'antd'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { useStore } from '@/store'
import { useEffect } from 'react'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const { pathname } = useLocation() // 获得当前路由
  console.log(pathname);
  const { userStore, loginStore,channelStore } = useStore()
  useEffect(() => {
    userStore.getUserInfo() // 在页面初始化的时候调用一次获取用户信息
    channelStore.loadChannelList()
  }, [userStore, channelStore]) // 添加依赖项仅仅是为了不报错

  // 确定退出
  const navigate = useNavigate() // 所有带use的方法都是hook,只能在其他的use-hook中 / 组件中使用
  const onConfirm = () => {
    // 退出登录 删除token 跳回到登录
    loginStore.loginOut()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {/* 高亮原理：defaultSelectedKeys === item key */}
          {/* 获取当前激活的path路径？ */}
          {/* 
             defaultSelectedKeys: 初始化渲染的时候生效一次
             selectedKeys: 每次有值更新时都会重新渲染视图
          */}
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]} // 设计成数组：多层路由的原因
            selectedKeys={pathname}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              {/* 帮助跳转的组件 Link */}
              <Link to='/'>数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to='/publish'>发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}


// 刷新页面，userInfo会重新初始化为空   之后改为请求后的数据，但是第二次渲染需要链接
// 因数据的改变而对页面相应的修改和重新渲染叫做响应式，因此需要observer进行链接
// 关键：需要数据影响视图
export default observer(GeekLayout)