import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    createUser,
    CreateUserData,
    getUserById,
    IUser,
    LoginData,
    loginUser,
    updateUser,
    UpdateUserData
} from '../../api/User';
import {getAllResourcesByUser, Resource} from "../../api/resourses.ts";

interface IUserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    resources: Resource[] | null;
}

const initialState: IUserState = {
    user: null,
    loading: false,
    error: null,
    resources: null,
};

// Thunk для получения пользователя по ID
export const fetchUserById = createAsyncThunk('users/fetchById', async (id: number) => {
    const user = await getUserById(id);
    return user;
});

// Thunk для создания нового пользователя
export const createNewUser = createAsyncThunk('users/create', async (data: CreateUserData) => {
    const user = await createUser(data);

    if (user) {
        localStorage.setItem('user', JSON.stringify({...user}));
    }
    return user;
});

// Thunk для обновления пользователя
export const updateExistingUser = createAsyncThunk('users/update', async ({id, data}: {
    id: number;
    data: UpdateUserData
}) => {
    const user = await updateUser(id, data);
    return user;
});


// Thunk для входа пользователя
export const loginUserThunk = createAsyncThunk('users/login', async (data: LoginData) => {
    const response = await loginUser(data);

    if (response.user) {
        localStorage.setItem('user', JSON.stringify({...response.user, password: data.password}));
    }
    return response.user; // Возвращаем пользователя после входа
});

export const getUsersResources = createAsyncThunk('users/resources', async (userId: number) => {
    const resources = await getAllResourcesByUser(userId);
    return resources;
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        clearUser(state) {
            state.user = null;
            state.resources = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
            .addCase(createNewUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(createNewUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create user';
            })
            .addCase(updateExistingUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExistingUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateExistingUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user';
            })
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.user = action.payload; // Сохраняем пользователя после входа
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false;
                localStorage.removeItem('user');
                state.error = action.error.message || 'Failed to log in';
            })
            .addCase(getUsersResources.fulfilled, (state, action: PayloadAction<Resource[]>) => {
                state.resources = action.payload;
            })
    },
});

export const {clearError, clearUser} = userSlice.actions;

export default userSlice.reducer;
