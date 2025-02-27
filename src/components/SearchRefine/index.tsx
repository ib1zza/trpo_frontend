import React, { useState } from "react";
import { Input, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Search } = Input;

const SearchRefine: React.FC = () => {
    const [refineTerm, setRefineTerm] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();

    // Обработчик изменения значения в строке уточнения поиска
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRefineTerm(e.target.value);
    };

    // Обработчик нажатия на кнопку уточнения поиска
    const handleRefineSearch = () => {
        if (refineTerm.trim()) {
            // Получаем текущие query-параметры
            const queryParams = new URLSearchParams(location.search);

            // Добавляем новый параметр для уточнения поиска
            queryParams.set("refine", refineTerm);

            // Переадресация на ту же страницу с обновленными query-параметрами
            navigate(`${location.pathname}?${queryParams.toString()}`);
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: 16 }}>
            <Input
                placeholder="Уточните поиск"
                value={refineTerm}
                onChange={handleInputChange}
                onPressEnter={handleRefineSearch} // Уточнение поиска при нажатии Enter
                style={{ width: 300 }}
            />
            <Button type="primary" onClick={handleRefineSearch}>
                Уточнить
            </Button>
        </div>
    );
};

export default SearchRefine;
