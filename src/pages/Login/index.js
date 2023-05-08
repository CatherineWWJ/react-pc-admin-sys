import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import logo from '@/assets/logo.png'
import { useNavigate } from 'react-router-dom';
// 导入样式文件
import './index.scss'
import { useStore } from '@/store';

function Login() {
    const { loginStore } = useStore()
    const navigate = useNavigate()
    async function onFinish(values) {
        console.log('Success:', values);
        // values:放置的是所有表单项中用户输入的内容
        try {
            await loginStore.getToken({
                mobile: values.phone,
                code: values.password,
            })
            // 跳转首页
            navigate('/', {replace: true})
            // 提示用户
            message.success('登录成功')
        } catch (e) {
            message.error('登录失败')
        }
    }
    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=""></img>
                {/* 登录表单 */}
                {/* 子项用到的触发事件 需要在Form中都声明一下才可以 */}
                <Form
                    initialValues={
                        { remember: true, password:'246810', phone:'13811111111' }
                    }
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: '请输入手机号!' },
                            { 
                                pattern: /^1[3-9]\d{9}$/,
                                message:'请输入正确的手机号',
                                validateTrigger: 'onBlur', // 在什么时机下发起这个校验
                            },
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码!' },
                            {
                                len:6,
                                message: '请输入6位密码',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
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