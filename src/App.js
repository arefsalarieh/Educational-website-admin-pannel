import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// ** Router Import
import Router from "./router/Router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false, staleTime: 1000 * 6 * 5 },
      mutations: {},
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>
          <Router />
        </Suspense>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
