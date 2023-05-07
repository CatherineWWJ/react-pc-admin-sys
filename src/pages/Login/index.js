import { Card, Button, Checkbox, Form, Input } from 'antd'
import logo from '@/assets/logo.png'
// 导入样式文件
import './index.scss'

function Login() {
    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=""></img>
                {/* 登录表单 */}
                <Form>
                    <Form.Item>
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item>
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox className='login-checkbox-label'>
                            我已阅读并同意【用户协议】和【隐私条款】
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size='large' block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login