import React, {useReducer} from "react";
import { useSampleDispatch, useSampleState } from "./SampleContext";

type Color = 'red' | 'orange' | 'yellow';

type State = {
    count: number;
    text: string;
    color: Color,
    isGood: boolean;
}

type Action = 
    | {type: "SET_COUNT"; count:number} 
    | {type: "SET_TEXT"; text: string}
    | {type: "SET_COLOR"; color: Color}
    | {type: "TOGGLE_GOOD"};

function reducer(state:State, action:Action): State{
    switch(action.type){
      case "SET_COUNT":
          return {
              ...state,
              count:action.count
          }  
      case "SET_COLOR":
          return {
              ...state,
              color: action.color
          }
      case "SET_TEXT":
          return {
              ...state,
              text: action.text
          }  
     case "TOGGLE_GOOD":
        return {
             ...state,
            isGood: false
        }        
      default:
          throw new Error("Unhandled Error")  
    }

}

function ReducerSample(){
    const state = useSampleState();
    const dispatch = useSampleDispatch();

    const setCount = () => dispatch({type: "SET_COUNT", count:5});
    const setText = () => dispatch({type: "SET_TEXT", text: "bye"});
    const setColor = () => dispatch({type: "SET_COLOR", color: "orange"});
    const toggleGood = () => dispatch({type: "TOGGLE_GOOD"})


    return (
        <div>
            <p>count: {state.count}</p>
            <p>text: {state.text}</p>
            <p>color: {state.color}</p>
            <p>isGood: {state.isGood? 'true' : 'false'}</p>
            <button onClick={setCount}>setCount</button>
            <button onClick={setText}>setText</button>
            <button onClick={setColor}>setColor</button>
            <button onClick={toggleGood}>toggleGood</button>
        </div>
    )
}

export default ReducerSample;