//import {useRef} from "react";
import "./chatItem.scss";

export default function ChatItem({msg, id}) {
    //const chatItemRef = useRef();
  
    // if(id%2 == 0){
    //     chatItemRef.current.styles = ;
    // }
    // else{

    // }

    return(
    <div className="chatItem" style={(id%2==0) ? {backgroundColor: "#b0c4de"} :{backgroundColor: "#b004de"}}>
        <div className="chat__element">
            <div className="username">{msg.username.toUpperCase()}</div>
            <div className="message">:</div>
            <div className="message">{msg.message}</div>
        </div>
    </div>
  );
}
