// pages/SessionJoin.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoCall from "../components/VideoCall";

const SessionJoin = () => {
  const { id } = useParams(); // skillRequest ID
  const [user, setUser] = useState(null);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));

    axios.get(`http://localhost:5000/api/skills/${id}`, { withCredentials: true })
      .then(res => setRequest(res.data))
      .catch(() => setRequest(null));
  }, [id]);

  console.log("user", user);
console.log("request", request);



  if (!user || !request) return <p className="p-6 text-center">Loading session...</p>;

  const roomName = `SkillBridge_${request._id}`;

  return (
    <div className="h-screen">
      <VideoCall roomName={roomName} displayName={user.name} />
    </div>
  );
};

export default SessionJoin;
