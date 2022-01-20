import React, {createContext, Dispatch, useContext, useReducer} from "react";

type FooValue = {
    foo:number
}

const FooContext = createContext<FooValue|null>(null);

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

type SampleDispatch = Dispatch<Action>;
const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<SampleDispatch | null>(null);

type SampleProviderProps = {
    children: React.ReactNode;
}

export function SampleProvider({children}:SampleProviderProps){
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        text:'hello',
        color:'red',
        isGood:true
    })

    return (
        <SampleStateContext.Provider value={state}>
            <SampleDispatchContext.Provider value={dispatch}>
                {children}
            </SampleDispatchContext.Provider>
        </SampleStateContext.Provider>
    )
}

export function useSampleState(){
    const state = useContext(SampleStateContext);
    if(!state) throw new Error("Cannot find SampleProvider");
    return state;
}

export function useSampleDispatch(){
    const dispatch = useContext(SampleDispatchContext);
    if(!dispatch) throw new Error("Cannot find SampleDispath");
    return dispatch;

}