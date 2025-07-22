// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000");

// const Chat = ({ friend }) => {
//   const [user, setUser] = useState(null);
//   const [msg, setMsg] = useState("");
//   const [messages, setMessages] = useState([]);
//   const bottomRef = useRef(null);

//   // Get user and register socket
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/auth/me", { withCredentials: true }).then((res) => {
//       setUser(res.data);
//       socket.emit("add-user", res.data._id);
//     });
//   }, []);

//   // Load chat history
//   useEffect(() => {
//     if (!friend?._id) return;

//     axios.get(`http://localhost:5000/api/messages/${friend._id}`, {
//       withCredentials: true,
//     }).then(res => {
//       setMessages(res.data.map(m => ({ from: m.from, message: m.message })));
//     });
//   }, [friend]);

//   // Handle socket message receive
//   useEffect(() => {
//     socket.on("msg-receive", ({ from, message }) => {
//       setMessages(prev => [...prev, { from, message }]);
//     });

//     return () => socket.off("msg-receive");
//   }, []);

//   // Scroll to bottom
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Send message
//   const sendMessage = async () => {
//     if (!msg.trim() || !user) return;

//     // Save to DB
//     await axios.post("http://localhost:5000/api/messages", {
//       from: user._id,
//       to: friend._id,
//       message: msg
//     }, { withCredentials: true });

//     // Emit via socket
//     socket.emit("send-msg", {
//       from: user._id,
//       to: friend._id,
//       message: msg
//     });

//     setMsg("");
//   };

//   return (
//     <div className="w-full max-w-3xl p-6 bg-white rounded shadow h-[500px] flex flex-col">
//       <h2 className="text-xl font-bold text-blue-700 mb-4 border-b pb-2">
//         Chat with {friend.name}
//       </h2>

//       <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 rounded space-y-2">
//         {messages.map((m, i) => {
//           const isOwn = m.from === user?._id;
//           return (
//             <div
//               key={i}
//               className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
//             >
//               <div className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${
//                 isOwn
//                   ? "bg-blue-600 text-white rounded-br-none"
//                   : "bg-gray-200 text-gray-800 rounded-bl-none"
//               }`}>
//                 {m.message}
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </div>

//       <div className="flex gap-2">
//         <input
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-5 rounded hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
