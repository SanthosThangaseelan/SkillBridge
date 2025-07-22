import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const MyRequests = () => {
  const [user, setUser] = useState(null);
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true }).then(res => {
      setUser(res.data);
      axios.get("http://localhost:5000/api/skills", { withCredentials: true }).then(res2 => {
        const mine = res2.data.filter(r => r.user?._id === res.data._id);
        setMyRequests(mine);
      });
    });
  }, []);

  const markComplete = async (id) => {
    await axios.put(`http://localhost:5000/api/skills/complete/${id}`, {}, { withCredentials: true });
    setMyRequests(prev => prev.map(r => r._id === id ? { ...r, status: "completed" } : r));
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`, {
        withCredentials: true,
      });
      setMyRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const getStatusBadge = (status) => {
    const base = "text-xs font-semibold px-2.5 py-1 rounded-full";
    if (status === "assigned") return <span className={`${base} bg-yellow-100 text-yellow-800`}>Assigned</span>;
    if (status === "completed") return <span className={`${base} bg-green-100 text-green-700`}>Completed</span>;
    return <span className={`${base} bg-gray-100 text-gray-700`}>Unassigned</span>;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">My Skill Requests</h2>

      {myRequests.length === 0 ? (
        <p className="text-gray-500 text-sm">No requests created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myRequests.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-blue-800">{item.title}</h3>
                {getStatusBadge(item.status)}
              </div>

              <p className="text-sm text-gray-600 mb-3">{item.description.slice(0, 100)}...</p>

              <div className="text-sm text-gray-500 mb-3 space-y-1">
                {item.assignedTo && <p><strong>Assigned to:</strong> {item.assignedTo.name}</p>}
                {item.scheduledAt && (
                  <p>
                    <strong>Scheduled:</strong>{" "}
                    {moment(item.scheduledAt).format("MMMM Do YYYY, h:mm A")}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                {item.status === "assigned" && (
                  <>
                    <Link
                      to={`/session/${item._id}`}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded"
                    >
                      Join Session
                    </Link>
                    <button
                      onClick={() => markComplete(item._id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
                    >
                      Mark as Completed
                    </button>
                  </>
                )}

                {item.status === "unassigned" && (
                  <button
                    onClick={() => deleteRequest(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                  >
                    Delete Request
                  </button>
                )}

                {item.status === "completed" && (
                  <span className="text-green-600 text-sm font-semibold">Session Completed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
