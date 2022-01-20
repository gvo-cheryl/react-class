import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; //HashRouter

import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import cartReducer from "./reducer/cartReducer.js";
import alertReducer from "./reducer/alertReducer.js";
import userReducer from "./reducer/userReducer.js";
import myLogger from "./middleware/myLogger";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

// 하나만 사용하는 경우
// let store = createStore(reducur);
// 2개 이상
let store = createStore(
  combineReducers({ cartReducer, alertReducer, userReducer }),
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

// HashRouter : /#/, 보다 안정적인 라우팅, #뒤에 붙는 경로는 절대 서버로 전달되지 않음
// BrowserRouter : #없음
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
