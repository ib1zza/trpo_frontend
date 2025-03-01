import { JSX } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import ResourcesByCategory from "../../pages/ResourcesByCategory";
import LoginPage from "../../pages/Login";
import RegisterPage from "../../pages/Register";
import RegisterOwnerPage from "../../pages/RegisterOwner";
import CreateResourcePage from "../../pages/CreateResource";
import AccountPage from "../../pages/Account";
import EditResourcePage from "../../pages/EditResource";
import SearchResultsPage from "../../pages/SearchResults";
import ManageUsersPage from "../../pages/ManageUsers";
import GetResourcePage from "../../pages/GetResource";
import ResourcePage from "../../pages/ResourcePage"; // Импортируем новый компонент

export enum AppRoutes {
    HOME = '/',
    RESOURCES_BY_CATEGORY = '/resources/category/:id',
    RESOURCE_BY_ID = '/resources/:id',
    LOGIN = '/login',
    REGISTER = '/register',
    REGISTER_OWNER = '/register/owner',
    CREATE_RESOURCE = '/create',
    ACCOUNT = '/account',
    EDIT_RESOURCE = '/resources/edit/:id',
    SEARCH_RESULTS = '/search', // Новый маршрут для результатов поиска
    MANAGE_USERS = '/manage-users',
    GET_RESOURCE = '/get-resource'
}

const RouteConfig: Record<AppRoutes, { path: string, element: JSX.Element }> = {
    [AppRoutes.HOME]: { path: AppRoutes.HOME, element: <Home /> },
    [AppRoutes.RESOURCES_BY_CATEGORY]: { path: AppRoutes.RESOURCES_BY_CATEGORY, element: <ResourcesByCategory /> },
    [AppRoutes.RESOURCE_BY_ID]: { path: AppRoutes.RESOURCE_BY_ID, element: <ResourcePage /> },
    [AppRoutes.LOGIN]: { path: AppRoutes.LOGIN, element: <LoginPage /> },
    [AppRoutes.REGISTER]: { path: AppRoutes.REGISTER, element: <RegisterPage /> },
    [AppRoutes.REGISTER_OWNER]: { path: AppRoutes.REGISTER_OWNER, element: <RegisterOwnerPage /> },
    [AppRoutes.CREATE_RESOURCE]: { path: AppRoutes.CREATE_RESOURCE, element: <CreateResourcePage /> },
    [AppRoutes.ACCOUNT]: { path: AppRoutes.ACCOUNT, element: <AccountPage /> },
    [AppRoutes.EDIT_RESOURCE]: { path: AppRoutes.EDIT_RESOURCE, element: <EditResourcePage /> },
    [AppRoutes.SEARCH_RESULTS]: { path: AppRoutes.SEARCH_RESULTS, element: <SearchResultsPage /> },
    [AppRoutes.MANAGE_USERS]: { path: AppRoutes.MANAGE_USERS, element: <ManageUsersPage /> },
    [AppRoutes.GET_RESOURCE]: { path: AppRoutes.GET_RESOURCE, element: <GetResourcePage /> }
    // Новый маршрут
}

const AppRouter = () => {
    return (
        <Routes>
            {
                Object.entries(RouteConfig).map(([key, { path, element }]) => (
                    <Route key={key} path={path} element={element} />
                ))
            }
        </Routes>
    );
};

export default AppRouter;
