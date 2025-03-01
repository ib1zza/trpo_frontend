import axios from 'axios';
import config from './config';
const { BASE_URL } = config;

// Тип для данных визита ресурса
export interface ResourceVisit {
    id: number;
    user_id: number;
    resource_id: number;
    visit_date: string;
    createdAt: string;
    updatedAt: string;
}

// Тип для создания визита ресурса
export interface CreateResourceVisitData {
    user_id: number;
    resource_id: number;
}

// Базовый URL для API
const API_URL = `${BASE_URL}/resource-visits`;

// Функция для создания визита ресурса
export const createResourceVisit = async (data: CreateResourceVisitData): Promise<ResourceVisit> => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании визита ресурса:', error);
        throw error;
    }
};

// Функция для получения всех визитов ресурсов
export const getAllResourceVisits = async (): Promise<ResourceVisit[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении всех визитов ресурсов:', error);
        throw error;
    }
};

// Функция для получения визитов по ресурсу
export const getVisitsByResource = async (resourceId: number): Promise<ResourceVisit[]> => {
    try {
        const response = await axios.get(`${API_URL}/resource/${resourceId}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении визитов для ресурса с ID ${resourceId}:`, error);
        throw error;
    }
};

// Функция для получения визитов по пользователю
export const getVisitsByUser = async (userId: number): Promise<ResourceVisit[]> => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении визитов для пользователя с ID ${userId}:`, error);
        throw error;
    }
};
