import {Link, useParams} from "react-router-dom";
import { getAllResourcesByCategory, Resource } from "../../api/resourses.ts";
import {useEffect, useMemo, useState} from "react";
import {Card, Select, Space, Typography} from "antd";
import {useAppDispatch, useAppSelector} from "../../services/store.ts";
import {useCategories} from "../../hooks/data/useCategories.ts";
import {AppRoutes} from "../../components/AppRouter";
import {ArrowLeftOutlined} from "@ant-design/icons";
import BackLink from "../../components/ui/BackLink";
const {Title} = Typography;
const { Option } = Select;

const { Link: AntLink } = Typography;

const ResourcesByCategory = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [sortKey, setSortKey] = useState<"title" | "updatedAt">("updatedAt");
    const [viewMode, setViewMode] = useState<"full" | "short">("short");
    const { id } = useParams();

    const categories = useCategories();

    const displayCategoryName = useMemo(() => {
        if (id === undefined || Number.isNaN(+id)) {
            return 'Unknown';
        }

        return categories.find((c) => c.id === +id)?.name || "Unknown";
    }, [categories, id])

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await getAllResourcesByCategory(Number(id));
                setResources(response);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };
        fetchResources();
    }, [id]);

    if (!id) {
        return null;
    }

    const sortedResources = [...resources].sort((a, b) => {
        if (sortKey === "title") {
            return a.title.localeCompare(b.title);
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return (
        <div>
           <BackLink/>
            {/*<Link to={AppRoutes.HOME}>На главную</Link>*/}
            <Title level={2} color={"white"}>Категория: {displayCategoryName}</Title>
            <Space style={{ marginBottom: 16, marginTop: 16 }}>

                <span>Сортировка:</span>
                <Select value={sortKey} onChange={(value) => setSortKey(value)}>
                    <Option value="updatedAt">По дате обновления</Option>
                    <Option value="title">По названию (А-Я)</Option>
                </Select>

                <span>Режим отображения:</span>
                <Select value={viewMode} onChange={(value) => setViewMode(value)}>
                    <Option value="short">Краткий</Option>
                    <Option value="full">Полный</Option>
                </Select>
            </Space>

            {sortedResources.map((resource) => (
                <Card
                    key={resource.id}
                    title={<a href={resource.url}>{resource.title}</a>}
                    style={{ marginBottom: 16, textAlign: "left" }}

                >
                    {viewMode === "full" ? (
                        <>
                            <p><strong>Описание:</strong> {resource.description}</p>
                            <p><strong>Последнее обновление:</strong> {new Date(resource.updatedAt).toLocaleString()}</p>
                            <p><strong>Контакт:</strong> {resource.contact_info}</p>
                            <p><strong>Ключевые слова:</strong> {resource.keywords.join(", ")}</p>
                            {/*<p><strong>Актуальность:</strong> {resource.}</p>*/}
                        </>
                    ) : (
                        <>
                            <p><strong>Описание:</strong> {resource.description.slice(0, 100)}...</p>
                            <p><strong>Обновлено:</strong> {new Date(resource.updatedAt).toLocaleDateString()}</p>
                        </>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default ResourcesByCategory;
