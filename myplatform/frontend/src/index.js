import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/index";
import persistor from "./store/persistStore";
import history from "./utils/historyUtils";
import { authLogin } from "./actions/authActions";
import App from "./components/App";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";

import "font-awesome/css/font-awesome.min.css";
import "@/assets/css/bootstrap.min.css";
import "@/assets/css/paper-dashboard_mng.css";
// styles
import "@/assets/less/lib/styles/index.less";
// import '@/assets/css/rsuite-default.css';
// import 'rsuite/dist/styles/rsuite-default.css';
// import 'rsuite/lib/styles/index.less';
// import 'redux-notifications/lib/styles.css';

const token = localStorage.getItem("token");

if (token) {
  store.dispatch(authLogin(token));
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
