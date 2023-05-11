import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { history } from "./utils/history";
import './App.css'
import { AuthComponent } from "./components/AuthComponent";
// 路由懒加载
import { lazy, Suspense } from "react";
// 按需导入组件
const Login = lazy(() => import('@/pages/Login/index'))
const Layout = lazy(() => import('@/pages/Layout/index'))
const Home = lazy(() => import("./pages/Home"))
const Article = lazy(() => import("./pages/Article"))
const Publish = lazy(() => import("./pages/Publish"))

function App() {
  return (
    // 路由配置
    <HistoryRouter history={history}>
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}>
                loading...
            </div>
          }>
          <Routes>
            {/* 创建路由path和组件对应关系 */}
            {/* Layout需要鉴权处理 */}
            <Route path="/" element={<AuthComponent><Layout></Layout></AuthComponent>}>
              <Route index element={<Home></Home>}></Route>
              <Route path="article" element={<Article></Article>}></Route>
              <Route path="publish" element={<Publish></Publish>}></Route>
            </Route>
            {/* Login不需要鉴权处理 */}
            <Route path="/login" element={<Login></Login>}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  );
}

export default App;
