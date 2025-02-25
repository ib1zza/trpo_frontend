import React from 'react';
import {AppRoutes} from "../../AppRouter";

import {Layout, Menu, Typography} from "antd";
import {MenuItemType} from "antd/es/menu/interface";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;
const {Header, Content, Footer} = Layout;

const HeaderUI = () => {
    const navigate = useNavigate();


    const items: MenuItemType[] = [{
        key: '1',
        label: `Список ресурсов`,
        onClick: () => {
            navigate(AppRoutes.HOME)
        }
    },
        {
            key: '2',
            label: 'Добавить ресурс',

        }
    ];
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
            </div>
        </Header>
    );
};

export default HeaderUI;
