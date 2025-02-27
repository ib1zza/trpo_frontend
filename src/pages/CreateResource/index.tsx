import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Select, Typography} from 'antd';
import {useCategories} from "../../hooks/data/useCategories.ts";
import {createResource, CreateResourceData} from "../../api/resourses.ts";
import {useUser} from "../../hooks/data/useUser.ts";
import KeywordInput from "../../components/KeywordInput"; // Adjust the import path as necessary

const {Title} = Typography;
const {Option} = Select;

const CreateResourcePage = () => {
    const categories = useCategories();
    const {user} = useUser();

    const [formData, setFormData] = useState<CreateResourceData>({
        title: '',
        url: '',
        description: '',
        category_id: 1,
        owner_id: user?.id || 0,
        contact_info: '',
        keywords: [],
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

    const handleCategoryChange = (value: number) => {
        setFormData((prevData) => ({
            ...prevData,
            category_id: value,
        }));
    };

    const handleKeywordsChange = (data: string[]) => {
        setFormData((prevData) => ({
            ...prevData,
            keywords: data,
        }));
    };

    const handleSubmit = async () => {
        try {
            await createResource(formData);
            message.success('Ресурс успешно создан!');
            // Optionally, redirect or reset the form here
        } catch (error) {
            message.error('Ошибка при создании ресурса. Попробуйте еще раз.');
        }
    };

    return (
        <div style={{maxWidth: '600px', margin: 'auto', padding: '20px'}}>
            <Title level={2}>Создать ресурс</Title>
            <Form
                style={{
                    marginTop: 10
                }}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Название"
                    required
                >
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Item>
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
                <Form.Item
                    label="Описание"
                    required
                >
                    <Input.TextArea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{
                            height: '100px',
                            resize: 'none',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Категория"
                    required
                >
                    <Select
                        placeholder="Выберите категорию"
                        onChange={handleCategoryChange}
                        value={formData.category_id}
                    >
                        {categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Контактная информация"
                    required
                >
                    <Input
                        name="contact_info"
                        value={formData.contact_info}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Ключевые слова"
                >
                    <KeywordInput onChange={handleKeywordsChange}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Создать ресурс
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateResourcePage;
