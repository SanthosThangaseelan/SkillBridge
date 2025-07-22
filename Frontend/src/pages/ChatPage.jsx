// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Chat from "../pages/Chat";
// import axios from "axios";

// const ChatPage = () => {
//   const { id } = useParams(); // friend ID
//   const [friend, setFriend] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFriend = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/friends", {
//           withCredentials: true,
//         });

//         const found = res.data.find(f => f._id === id);
//         if (!found) {
//           alert("Friend not found!");
//           navigate("/dashboard/friends");
//         } else {
//           setFriend(found);
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Error loading chat");
//       }
//     };

//     fetchFriend();
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       {friend ? (
//         <Chat friend={friend} />
//       ) : (
//         <p className="text-gray-500 text-lg">Loading chat...</p>
//       )}
//     </div>
//   );
// };

// export default ChatPage;
