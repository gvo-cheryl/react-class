/* eslint-disable */
import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import JumboTron from "./Jumbotron";
import Data from "../data";
import axios from "axios";
import { StockContext } from "../App.js";
import { useHistory } from "react-router";

function Main() {
  let [shoes, setShoes] = useState(Data);
  let [spinner, setSpinner] = useState(false);
  let stock = useContext(StockContext);

  return (
    <>
      {spinner === true && (
        <div className="spinner-center text-info">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <JumboTron />
      <div className="container">
        <div className="row">
          {shoes.map((shoe, i) => {
            return <Card shoe={shoe} key={i} />; // component에 onclick X,
          })}
        </div>

        <Button
          className="btn-secondary"
          onClick={() => {
            setSpinner(true);
            axios
              .get("https://codingapple1.github.io/shop/data2.json")
              .then((result) => {
                setSpinner(false);
                setShoes([...shoes, ...result.data]); // [...shoes] 연산자는 대괄호를 벗겨준다. == 카피본 생성
              })
              .catch((error) => {
                setSpinner(false);
                console.log("Failed \n" + error);
              });
          }}
        >
          More+
        </Button>
      </div>
    </>
  );
}

function Card(props) {
  let history = useHistory();
  return (
    <div
      className="col-md-4"
      onClick={() => {
        history.push("/detail/" + props.shoe.id);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" +
          (props.shoe.id + 1) +
          ".jpg"
        }
        width="100%"
        alt={props.shoe.title}
      ></img>
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content}</p>
      <p>{props.shoe.price}</p>
    </div>
  );
}

export default Main;
