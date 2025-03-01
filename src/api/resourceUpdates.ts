import axios from 'axios';
import config from './config';
const { BASE_URL } = config;

// Тип для данных обновления ресурса
export interface ResourceUpdate {
    id: number;
    resource_id: number;
    update_description: string;
    createdAt: string;
    updatedAt: string;
}

// Тип для создания обновления ресурса
export interface CreateResourceUpdateData {
    resource_id: number;
    update_description: string;
}

// Базовый URL для API
const API_URL = `${BASE_URL}/resource-updates`;

// Функция для создания записи об обновлении ресурса
export const createResourceUpdate = async (data: CreateResourceUpdateData): Promise<ResourceUpdate> => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating resource update:', error);
        throw error;
    }
};

// Функция для получения всех записей об обновлениях ресурсов
export const getAllResourceUpdates = async (): Promise<ResourceUpdate[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all resource updates:', error);
        throw error;
    }
};

// Функция для получения записей об обновлениях по конкретному ресурсу
export const getUpdatesByResource = async (resourceId: number): Promise<ResourceUpdate[]> => {
    try {
        const response = await axios.get(`${API_URL}/resource/${resourceId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching updates for resource with ID ${resourceId}:`, error);
        throw error;
    }
};
