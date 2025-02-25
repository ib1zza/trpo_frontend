import React from 'react';
import {Link} from "react-router-dom";
import {AppRoutes} from "../../AppRouter";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Typography} from "antd";
const { Link: AntLink } = Typography;

const BackLink = () => {
    return (
        <AntLink  style={{ color: '#1890ff', display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <Link to={AppRoutes.HOME}>
                <ArrowLeftOutlined style={{ marginRight: 8 }} />
                На главную
            </Link>
        </AntLink>
    );
};

export default BackLink;
