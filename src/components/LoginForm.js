import React, { useRef } from 'react';
import { Button, Checkbox, Form, Input, notification, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function LoginForm() {
    const usernameRef = useRef(null); // Kullanıcı adı inputu için ref
    const passwordRef = useRef(null); // Şifre inputu için ref

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const onFinishFailed = (errorInfo) => {
        const firstError = errorInfo.errorFields[0]; // notification.error ile hata mesajını göster

        notification.error({
            message: 'Validation Error',
            description: firstError.errors.join(', '),
            placement: 'top', // Mesajın üst kısımda gözükmesini sağla
        });

        // İlgili input'a focus yap
        if (firstError.name[0] === 'username') {
            usernameRef.current.focus(); // Kullanıcı adı inputu
        } else if (firstError.name[0] === 'password') {
            passwordRef.current.focus(); // Şifre inputu
        }
    };

    const styles = {
        container: {
            margin: '0 auto',
            width: '380px',
        },
        header: {
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        section: {
            alignItems: 'center',
            backgroundColor: '#f0f2f5',
            display: 'flex',
            height: '100vh',
            padding: '40px 0',
        },
        title: {
            fontSize: '24px',
        },
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <Title style={styles.title}>Sign in</Title>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Username"
                            ref={usernameRef}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            ref={passwordRef}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '0px' }}>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
