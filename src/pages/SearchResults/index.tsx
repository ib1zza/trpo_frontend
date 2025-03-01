import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {useSearch} from "../../hooks/data/useSearch.ts";
import {Card, Select, Space} from "antd";
import SearchRefine from "../../components/SearchRefine";
import BackLink from "../../components/ui/BackLink";

const {Option} = Select;

const SearchResultsPage: React.FC = () => {
    const {
        search,
        refinedResources,
        refineSearch,
        isLoading,
        resources
    } = useSearch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("q");
    const refineTerm = queryParams.get("refine");

    const [viewMode, setViewMode] = useState<"full" | "short">("short");
    const [sortBy, setSortBy] = useState<"relevance" | "date">("relevance");

    useEffect(() => {
        if (refineTerm) {
            refineSearch(refineTerm, sortBy);
            return;
        }
        if (searchTerm) {
            search(searchTerm, sortBy);
            return;
        }
    }, [searchTerm, sortBy, refineTerm]);



    return (
        <div>
            <BackLink/>
            <SearchBar/>
            <SearchRefine/>
            <Space>
                <Space>
                    <span>Режим отображения:</span>
                    <Select value={viewMode} onChange={(value) => setViewMode(value)}>
                        <Option value="short">Краткий</Option>
                        <Option value="full">Полный</Option>
                    </Select>
                </Space>

                <Space>
                    <span>Сортировка по:</span>
                    <Select value={sortBy} onChange={(value) => setSortBy(value)}>
                        <Option value="relevance">Релевантности</Option>
                        <Option value="date">Дате изменения</Option>
                    </Select>
                </Space>
            </Space>

            <h1 style={{
                marginBottom: 16,
            }}>
                Результаты поиска для: {searchTerm}
                {refineTerm && (<span> (Уточнение: {refineTerm})</span>)}
            </h1>
            {/* Здесь можно отобразить результаты поиска */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {resources.length || refinedResources.length > 0 ? (
                        <ul>
                            {(refinedResources.length ? refinedResources : resources).map((resource) => (
                                <Card
                                    key={resource.id}
                                    title={<a href={resource.url}>{resource.title}</a>}
                                    style={{marginBottom: 16, textAlign: "left"}}
                                    extra={<Link to={`/resources/${resource.id}`}>Подробнее</Link>}
                                >
                                    {viewMode === "full" ? (
                                        <>
                                            <p><strong>Описание:</strong> {resource.description}</p>
                                            <p><strong>Последнее
                                                обновление:</strong> {new Date(resource.updatedAt).toLocaleString()}</p>
                                            <p><strong>Контакт:</strong> {resource.contact_info}</p>
                                            <p><strong>Ключевые слова:</strong> {resource.keywords.join(", ")}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p><strong>Описание:</strong> {resource.description.slice(0, 100)}...</p>
                                            <p>
                                                <strong>Обновлено:</strong> {new Date(resource.updatedAt).toLocaleDateString()}
                                            </p>
                                        </>
                                    )}
                                </Card>
                            ))}
                        </ul>
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;
