import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AuthProvider } from "./features/auth/auth-provider";
import { DevLogPanel } from "./components/dev/DevLogPanel";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <DevLogPanel />
    </AuthProvider>
  );
}