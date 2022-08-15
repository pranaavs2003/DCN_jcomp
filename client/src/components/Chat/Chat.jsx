import "./chat.scss";
import {useState, useEffect, useRef} from "react";
import ChatItem from "../ChatItem/ChatItem";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function Chat({socket, room, username}) {
  //For Messages
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let idRef = 0;
  

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  const sendMessage = () => {
    socket.emit("send_message", {
      message: message,
      room: room,
      username: username,
    });
    const newMessage = { message: message, room: room, username: username };
    setMessages([...messages, newMessage]);
  };


  return(
    <div className="chat">
      <div className="chat__container">

        <div className="message__container">
            {
                messages.map((msg) => {
                    return <ChatItem key={idRef++} msg={msg} id={idRef} />;
                })
            }
        </div>

        <div className="input__container">
            <input
                type="text"
                placeholder="Enter message..."
                onChange={(event) => setMessage(event.target.value)}
            />
            <div className="send__button">
                <ChevronRightRoundedIcon onClick={sendMessage} className="icon" />
            </div>
        </div>
        
      </div>
    </div>
  );
}


{/* <h3>{msg.username + " : " + msg.message}</h3> */}