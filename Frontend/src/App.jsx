import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import RequestSkill from "./pages/RequestSkill";
import Feed from "./pages/Feed";
import Friends from "./pages/Friends";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile/>} />
          <Route path="request" element={<RequestSkill/>} />
          <Route path="feed" element={<Feed/>} />
          <Route path="friends" element={<Friends/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
