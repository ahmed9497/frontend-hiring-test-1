import React from 'react'
import { Form, Layout, Input, Button, Card, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/helper.service';




const Login = () => {

    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            
           
            let res = await signIn(values)
        
            if (res.statusCode === 201 ) {
               
                // message.success('Welcome Admin');
                localStorage.setItem('token', JSON.stringify(res))
                navigate('/home');
            }
            else {
                message.error(res?.message)
            }


        } catch (error) {

        }

    };


    
    return (
        <div className='login-page'>
            <div style={{ width: '100%' }}>
                <Row align='center'>
                    <Col span={10}>
                        <Card>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                layout={'vertical'}
                                size={'large'}
                                // autoComplete="off"
                            >
                                <Form.Item
                                    name="username"
                                    label="User Name"
                                    

                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    autoComplete="off"

                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                    />
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>

                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Login