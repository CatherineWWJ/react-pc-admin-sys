import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { history } from "./utils/history";
import Layout from '@/pages/Layout/index'
import Login from '@/pages/Login/index'
import { AuthComponent } from "./components/AuthComponent";
import './App.css'
import Publish from "./pages/Publish";
import Article from "./pages/Article";
import Home from "./pages/Home";

function App() {
  return (
    // 路由配置
    <HistoryRouter history={history}>
      <div className="App">
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
      </div>
    </HistoryRouter>
  );
}

export default App;
