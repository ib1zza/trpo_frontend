import React, {useEffect} from 'react';
import {Card, Col, Row} from 'antd';
import {ICategory, getAllCategories} from "../../api/categories.ts";
import {Link} from "react-router-dom";
import {AppRoutes} from "../AppRouter";
import {removeParams} from "../../helpers/router.ts";
import { Typography } from "antd";
import {useCategories} from "../../hooks/data/useCategories.ts";
const {Title} = Typography;

const CategoryCards: React.FC = () => {
    const categories = useCategories();

    console.log(removeParams(AppRoutes.RESOURCES_BY_CATEGORY))
    return (
        <Row gutter={[16, 16]}>
            {categories.map(category => (
                <Col span={6} key={category.id}>
                    <Link style={{height: "100%", display: "block", minHeight: "130px"}} to={`${removeParams(AppRoutes.RESOURCES_BY_CATEGORY)}/${category.id}`}>
                        <Card style={{height:'100%'}}>
                            <Title level={2} >{category.name}</Title>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
};

export default CategoryCards;
