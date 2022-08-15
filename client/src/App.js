import "./app.scss";
import { useState } from "react";
import Chat from "./components/Chat/Chat";
import Canvas from "./components/Canvas/Canvas";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState(0);
  const [username, setUsername] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
    
      <div className="top__container">
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Room ID"
          onChange={(event) => setRoom(event.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>

      <div className="bottom__container">
        <Canvas socket={socket} />
        <Chat socket={socket} room={room} username={username} />
      </div>

    </div>
  );
}

export default App;
