import React from "react";
import { useAllUsers } from "../../hooks/data/useAllUsers.ts";
import {approveUser, UserRole} from "../../api/User.ts";
import {List, Button, Typography, message, Table, Space} from "antd";
import {useAllResourceUpdates} from "../../hooks/data/useAllResourceUpdates.ts";
import {ResourceUpdate} from "../../api/resourceUpdates.ts";

const { Text, Title } = Typography;

const ManageUsersPage = () => {
    const { allUsers, refetch} = useAllUsers();
    const {allResourceUpdates} = useAllResourceUpdates()

    // Фильтруем пользователей, которые требуют подтверждения
    const needToApprove = allUsers?.filter(
        (user) => user.user_type === UserRole.RESOURCE_OWNER && !user.approved
    );

    // Обработчик подтверждения пользователя
    const handleApprove = async (email: string) => {
        try {
            await approveUser(email);
            refetch();
            message.success("Пользователь подтвержден");
        } catch (error) {
            message.error("Ошибка при подтверждении пользователя");
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a: ResourceUpdate, b: ResourceUpdate) => a.id - b.id,
        },
        {
            title: "ID ресурса",
            dataIndex: "resource_id",
            key: "resource_id",
            sorter: (a: ResourceUpdate, b: ResourceUpdate) => a.resource_id - b.resource_id,
        },
        {
            title: "Описание обновления",
            dataIndex: "update_description",
            key: "update_description",
        },
        {
            title: "Дата обновления",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => new Date(text).toLocaleString(), // Форматируем дату
            sorter: (a: ResourceUpdate, b: ResourceUpdate) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
    ];

    return (
        <div style={{padding: "24px"}}>
            <List
                header={<Text strong>Пользователи, ожидающие подтверждения</Text>}
                bordered
                dataSource={needToApprove}
                renderItem={(user) => (
                    <List.Item
                        actions={[
                            <Button
                                type="primary"
                                onClick={() => handleApprove(user.email)}
                            >
                                Подтвердить
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={<Text>{user.email}</Text>}
                            description={`Роль: ${user.user_type}`}
                        />
                    </List.Item>
                )}
            />
            <Space style={{padding: "24px", width: "100%"}} direction={"vertical"}>
                <Title level={2}>История обновлений ресурсов</Title>

                <Table
                    dataSource={allResourceUpdates || []}
                    columns={columns}
                    rowKey="id"
                    loading={!allResourceUpdates}
                    pagination={{
                        pageSize: 10, // Количество записей на странице
                        showSizeChanger: true, // Показывать выбор количества записей на странице
                        pageSizeOptions: ["10", "20", "50", "100"], // Опции для выбора количества записей
                    }}
                />
            </Space>
        </div>
    );
};

export default ManageUsersPage;
