// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Chat from "../pages/Chat";

// const ChatLayout = () => {
//   const [friends, setFriends] = useState([]);
//   const [selectedFriend, setSelectedFriend] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/friends", {
//       withCredentials: true,
//     }).then((res) => setFriends(res.data));
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Left Sidebar */}
//       <div className="w-[300px] bg-white border-r p-4 overflow-y-auto">
//         <h2 className="text-xl font-bold text-blue-700 mb-4">💬 Chats</h2>
//         {friends.map((f) => (
//           <div
//             key={f._id}
//             onClick={() => setSelectedFriend(f)}
//             className={`cursor-pointer p-3 rounded hover:bg-blue-100 transition ${
//               selectedFriend?._id === f._id ? "bg-blue-200" : ""
//             }`}
//           >
//             <h4 className="font-medium">{f.name}</h4>
//             <p className="text-sm text-gray-500">{f.email}</p>
//           </div>
//         ))}
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 flex items-center justify-center bg-gray-50">
//         {selectedFriend ? (
//           <Chat friend={selectedFriend} />
//         ) : (
//           <p className="text-gray-400 text-lg">💡 Select a friend to start chatting</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatLayout;
