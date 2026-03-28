import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "../features/auth/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />,
            }
        ]
    }
])