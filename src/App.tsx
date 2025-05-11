import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routing from "./components/routing/Routing";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      <Routing />
    </QueryClientProvider>
  );
}

export default App;
