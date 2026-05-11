import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { appConfig } from "./config/appConfig";
import { createAppRouter } from "./router";

export default function App() {
  const router = useMemo(() => createAppRouter(appConfig), []);

  return <RouterProvider router={router} />;
}
