import "./canvas.scss";
import { useState, useRef, useEffect } from "react";

export default function Canvas({ socket }) {
  //For Canvas
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 850;
    canvas.height = 645;
    canvas.style.width = "850px";
    canvas.style.height = "645px";

    const context = canvas.getContext("2d");
    //context.scale(2,2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 6;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX, offsetY);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    socket.emit("down", { offsetX, offsetY });
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  socket.on("on_draw", ({ x, y }) => {
    try {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    } catch (error) {
      console.log("draw error");
    }
  });

  socket.on("on_down", ({ x, y }) => {
    try {
      console.log("cursor moved>>>>", x, y);
      contextRef.current.moveTo(x, y);
    } catch (error) {
      console.log("move error");
    }
  });

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    isDrawing && socket.emit("draw", { offsetX, offsetY });
  };

  return (
    <div className="canvas">
      <canvas
        className="canvas__element"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
      />
    </div>
  );
}
