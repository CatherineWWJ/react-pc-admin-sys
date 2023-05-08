import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '@/pages/Layout/index'
import Login from '@/pages/Login/index'
import { AuthComponent } from "./components/AuthComponent";

function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 创建路由path和组件对应关系 */}
          {/* Layout需要鉴权处理 */}
          <Route path="/" element={<AuthComponent><Layout></Layout></AuthComponent>}></Route>
          {/* Login不需要鉴权处理 */}
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
