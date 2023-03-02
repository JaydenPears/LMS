import React from "react"
import { Routes, Route } from "react-router-dom";
import { arrayRoutes } from "../router";

const AppRouter = () => {
    return (
        <Routes>
            {arrayRoutes.map(route => 
                <Route
                    key={route.id}
                    path={route.path}
                    element={route.element}
                    exact={route.exact}
                />    
            )}
        </Routes>
    )
};

export default AppRouter;