/* eslint-disable */
import React, { useState } from "react";
import favicon from "./images/favicon.jpeg";
import "./App.css";
import {
  atom,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { Helmet } from "react-helmet";

// terminal에 뜨는 warning : eslint 에서 잡아주는 문법 주의 사항
// 최상단에 /* eslint-disable */

const textState = atom({
  key: "textState",
  default: "",
});

const charCountState = selector({
  key: "charCountState",
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const onChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br></br>
      Echo: {text}
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);
  return <>Character Count: {count}</>;
}

function App() {
  let [a, b] = [1, 100]; // ES6 destructuring 문법
  let [title, setTitle] = useState(["남자 코트 추천", "강남 맛집 추천"]); // 새로고침 없이 변경사항이 반영됨
  let [count, setCount] = useState(0);
  let [modal, setModal] = useState(false); // modal switch
  let [clickTitle, setClickTitle] = useState(0);
  let [inputValue, setInputValue] = useState("");

  function modifyTitle() {
    let newTitle = [...title]; // deep copy
    newTitle[0] = "여자 코트 추천";
    setTitle(newTitle);
  }

  function showModal(index) {
    setClickTitle(index);
    if (modal == true) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  function publichHandler() {
    let newTitle = [...title];
    if (inputValue != null && inputValue != "") {
      newTitle.push(inputValue);
      setTitle(newTitle);
      setInputValue("");
    }
  }

  return (
    <RecoilRoot>
      <Helmet>
        <title>Develop Blog</title>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="App">
        <div className="black-nav">
          <div style={{ color: "white", fontSize: "20px" }}>Develop Blog</div>
        </div>
        <div className="list">
          <button onClick={modifyTitle}>Button</button>
        </div>
        {title.map((title, i) => {
          return (
            <div className="list" key={i}>
              <h4
                onClick={() => {
                  showModal(i);
                }}
              >
                {title}
                <span
                  onClick={() => {
                    setCount(count++);
                  }}
                >
                  😀
                </span>
                {count}
              </h4>
              <p>{b}</p>
              <hr />
            </div>
          );
        })}
        {/* 행 복사 alt + shift + ↓  */}
        <input
          onChange={(e) => {
            // input value를 state에 저장 : e.target.value
            setInputValue(e.target.value);
          }}
        />
        <button onClick={publichHandler}>publish</button>
        {modal == true ? <Modal title={title} click={clickTitle} /> : null}
        // 이전 class 문법
        <br></br>
        <br></br>
        <h2>Recoil</h2>
        <CharacterCounter />
        <Profile />
      </div>
    </RecoilRoot>
  );
}

// 새로운 컴포넌트 생성 및 부모props 받아서 사용하기
function Modal(props) {
  let title = props.title;
  let click = props.click;
  return (
    <>
      <div className="modal">
        <h2>{title[click]}</h2>
        <p>date</p>
        <p>detail</p>
      </div>
    </>
  );
}

// 변수와 함수를 보관하는 덩어리
class Profile extends React.Component {
  constructor() {
    super();
    this.state = { name: "Kim", age: 30 };
  }

  changeName() {
    this.setState({ name: "PARK" });
  }

  changeNameSecound = () => {
    this.setState({ name: "HS" });
  };

  render() {
    return (
      <div className="profile">
        <h2>It's Profile.</h2>
        <p>
          NAME: {this.state.name}, AGE: {this.state.age}
        </p>
        <button onClick={this.changeName.bind(this)}>change name</button>
        <button onClick={this.changeNameSecound}>change name second</button>
      </div>
    );
  }
}

export default App;
