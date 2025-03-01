import axios from 'axios';
import config from './config';
const { BASE_URL } = config;

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    RESOURCE_OWNER = 'resource_owner',
}

// Типы для работы с пользователями
export interface IUser {
    id: number;
    username: string;
    email: string;
    user_type: UserRole;
    createdAt: string;
    updatedAt: string;
    approved?: boolean;
}

export interface CreateUserData {
    email: string;
    password: string;
    user_type: UserRole;
}

export interface UpdateUserData {
    email?: string;
    password?: string;
    user_type?: UserRole;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string,
    user: IUser
}

// Базовый URL для API
const API_URL = `${BASE_URL}/users`;

// Функция для получения всех пользователей
export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Функция для получения пользователя по ID
export const getUserById = async (id: number): Promise<IUser> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
};

// Функция для создания нового пользователя
export const createUser = async (data: CreateUserData): Promise<IUser> => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Функция для создания нового пользователя
export const approveUser = async (email: string): Promise<IUser> => {
    try {
        const response = await axios.post(`${API_URL}/verify`, {email});
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Функция для обновления данных пользователя по ID
export const updateUser = async (id: number, data: UpdateUserData): Promise<IUser> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
    }
};


// Функция для входа пользователя
export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};


