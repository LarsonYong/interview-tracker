import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "../features/auth/ProtectedRoute.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import DashboardPage from "../pages/DashboardPage";
import InterviewsPage from "../pages/InterviewsPage.tsx";
import AnalyticsPage from "../pages/AnalyticsPage.tsx"
import SettingsPage from "../pages/SettingsPage.tsx"

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
            },
            {
                path: "/interviews",
                element: <InterviewsPage />
            },
            {
                path: "/analytics",
                element: <AnalyticsPage />
            },
            {
                path: "/settings",
                element: <SettingsPage />
            }
        ]
    }
])