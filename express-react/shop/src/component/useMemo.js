/* eslint-disable */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

function UseMemo(props) {
  let dispatch = useDispatch();
  let state = useSelector((state) => state.userReducer);
  let [nameInput, setNameInput] = useState("");
  let [emailInput, setEmailInput] = useState("");
  let [toggle, setToggle] = useState(false);

  // userMemo를 사용하여 성능최적화
  // : input이 onChange될때마다 렌더링을 하는게 아니라 state가 바뀔때만 렌더링하도록 한다
  let count = useMemo(() => countActiveUser(state), [state]);

  function countActiveUser(state) {
    console.log("counting active users...");
    return state.filter((user) => user.active).length;
  }

  // useCallback
  // 변경되지 않은 경우 함수 재사용
  let onToggle = useCallback(() => {
    toggle == true ? setToggle(false) : setToggle(true);
  });

  return (
    <div className="practice-card">
      <h2>useMemo</h2>
      <span>active: </span>
      <span className="text-primary"> {count}</span>
      <div className="mb-3">
        {state.map((user, i) => (
          <div key={i}>
            <span
              className={user.active == true ? "text-warning fw-bold" : null}
              onClick={() => {
                props.dispatch({
                  type: "updateActive",
                  data: { id: user.id, active: !user.active },
                });
              }}
            >
              {user.name}
            </span>
            <span>({user.email})</span>
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          className="form-control"
          placeholder="NAME"
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
        <input
          className="form-control"
          placeholder="EMAIL"
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
        <button
          className="btn btn-secondary"
          onClick={() => {
            let newUser = {
              id: props.state.length,
              name: nameInput,
              email: emailInput,
              active: false,
            };
            props.dispatch({ type: "add", data: newUser });
          }}
        >
          SAVE
        </button>
        <div></div>
      </div>
      <p
        className="mt-3 text-warning"
        onClick={() => {
          onToggle();
        }}
      >
        ▶︎ toggle
      </p>
      {toggle == true && (
        <div className="memo">
          <p className="fw-bold">성능최적화</p>
          <p>
            input이 onChange될때마다 렌더링을 하는게 아니라 state가 바뀔때만
            렌더링하도록 한다
          </p>
        </div>
      )}
    </div>
  );
}

function stateToProps(state) {
  return { state: state.userReducer };
}

export default connect(stateToProps)(UseMemo);
