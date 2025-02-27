import React, {useEffect, useState} from 'react';
import { Input, Button, Tag, message } from 'antd';

interface KeywordInputProps {
    values: string[];
    onChange: (keywords: string[]) => void;
}

const KeywordInput = ({onChange, values}: KeywordInputProps) => {
    const [keyword, setKeyword] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);

    useEffect(() => {
        setKeywords(values)
    }, [values]);

    const handleAddKeyword = () => {
        if (keyword.trim() === '') {
            message.warning('Введите ключевое слово');
            return;
        }
        if (keywords.includes(keyword.trim())) {
            message.warning('Это ключевое слово уже добавлено');
            return;
        }
        setKeywords([...keywords, keyword.trim()]);
        onChange([...keywords, keyword.trim()])
        setKeyword('');
    };

    const handleRemoveKeyword = (removedKeyword: string) => {
        setKeywords(keywords.filter((kw) => kw !== removedKeyword));
    };

    return (
        <div>

            <div style={{marginBottom: '10px'}}>
                {keywords.map((kw, index) => (
                    <Tag
                        key={index}
                        closable
                        onClose={() => handleRemoveKeyword(kw)}
                        style={{margin: '5px'}}
                    >
                        {kw}
                    </Tag>
                ))}
            </div>

            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Введите ключевое слово"
                style={{width: '300px', marginRight: '10px'}}
            />
            <Button type="primary" onClick={handleAddKeyword}>
                Добавить
            </Button>

        </div>
    );
};

export default KeywordInput;
