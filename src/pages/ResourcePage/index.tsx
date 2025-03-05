import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResourceVisits } from '../../hooks/data/useResourceVisits.ts';
import {Space, Spin, Typography, Card, Descriptions, Tag, Button} from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useResource } from '../../hooks/data/useResource.ts';
import { useCategories } from '../../hooks/data/useCategories.ts';
import { useVisitResource } from '../../hooks/data/useVisitResource.ts';
import html2canvas from 'html2canvas';
// @ts-ignore
import jsPDF from 'jspdf';

const { Title } = Typography;

const ResourcePage = () => {
    const { id } = useParams();
    const { visits, refetch } = useResourceVisits(id);
    const { info } = useResource(id);
    const categories = useCategories();
    useVisitResource(id);

    // Функция для получения всех дат за последний месяц
    const getLastMonthDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 29; i >= 0; i--) { // Последние 30 дней
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push(date.toLocaleDateString());
        }
        return dates;
    };

    const downloadPdf = () => {
        const input = document.getElementById('resource-page-content') as HTMLElement; // Убедитесь, что у вас есть id у контейнера, который вы хотите захватить

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('resource-info.pdf'); // Save PDF
        });
    };

    // Подготовка данных для графика
    const prepareChartData = () => {
        // Создаем массив дат за последний месяц
        const lastMonthDates = getLastMonthDates();

        // Создаем объект для группировки визитов по дате
        const visitsByDate = visits.reduce((acc, visit) => {
            const date = new Date(visit.visit_date).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        // Объединяем даты за последний месяц с данными о визитах
        const chartData = lastMonthDates.map((date) => ({
            date,
            visits: visitsByDate[date] || 0, // Если визитов нет, ставим 0
        }));

        return chartData;
    };

    const finalData = prepareChartData();
    const loading = !visits || !info;

    return (
        <>

    <div id="resource-page-content" style={{padding: '24px'}}>
        {/* Информация о ресурсе */}
        {info && (
                <Card title="Информация о ресурсе" style={{marginBottom: '24px'}}>

                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Название">{info.title}</Descriptions.Item>
                        <Descriptions.Item label="URL">
                            <a href={info.url} target="_blank" rel="noopener noreferrer">
                                {info.url}
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Описание">{info.description}</Descriptions.Item>
                        <Descriptions.Item label="Ключевые слова">
                            <Space>
                                {info.keywords.map((keyword, index) => (
                                    <Tag key={index} color="blue">
                                        {keyword}
                                    </Tag>
                                ))}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Контактная информация">{info.contact_info}</Descriptions.Item>
                        <Descriptions.Item label="Дата последнего обновления">
                            {new Date(info.last_updated).toLocaleDateString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Дата создания">
                            {new Date(info.createdAt).toLocaleDateString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Категория">
                            {categories.find((category) => category.id === info.category_id)?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Действия">
                            <Button onClick={downloadPdf}>
                                Скачать PDF
                            </Button>
                        </Descriptions.Item>

                    </Descriptions>
                </Card>
            )}

            {/* Заголовок */}
            <Space style={{marginBottom: '24px' }}>
                <Title level={2}>Статистика посещений ресурса</Title>
            </Space>

            {/* График посещений */}
            {loading ? (
                <Spin size="large" />
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={finalData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/*<CartesianGrid strokeDasharray="3 3" />*/}
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        {/*<Legend />*/}
                        <Line
                            type="monotone"
                            dataKey="visits"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
        </>

    );
};

export default ResourcePage;
