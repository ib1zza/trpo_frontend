import React from 'react';
import {AppRoutes} from "../../AppRouter";

import {Layout, Menu, Typography} from "antd";
import {MenuItemType} from "antd/es/menu/interface";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/data/useUser.ts";
import {UserOutlined} from "@ant-design/icons";
import {UserRole} from "../../../api/User.ts";

const {Title} = Typography;
const {Header, Content, Footer} = Layout;

const HeaderUI = () => {
    const {user} = useUser();
    const location = useLocation(); // Получаем текущий путь
    const navigate = useNavigate();


    const items: MenuItemType[] = [{
        key: 1,
        label: `Список ресурсов`,
        onClick: () => {
            navigate(AppRoutes.HOME)
        },
    },
        {
            key: 4,
            icon: <UserOutlined/>,
            style: {
                marginLeft: 'auto'
            },
            label: user ? (
                <Link to={AppRoutes.ACCOUNT} style={{marginLeft: '16px'}}>{user.email}</Link>
            ) : (
                <Link key="3" to={AppRoutes.LOGIN}>
                    Вход
                </Link>
            )
        }
    ];

    if (user) {
        items.push(
            {
                key: 2,
                label: <Link to={AppRoutes.CREATE_RESOURCE}>Добавить ресурс</Link>,
                disabled: !user,
            },
        )
        items.sort((a, b) => +a.key.toString() - +b.key.toString());
    }

    if (user?.user_type === UserRole.ADMIN) {
        items.push(
            {
                key: 3,
                label: <Link to={AppRoutes.MANAGE_USERS}>Админ панель</Link>,
                disabled: !user,
            },
        )
    }

    if (user?.user_type === UserRole.RESOURCE_OWNER && user?.approved) {
        items.push(
            {
                key: 3,
                label: <Link to={AppRoutes.GET_RESOURCE}>Заявить права на ресурс</Link>,
                disabled: !user,
            },
        )
    }

    items.sort((a, b) => +a.key.toString() - +b.key.toString());

    const getSelectedKeys = () => {
        switch (location.pathname) {
            case AppRoutes.HOME:
                return ['1']; // Ключ для "Список ресурсов"
            case AppRoutes.CREATE_RESOURCE:
                return ['2']; // Ключ для "Добавить ресурс"
            case AppRoutes.MANAGE_USERS:
                return ['3']; // Ключ для "Админ панель"
            case AppRoutes.GET_RESOURCE:
                return ['3']; // Ключ для "Заявить права на ресурс"
            case AppRoutes.ACCOUNT:
                return ['4']; // Ключ для аккаунта пользователя
            default:
                return []; // Ничего не выбрано
        }
    };

    return (
        <Header className={'header'}>
            <div className="header-content">
                <Title level={3} style={{margin: 0}}>WEB resources</Title>
                <Menu
                    selectedKeys={getSelectedKeys()}
                    // theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}

                    style={{flex: 1, minWidth: 0}}
                />
            </div>
        </Header>
    );
};

export default HeaderUI;
