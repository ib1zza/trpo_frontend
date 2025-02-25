import {JSX} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/Home";
import ResourcesByCategory from "../../pages/ResourcesByCategory";

export enum AppRoutes {
    HOME = '/',
    RESOURCES_BY_CATEGORY = '/resources/category/:id',
}

const RouteConfig: Record<AppRoutes, {path: string, element: JSX.Element}> = {
    [AppRoutes.HOME]: {path: AppRoutes.HOME, element: <Home/>},
    [AppRoutes.RESOURCES_BY_CATEGORY]: {path: AppRoutes.RESOURCES_BY_CATEGORY, element: <ResourcesByCategory/>},
}

const AppRouter = () => {
    return (
        <Routes>
            {
                Object.entries(RouteConfig).map(([key, {path, element}]) => <Route key={key} path={path} element={element}/>)
            }
        </Routes>
    );
};

export default AppRouter;
