import React from 'react';
import {Card, Divider, Space, Typography} from "antd";
import {useUser} from "../../hooks/data/useUser.ts";
import {Link} from "react-router-dom";

const AccountPage = () => {
    const {resources} = useUser();

    return (
        <div>
            <Divider style={{marginBottom: 40}}>
                <Typography.Title  title="Home" level={1}>Профиль</Typography.Title >
            </Divider>

            <Typography.Title level={2}>Ваши ресурсы</Typography.Title>

            {resources && <Space direction={"vertical"} style={{
                width: "100%",
                marginTop: 20
            }}>
                {
                    resources.map((resource) => (
                        <Card
                            key={resource.id}
                            title={<a href={resource.url}>{resource.title}</a>}
                            style={{marginBottom: 16, textAlign: "left"}}
                            extra={
                                <Link to={`/resources/edit/${resource.id}`}>Редактировать</Link>
                            }
                        >
                            <p><strong>Описание:</strong> {resource.description}</p>
                            <p><strong>Последнее обновление:</strong> {new Date(resource.updatedAt).toLocaleString()}
                            </p>
                            <p><strong>Контакт:</strong> {resource.contact_info}</p>
                            <p><strong>Ключевые слова:</strong> {resource.keywords.join(", ")}</p>
                        </Card>
                    ))
                }
            </Space>}

        </div>
    );
};

export default AccountPage;
