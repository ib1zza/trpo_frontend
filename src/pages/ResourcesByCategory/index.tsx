import {useParams} from "react-router-dom";
import {getAllResourcesByCategory, Resource} from "../../api/resourses.ts";
import {useEffect, useMemo, useState} from "react";
import {Card, Pagination, Select, Space, Typography} from "antd";
import {useCategories} from "../../hooks/data/useCategories.ts";
import BackLink from "../../components/ui/BackLink";

const {Title} = Typography;
const {Option} = Select;

const ResourcesByCategory = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [sortKey, setSortKey] = useState<"title" | "updatedAt">("updatedAt");
    const [viewMode, setViewMode] = useState<"full" | "short">("short");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // По умолчанию 5 элементов на странице
    const {id} = useParams();

    const categories = useCategories();

    const displayCategoryName = useMemo(() => {
        if (id === undefined || Number.isNaN(+id)) {
            return 'Unknown';
        }

        return categories.find((c) => c.id === +id)?.name || "Unknown";
    }, [categories, id]);

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

    // Вычисляем индекс последнего и первого элемента на текущей странице
    const indexOfLastResource = currentPage * itemsPerPage;
    const indexOfFirstResource = indexOfLastResource - itemsPerPage;
    const currentResources = sortedResources.slice(indexOfFirstResource, indexOfLastResource);

    return (
        <div>
            <BackLink/>
            <Title level={2} color={"white"}>Категория: {displayCategoryName}</Title>
            <Space direction="vertical" style={{marginBottom: 16, marginTop: 16}}>
                <Space>
                    <span>Сортировка:</span>
                    <Select value={sortKey} onChange={(value) => setSortKey(value)}>
                        <Option value="updatedAt">По дате обновления</Option>
                        <Option value="title">По названию (А-Я)</Option>
                    </Select>
                </Space>


                <Space>
                    <span>Сортировка по:</span>
                    <Select value={viewMode} onChange={(value) => setViewMode(value)}>
                        <Option value="relevance">Релевантности</Option>
                        <Option value="date">Дате изменения</Option>
                    </Select>
                </Space>

                <Space>
                    <span>Элементов на странице:</span>
                    <Select value={itemsPerPage} onChange={(value) => {
                        setItemsPerPage(value);
                        setCurrentPage(1); // Сбрасываем на первую страницу при изменении количества элементов
                    }}>
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={25}>25</Option>
                    </Select>
                </Space>
            </Space>

            {currentResources.map((resource) => (
                <Card
                    key={resource.id}
                    title={<a href={resource.url}>{resource.title}</a>}
                    style={{marginBottom: 16, textAlign: "left"}}
                >
                    {viewMode === "full" ? (
                        <>
                            <p><strong>Описание:</strong> {resource.description}</p>
                            <p><strong>Последнее обновление:</strong> {new Date(resource.updatedAt).toLocaleString()}
                            </p>
                            <p><strong>Контакт:</strong> {resource.contact_info}</p>
                            <p><strong>Ключевые слова:</strong> {resource.keywords.join(", ")}</p>
                        </>
                    ) : (
                        <>
                            <p><strong>Описание:</strong> {resource.description.slice(0, 100)}...</p>
                            <p><strong>Обновлено:</strong> {new Date(resource.updatedAt).toLocaleDateString()}</p>
                        </>
                    )}
                </Card>
            ))}

            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={sortedResources.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false} // Скрываем выбор размера страницы, так как он уже есть выше
                style={{marginTop: 16}}
            />
        </div>
    );
};

export default ResourcesByCategory;
