/* eslint-disable */
import React, { useEffect, useMemo, useState } from "react";
import { Button, Nav, NavLink, NavItem } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components"; // 독립적인 css가능 : 선택사항
import "../Detail.scss";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
// sass : css를 프로그래밍 언어스럽게 작성하기 위한 엔진 preprocessor
// 브라우저는 sass문법을 모르기 때문에 sass로 작성한 파일을 다시 css로 컴파일 해야함

let Box = styled.div`
  padding: 20px;
`;

let Title = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

function Detail(props) {
  let history = useHistory();
  let { id } = useParams();
  let [alert, setAlert] = useState(true);
  let [inputValue, setInputValue] = useState("");
  let [inputHidden, setInputHidden] = useState(false);
  let [tab, setTab] = useState(0);
  let [tabSwitch, setTabSwitch] = useState(false);
  let [inputQty, setInputQty] = useState(0);
  let stock = props.stock;
  let localStorage = window.localStorage;
  let watched = localStorage.getItem("watched");

  // useMemo 성능 최적화 방법 중 하나
  // watched가 변경될때만 addBookmark라는 함수 실행
  let useMemoPrac = useMemo(() => addBookmark(watched), [watched]);
  useEffect(() => {
    addBookmark(watched);
  }, []);

  function addBookmark(watched) {
    if (watched == null) {
      localStorage.setItem("watched", JSON.stringify([id]));
    } else {
      watched = JSON.parse(watched);
      watched.push(id);
      watched = [...new Set(watched)];
      localStorage.setItem("watched", JSON.stringify(watched));
    }
  }

  // shoes 데이터 중 id 값을 찾아 해당 상품 리턴
  let shoe = props.shoes.find(function (shoe) {
    return shoe.id == id;
  });

  // component가 보일때, 업데이트될 때 실행 :
  // - 여러개 사용 가능/ 순서대로 실행
  // - return 사용 가능
  useEffect(() => {
    console.log("useEffect(1)");
    let timeOut = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    }; // detail component가 사라질때 사라지도록 설정: 페이지 이동 시 생길 수 있는 버그 차단
  }, [alert]); // []를 입력하면 useEffect의 실행조건 지정 : 해당 변수의 변경이 이루어질때만 실행
  // 빈칸이면, 공백이 변경 될때만 useEffect실행: 따라서 맞는 조건이 없음으로 처음에만 실행되고 영영 실행되지 않음

  return (
    <div className="container">
      <Box>
        <Title color={"gray"}>Detail</Title>
        <Title className="red">Detail</Title>
      </Box>
      {alert === true && (
        <div className="d-flex">
          <div className="my-alert">
            <p>재고가 얼마 남지 않았습니다. </p>
          </div>
          <div className="extend">
            <p>@extend Test </p>
          </div>
          <div className="mix-in">
            <p>@mixin Test </p>
          </div>
        </div>
      )}
      {inputHidden === true && inputValue}
      <div className="d-flex mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          className="btn-secondary"
          onClick={() => {
            setInputHidden(true);
          }}
        >
          submit
        </Button>
      </div>
      <div className="row">
        <div className="col-md-6">
          <img src={props.shoes[id].url} width="100%" alt="img" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoe.title}</h4>
          <p>{shoe.content}</p>
          <p>{shoe.price}</p>
          <DetailStock stock={props.stock} />
          <div className="container d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Quntity"
              onChange={(e) => {
                setInputQty(Number(e.target.value));
              }}
            />
          </div>
          <button
            className="btn btn-danger m-2"
            onClick={() => {
              props.setStock(stock - 1);
              console.log("order");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-secondary m-2"
            onClick={() => {
              history.goBack(); // 또는 history.push("/");
            }}
          >
            BACK
          </button>
          <button
            className="btn btn-warning m-2"
            onClick={() => {
              let newOne = {
                id: props.state.length + 1,
                name: shoe.title,
                quantity: inputQty,
              };
              console.log(newOne);
              props.dispatch({ type: "addCart", data: newOne });
              if (props.state[props.state.length - 1].quantity > 20)
                history.push("/cart");
            }}
          >
            CART
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setTabSwitch(false);
              setTab(0);
            }}
          >
            Option 0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTabSwitch(false);
              setTab(1);
            }}
          >
            Option 1
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* CSSTransition : in{true,false}, className, timeout */}
      <CSSTransition in={tabSwitch} className="wow" timeout={500}>
        <TabContent tab={tab} setTabSwitch={setTabSwitch} />
      </CSSTransition>
      <div></div>
    </div>
  );
}

function stateToProps(state) {
  return {
    state: state.cartReducer,
  };
}

function TabContent(props) {
  useEffect(() => {
    props.setTabSwitch(true);
  });
  if (props.tab === 0) {
    return <div>option 0</div>;
  } else if (props.tab === 1) {
    return <div>option 1</div>;
  }
}

function DetailStock(props) {
  return <p>stock: {props.stock[0]}</p>;
}

class DetailHook extends React.Component {
  componentDidMount() {
    // component가 mount되었을때 실행 : 코드가 실제로 보일 때
  }

  componentWillUnmount() {
    // component가 unmount되어 안보일 때 : 코드가 사라질 때
  }
}

export default connect(stateToProps)(Detail);
