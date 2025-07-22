// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SuggestedFriends = () => {
//   const [suggestions, setSuggestions] = useState([]);

//   const loadSuggestions = async () => {
//     const res = await axios.get("http://localhost:5000/api/friends/suggest", {
//       withCredentials: true
//     });
//     setSuggestions(res.data);
//   };

//   const addFriend = async (id) => {
//     await axios.put("http://localhost:5000/api/friends/add", { friendId: id }, {
//       withCredentials: true
//     });
//     loadSuggestions();
//     alert("🎉 Friend added!");
//   };

//   useEffect(() => {
//     loadSuggestions();
//   }, []);

//   return (
//     <div className="p-6 bg-white rounded shadow mt-6">
//       <h3 className="text-xl font-semibold mb-4">👀 People you may know</h3>
//       <button onClick={loadSuggestions} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
//         🔄 Refresh
//       </button>
//       {suggestions.map((user) => (
//         <div key={user._id} className="flex justify-between items-center mb-3 p-2 bg-blue-50 rounded">
//           <div>
//             <p className="font-medium">{user.name}</p>
//             <p className="text-sm text-gray-500">{user.email} • {user.language}</p>
//           </div>
//           <button
//             onClick={() => addFriend(user._id)}
//             className="bg-green-500 text-white px-3 py-1 rounded"
//           >
//             Add Friend
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SuggestedFriends;
