// components/VideoCall.jsx
import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

const VideoCall = ({ roomName, displayName }) => {
  return (
    <div className="h-screen w-full">
      <JitsiMeeting
        roomName={roomName}
        domain="meet.jit.si"
        configOverwrite={{
          startWithAudioMuted: false,
          disableModeratorIndicator: false,
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
        }}
        userInfo={{
          displayName,
        }}
        getIFrameRef={node => {
          node.style.height = "100vh";
          node.style.width = "100%";
        }}
      />
    </div>
  );
};

export default VideoCall;
