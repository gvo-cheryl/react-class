/* eslint-disable */
import React, { useEffect, useState, memo } from "react";
import { Table, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { increase, increaseAsync } from "../reducer/cartReducer";

function Cart(props) {
  // state 쉽게 사용하는 방법
  let state = useSelector((state) => state.cartReducer);
  let dispatch = useDispatch();

  // OTHER PRACTICE VARIABLE BELOW
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);
  useEffect(() => {
    if (count != 0 && count < 3) setAge(++age);
  }, [count]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {props.state.map((prod, i) => {
            return (
              <tr key={i}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.quantity}</td>
                <td>
                  <Button
                    className="btn-sm btn-secondary"
                    onClick={() => {
                      props.dispatch(increaseAsync(i));
                    }}
                  >
                    +
                  </Button>
                  <Button
                    className="btn-sm btn-secondary"
                    onClick={() => {
                      props.dispatch({ type: "decrease", id: i });
                    }}
                  >
                    -
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {props.alertIsOpen === true && (
        <div className="cart-alert">
          <p>20% OFF FOR NOW</p>
          <Button
            className="btn-sm btn-secondary"
            onClick={() => {
              props.dispatch({ type: "close" });
            }}
          >
            CLOSE
          </Button>
        </div>
      )}

      {/* OTHER PRACTICE */}
      <div className="container mt-5 border p-3">
        <div>Hi I'm {age}</div>
        <button
          className="btn-sm btn-warning"
          onClick={() => {
            setCount(++count);
          }}
        >
          ADD
        </button>
      </div>

      {/* OTHER PRACTICE */}
      <div className="container border mt-5">
        <Parent name="CHERYL" age="30" />
      </div>
    </div>
  );
}

function Parent(props) {
  return (
    // props가 하나만 바뀌어도 모든 component가 재렌더링 된다 -> memo활용
    <div className="p-3">
      <Child1 name={props.name} />
      <Child2 age={props.age} />
    </div>
  );
}

function Child1(props) {
  useEffect(() => {
    console.log("Rendered1");
  });
  return <div className="text-warning">CHILD1[name] {props.name}</div>;
}

// props가 하나만 바뀌어도 모든 component가 재렌더링 된다 -> memo활용
// 기존 - 새로운 props를 비교하여 렌더링을 안하는 거기 때문에 props가 많으면 성능에 좋지 않음
let Child2 = memo(function (props) {
  useEffect(() => {
    console.log("Rendered2");
  });
  return <div className="text-warning">CHILD2[age] {props.age}</div>;
});

function stateToProps(state) {
  // reducer 하나인 경우
  // return {
  //   state: state,
  //   // id: state[0].id,
  //   // productName: state[0].name,
  //   // quentity: state[0].quentity,
  // };

  // reducer 2개 이상
  return {
    state: state.cartReducer,
    alertIsOpen: state.alertReducer,
  };
}

export default connect(stateToProps)(Cart);

// export default Cart;
