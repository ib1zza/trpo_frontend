import React from 'react';
import {AppRoutes} from "../../AppRouter";

import {Layout, Menu, Typography} from "antd";
import {MenuItemType} from "antd/es/menu/interface";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/data/useUser.ts";
import {UserOutlined} from "@ant-design/icons";

const {Title} = Typography;
const {Header, Content, Footer} = Layout;

const HeaderUI = () => {
    const user = useUser();

    const navigate = useNavigate();


    const items: MenuItemType[] = [{
        key: 1,
        label: `Список ресурсов`,
        onClick: () => {
            navigate(AppRoutes.HOME)
        },
    },
        {
            key: 3,
            icon: <UserOutlined/>,
            style: {
                marginLeft: 'auto'
            },
            label: user ? (
                <span style={{marginLeft: '16px'}}>{user.email}</span>
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
                key: '2',
                label: <Link to={AppRoutes.CREATE_RESOURCE}>Добавить ресурс</Link>,
                disabled: !user,
            },
        )
        items.sort((a, b) => +a.key.toString() - +b.key.toString());
    }

    return (
        <Header className={'header'}>
            <div className="header-content">
                <Title level={3} style={{margin: 0}}>WEB resources</Title>
                <Menu
                    // theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}

                    style={{flex: 1, minWidth: 0}}
                />
                {/*<div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>*/}
                {/*    {user ? (*/}
                {/*        <span style={{marginLeft: '16px'}}>{user.email}</span>*/}
                {/*    ) : (*/}
                {/*        <Menu.Item key="3" onClick={() => navigate(AppRoutes.LOGIN)}>*/}
                {/*            Личный кабинет*/}
                {/*        </Menu.Item>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </Header>
    );
};

export default HeaderUI;
