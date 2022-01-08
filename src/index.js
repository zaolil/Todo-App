// lib
import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { toast } from "react-toastify";
import store from "./redux/store";
import { Provider } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// import FetchClient from "./service/defaultAPI/FetchClient";
import setAuthToken from "./untils/defaultAPI/setAuthToken";

setAuthToken();

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      toast.warn("This token is invalidated");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
