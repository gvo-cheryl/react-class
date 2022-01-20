import React from "react";

type GreetingsProps = {
    name: string;
    mark: string;
    array?: string[] 
}

// React.FC 
// - 장점: props에서 children 지정하지 않아도 사용 가능 
// - 단점: 타입이 명료하지 않을 수 있음
const Greetings: React.FC<GreetingsProps> = ({name, mark, array}) => {
    return <div>{name + "" + mark + " " + array}</div>
}


export default Greetings;