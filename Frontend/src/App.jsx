import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('/');
const App = () => {
  const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  const  newMessage = {
    body: message,
    from: "Me"
  }
  console.log(message);
  socket.emit("message", message);
  setMessages([...messages, newMessage]);
};

useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    }
}, []);

const receiveMessage = (message) => {
  setMessages((state) => [...state, message]);
};

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Chat App</h1>
        <input
            type="text" placeholder={"Write your message..."}
            onChange={(e) => {setMessage(e.target.value)}}
            className="border-2 border-zinc-500 p-2 w-full text-black"
        />
          <ul>
              {
                  messages.map((message, index) => {
                      return <li className={
                          `my-2 p-2 table text-sm rounded-md bg-sky-700 ${message.from === "Me" ? 'bg-sky-700' : 'bg-zinc-700 ml-auto'}`
                      } key={index}>
                          <span className="text-ts text-slate-400 block">{message.from}</span>
                          <span className="text-md">
                            {message.body}
                          </span>

                      </li>;
                  })
              }
          </ul>
      </form>
    </div>
  );
};

export default App;