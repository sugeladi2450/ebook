import { Alert, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./router";
import { fetchAppData } from "./services/appDataService";

export default function App() {
  const [appData, setAppData] = useState(null);
  const [error, setError] = useState(null);
  const router = useMemo(() => (appData ? createAppRouter(appData) : null), [appData]);

  useEffect(() => {
    let ignored = false;

    async function loadAppData() {
      try {
        const loadedAppData = await fetchAppData();
        if (!ignored) {
          setAppData(loadedAppData);
        }
      } catch (loadError) {
        if (!ignored) {
          setError(loadError);
        }
      }
    }

    loadAppData();

    return () => {
      ignored = true;
    };
  }, []);

  if (error) {
    return (
      <div className="site-boot">
        <Alert
          message="页面配置加载失败"
          description={error.message || "请确认后端服务已经启动。"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!router) {
    return (
      <div className="site-boot" aria-label="页面加载中">
        <Spin size="large" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
