import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// ** Router Import
import Router from "./router/Router";

const App = () => {

  const client = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false, staleTime: 1000*6*5}, mutations:{}}})

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </QueryClientProvider>

  );
};

export default App;

