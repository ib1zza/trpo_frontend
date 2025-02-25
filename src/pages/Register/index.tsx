import React, {useState} from 'react';
import {Button, Form, Input, message, Typography} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {createNewUser} from "../../services/slices/userSlice.ts"; // Импортируйте ваш thunk для регистрации
import {AppRoutes} from "../../components/AppRouter";
import {useAppDispatch} from "../../services/store.ts";
import {UserRole} from "../../api/User.ts";

const { Link: AntLink } = Typography;
const { Title } = Typography;

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values: { username: string; email: string; password: string }) => {
        try {
            await dispatch(createNewUser({...values, user_type: UserRole.USER})).unwrap();
            message.success('Регистрация успешна!');
            navigate(AppRoutes.LOGIN); // Перенаправление на страницу входа после успешной регистрации
        } catch (error: any) {
            message.error('Ошибка регистрации. Попробуйте еще раз.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <Title level={2}>Регистрация</Title>
            <Form
                style={{ marginTop: 20 }}
                name="register"
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
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>

            <AntLink style={{ color: '#1890ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Typography>
                    Уже есть аккаунт?
                </Typography>
                <Link to={AppRoutes.LOGIN} style={{
                    marginLeft: '4px',
                }}>
                    Вход
                </Link>
            </AntLink>
        </div>
    );
};

export default RegisterPage;
