import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Select, Typography} from 'antd';
import {changeResourceOwner} from "../../api/resourses.ts";
import {useUser} from "../../hooks/data/useUser.ts";

const {Title} = Typography;

const GetResourcePage = () => {
    const {user} = useUser();

    const [formData, setFormData] = useState<{ url: string }>({
        url: '',
    });

    useEffect(() => {
        if (user?.id)
            setFormData(prevState => ({
                ...prevState,
                owner_id: user.id
            }))
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {
        try {
            if (!user?.id) return;
            await changeResourceOwner({
                url: formData.url,
                new_user_id: user.id
            });
            message.success('Ресурс успешно создан!');
            // Optionally, redirect or reset the form here
        } catch (error) {
            message.error('Ошибка при создании ресурса. Попробуйте еще раз.');
        }
    };

    return (
        <div style={{maxWidth: '600px', margin: 'auto', padding: '20px'}}>
            <Title level={2}>Заявить права на ресурс</Title>
            <Form
                style={{
                    marginTop: 10
                }}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="URL"
                    required
                >
                    <Input
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Получить права
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default GetResourcePage;
