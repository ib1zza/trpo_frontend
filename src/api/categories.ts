import axios from 'axios';
import config from "./config";
const {BASE_URL} = config;

// Типы для работы с категориями
export interface ICategory {
    id: number;
    name: string;
}

export interface CreateCategoryData {
    name: string;
}

// Базовый URL для API
const API_URL = `${BASE_URL}/categories`;

// Функция для получения всех категорий
export const getAllCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Функция для создания новой категории
export const createCategory = async (data: CreateCategoryData): Promise<ICategory> => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Функция для получения категории по ID
export const getCategoryById = async (id: number): Promise<ICategory> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        throw error;
    }
};

// Функция для обновления категории по ID
export const updateCategory = async (id: number, data: CreateCategoryData): Promise<ICategory> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating category with ID ${id}:`, error);
        throw error;
    }
};

// Функция для удаления категории по ID
export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
        throw error;
    }
};
