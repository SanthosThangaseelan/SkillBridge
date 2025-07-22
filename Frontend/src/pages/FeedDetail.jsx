import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FeedDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [userId, setUserId] = useState(null);
    const [assigned, setAssigned] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [scheduledAt, setScheduledAt] = useState("");

    const handleAssign = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/skills/assign/${request._id}`,
                { scheduledAt },
                { withCredentials: true }
            );
            alert("✅ Session scheduled successfully!");
            setShowModal(false);
        } catch (err) {
            alert("❌ Failed to assign & schedule session");
        }
    };


    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true }).then(res => setUserId(res.data._id));
        axios.get(`http://localhost:5000/api/skills/${id}`, { withCredentials: true }).then(res => {
            setRequest(res.data);
            setAssigned(res.data.status === "assigned");
        });
    }, [id]);

    const assignRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/api/skills/assign/${id}`, { scheduledAt }, { withCredentials: true });
            alert("✅ Request assigned & scheduled!");
            setShowModal(false);
            setAssigned(true);
        } catch (err) {
            alert("❌ Assignment failed.");
        }
    };

    if (!request) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{request.title}</h2>
            <p className="text-gray-600 mb-4">{request.description}</p>
            <p className="text-sm text-gray-500 mb-2">📅 Posted: {new Date(request.createdAt).toLocaleString()}</p>
            <p className="mb-2">🔁 Exchange Skill: <strong>{request.exchangeSkill}</strong></p>
            <p className="mb-2">🏷️ Tags: {request.tags.join(", ")}</p>
            <p className="mb-4">🕒 Duration: {request.durationMinutes} mins</p>

            {request.status === "assigned" && (
                <p className="text-green-700 font-semibold mt-4">✅ Session is scheduled!</p>
            )}

            {!assigned && request.user._id !== userId && (
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Assign Myself
                </button>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">📅 Schedule Session</h3>
                        <input
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={(e) => setScheduledAt(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={assignRequest}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Confirm & Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedDetail;
