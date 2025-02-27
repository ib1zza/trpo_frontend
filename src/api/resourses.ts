import axios from 'axios';
import config from './config';
const { BASE_URL } = config;

// Типы для работы с ресурсами
export interface Resource {
    id: number;
    title: string;
    url: string;
    description: string;
    last_updated: string;
    contact_info: string;
    keywords: string[];
    category_id: number;
    owner_id: number;
    createdAt: string;
    updatedAt: string;
    relevance: number;
}

export interface CreateResourceData {
    title: string;
    url: string;
    description: string;
    category_id: number;
    owner_id: number;
    contact_info: string;
    keywords: string[];
}

export interface SearchResourcesData {
    query: string[];
    sortBy: 'relevance' | 'date';
}

export interface RefineSearchData {
    previousResults: Resource[];
    query: string[];
    sortBy: 'relevance' | 'date';
}

// Базовый URL для API
const API_URL = `${BASE_URL}/resources`;

// Функция для поиска ресурсов
export const searchResources = async (data: SearchResourcesData): Promise<Resource[]> => {
    try {
        const response = await axios.post(`${API_URL}/search`, data);
        return response.data;
    } catch (error) {
        console.error('Error searching resources:', error);
        throw error;
    }
};

// Функция для уточнения поиска ресурсов
export const refineSearch = async (data: RefineSearchData): Promise<Resource[]> => {
    try {
        const response = await axios.post(`${API_URL}/refine`, data);
        return response.data;
    } catch (error) {
        console.error('Error refining search for resources:', error);
        throw error;
    }
};

// Функция для создания нового ресурса
export const createResource = async (data: CreateResourceData): Promise<Resource> => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating resource:', error);
        throw error;
    }
};

// Функция для получения всех ресурсов по категории
export const getAllResourcesByCategory = async (categoryId: number): Promise<Resource[]> => {
    try {
        const response = await axios.get(`${API_URL}/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching resources by category:', error);
        throw error;
    }
};

// Функция для получения всех ресурсов по категории
export const getAllResourcesByUser = async (userId: number): Promise<Resource[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching resources by category:', error);
        throw error;
    }
};

// Функция для получения всех ресурсов
export const getAllResources = async (): Promise<Resource[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all resources:', error);
        throw error;
    }
};

// Функция для получения ресурса по ID
export const getResourceById = async (id: number): Promise<Resource> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching resource with ID ${id}:`, error);
        throw error;
    }
};

// Функция для обновления ресурса по ID
export const updateResource = async (id: number, data: CreateResourceData): Promise<Resource> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating resource with ID ${id}:`, error);
        throw error;
    }
};

// Функция для удаления ресурса по ID
export const deleteResource = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting resource with ID ${id}:`, error);
        throw error;
    }
};
