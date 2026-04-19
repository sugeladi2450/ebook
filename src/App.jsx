import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./router";
import { getAppData } from "./services/appDataService";

const appData = getAppData();
const router = createAppRouter(appData);

// 根组件：负责渲染路由，让整个项目的页面跳转生效
export default function App() {
  return <RouterProvider router={router} />;
}
