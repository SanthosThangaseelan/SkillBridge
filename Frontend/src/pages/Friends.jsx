import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ComingSoon from "../components/ComingSoon";

const Friends = () => {
  // const [friends, setFriends] = useState([]);
  // const [selectedFriend, setSelectedFriend] = useState(null);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/friends", { withCredentials: true })
  //     .then(res => setFriends(res.data));
  // }, []);

  return (
    // <div className="p-6 max-w-4xl mx-auto">
    //   <h2 className="text-2xl font-bold text-blue-700 mb-4">🧑‍🤝‍🧑 Your Friends</h2>

    //   <div className="grid md:grid-cols-2 gap-4">
    //     <div>
    //       {friends.map(friend => (
    //         <div key={friend._id} className="bg-white p-4 shadow rounded mb-3 flex justify-between items-center">
    //           <div>
    //             <h4 className="font-semibold">{friend.name}</h4>
    //             <p className="text-sm text-gray-500">{friend.email} • {friend.language}</p>
    //           </div>
    //           <Link
    //             to={`/dashboard/chat`}
    //             className="bg-blue-500 text-white px-3 py-1 rounded"
    //           >
    //             Chat
    //           </Link>
    //         </div>
    //       ))}
    //     </div>

    //     <div>
    //       {selectedFriend && <Chat friend={selectedFriend} />}
    //     </div>
    //   </div>
    // </div>
    <ComingSoon/>
  );
};

export default Friends;
