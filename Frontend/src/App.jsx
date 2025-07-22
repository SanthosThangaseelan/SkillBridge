import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import RequestSkill from "./pages/RequestSkill";
import Feed from "./pages/Feed";
import Friends from "./pages/Friends";
import AboutSkillBridge from "./components/AboutSkill";
import FeedDetail from "./pages/FeedDetail";
import SessionJoin from "./pages/SessionJoin";
import MyAssignments from "./pages/Assignments";
import MyRequests from "./pages/MyRequests";
import UploadVideo from "./pages/UploadVideo";
import AllVideos from "./pages/AllVideos";
import MyVideos from "./pages/MyVideos";
//import UploadVideo from "./pages/UploadVideo";
import WatchVideo from "./pages/WatchVideo";
import About from "./pages/About";
import Instructions from "./pages/Instructions";
import SkillTubeLayout from "./pages/SkillTubeLayout";
import SkillTubeIntro from "./components/SkillTubeIntro";







function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/instructions" element={<Instructions />} />


        <Route path="session/:id" element={<SessionJoin />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<AboutSkillBridge />} />
          <Route path="profile" element={<Profile />} />
          <Route path="request" element={<RequestSkill />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:id" element={<FeedDetail />} />
          <Route path="assignments" element={<MyAssignments />} />
          <Route path="myrequests" element={<MyRequests />} />
          <Route path="friends" element={<Friends />} />
        </Route>
        <Route path="/videos" element={<SkillTubeLayout />}>
          <Route index element={<SkillTubeIntro/>} />
          <Route path="Allvideos" element={<AllVideos />} />
          <Route path="upload" element={<UploadVideo />} />
          <Route path="my" element={<MyVideos />} />
          <Route path=":id" element={<WatchVideo />} />
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
