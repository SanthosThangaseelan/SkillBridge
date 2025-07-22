import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const MyAssignments = () => {
  const [user, setUser] = useState(null);
  const [assigned, setAssigned] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true }).then(res => {
      setUser(res.data);
      axios.get("http://localhost:5000/api/skills", { withCredentials: true }).then(res2 => {
        const mine = res2.data.filter(r => r.assignedTo?._id === res.data._id);
        setAssigned(mine);
      });
    });
  }, []);

  const cancelAssignment = async (id) => {
    await axios.put(`http://localhost:5000/api/skills/unassign/${id}`, {}, { withCredentials: true });
    setAssigned(prev => prev.filter(r => r._id !== id));
  };

  const markComplete = async (id) => {
    await axios.put(`http://localhost:5000/api/skills/complete/${id}`, {}, { withCredentials: true });
    setAssigned(prev => prev.map(r => r._id === id ? { ...r, status: "completed" } : r));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-green-700 mb-8">Assigned Sessions</h2>

      {assigned.length === 0 ? (
        <p className="text-gray-600">You haven't accepted any requests yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {assigned.map(item => (
            <div
              key={item._id}
              className={`border rounded-xl p-6 transition-shadow shadow-sm hover:shadow-md bg-white ${
                item.scheduledAt ? "border-green-200" : "border-gray-200"
              }`}
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description.slice(0, 120)}...</p>
              </div>

              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p><span className="font-medium text-gray-700">Requested by:</span> {item.user?.name}</p>
                {item.scheduledAt && (
                  <p>
                    <span className="font-medium text-gray-700">Scheduled:</span>{" "}
                    {moment(item.scheduledAt).format("MMMM Do YYYY, h:mm A")}
                  </p>
                )}
              </div>

              {item.status === "assigned" && (
                <div className="flex flex-wrap gap-3 mt-2">
                  <Link
                    to={`/session/${item._id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded"
                  >
                    Join Session
                  </Link>
                  <button
                    onClick={() => markComplete(item._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => cancelAssignment(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {item.status === "completed" && (
                <p className="mt-3 text-green-600 font-semibold text-sm">Session marked as completed</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAssignments;
