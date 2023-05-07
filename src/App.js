import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '@/pages/Layout/index'
import Login from '@/pages/Login/index'
import { Button } from 'antd';

function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Button type="primary">Primary Button</Button>
        <Routes>
          {/* 创建路由path和组件对应关系 */}
          <Route path="/" element={<Layout></Layout>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
