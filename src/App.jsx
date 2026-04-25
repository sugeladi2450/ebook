import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./router";
import { getAppData } from "./services/appDataService";

const appData = getAppData();
const router = createAppRouter(appData);

// 根组件：负责准备 appData 和 router，并将 RouterProvider 渲染到页面上，提供整个应用的路由功能
export default function App() {
  return <RouterProvider router={router} />;
}
