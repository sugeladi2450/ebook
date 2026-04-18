import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./router";
import { getAppData } from "./services/appDataService";

const appData = getAppData();
const router = createAppRouter(appData);

export default function App() {
  return <RouterProvider router={router} />;
}
