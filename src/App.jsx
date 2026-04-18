import { getAppData } from "./services/appDataService";
import AppRouter from "./router";

const appData = getAppData();

export default function App() {
  return <AppRouter appData={appData} />;
}
