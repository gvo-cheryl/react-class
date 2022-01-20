/* eslint-disable */
import "./App.css";
import React, { useState, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./component/Navbar.js";
import Data from "./data";
// 현재 페이지에서 바로 필요없는 component들은 lazy loading! -> lazy, Suspense 활용
let Detail = lazy(() => import("./component/Detail.js")); // 해당 component를 <Suspense></Suspense>로 감싸준다.
import Main from "./component/Main";
import Cart from "./component/Cart.js";
import Practice from "./component/Practice.js";

export let StockContext = React.createContext(); // 같은 변수값을 공유할 범위 생성

// 모든 데이터는 상위 -> 하위로 이동하는 것이 베스트
function App() {
  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10, 11, 12]);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <StockContext.Provider value={stock}>
            <Main />
          </StockContext.Provider>
        </Route>
        <Route path="/detail/:id">
          <Suspense fallback={<div>Loading...</div>}>
            <Detail shoes={shoes} stock={stock} setStock={setStock} />
          </Suspense>
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route path="/practice">
          <Practice />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

// Ajax
// 1) jquery : $.ajax()
// 2) axios : axios.get()
// 3) 기본자바스크립트 : fetch()
