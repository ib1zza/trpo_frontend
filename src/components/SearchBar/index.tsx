import React, { useState } from "react";
import { Input, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar: React.FC = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const initialSearchTerm = queryParams.get("q") || "";

    const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
    const navigate = useNavigate();

    // Обработчик изменения значения в поисковой строке
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Обработчик нажатия на кнопку поиска
    const handleSearch = () => {
        if (searchTerm.trim()) {
            // Переадресация на страницу с результатами поиска
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    // Получаем поисковый запрос из URL (если он есть)

    return (
        <div style={{ display: "flex", alignItems: "stretch", gap: "8px", height: 40, marginBottom: 16 }}>
            <Input
                placeholder="Введите поисковый запрос"
                value={searchTerm}
                onChange={handleInputChange}
                onPressEnter={handleSearch} // Поиск при нажатии Enter
                style={{ width: "100%" }}
            />
            <Button type="primary" onClick={handleSearch} style={{
                height: "100%",
            }}>
                Поиск
            </Button>
        </div>
    );
};

export default SearchBar;
