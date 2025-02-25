import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {loginUserThunk} from "../../services/slices/userSlice.ts";
import {AppRoutes} from "../../components/AppRouter";
import {useAppDispatch} from "../../services/store.ts";
const { Link: AntLink } = Typography;

const { Title } = Typography;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            await dispatch(loginUserThunk(values)).unwrap();
            message.success('Успешный вход!');
            navigate(AppRoutes.HOME); // Перенаправление на главную страницу после успешного входа
        } catch (error: any) {
            message.error('Ошибка входа. Проверьте свои учетные данные.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <Title level={2}>Вход</Title>
            <Form
                style={{marginTop: 20}}
                name="login"
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
                >
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Form.Item>
            </Form>

            <AntLink  style={{ color: '#1890ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Typography >
                    Нет аккаунта?
                </Typography>
                <Link to={AppRoutes.REGISTER} style={{
                    marginLeft: '4px',
                }}>
                    Регистрация
                </Link>
            </AntLink>
        </div>
    );
};

export default LoginPage;
