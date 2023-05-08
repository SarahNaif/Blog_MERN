import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.css'
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import store from "./store";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
