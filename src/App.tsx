import { ConfigProvider } from "antd";
import faIR from "antd/lib/locale/fa_IR";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Application from "./Application/Application";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <ConfigProvider locale={faIR} direction="rtl">
        <QueryClientProvider client={queryClient}>
          <Application />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
