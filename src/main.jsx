import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom/client";
import "../custom.scss";
import App from "./App.jsx";
import "./index.css";

import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { antdTheme } from "./themeAntd.js";

$(document).ready(function () {
  // Your jQuery code here
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={antdTheme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);
