import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMessageSquare, FiUsers } from "react-icons/fi";

const ChatSideNav = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light d-flex flex-column align-items-center p-3 border-end" style={{ width: "70px", height: "100vh" }}>
      {/* Individual Chat Icon */}
      <div
        className="d-flex flex-column align-items-center my-3"
        onClick={() => navigate("/chat-app")}
        style={{ cursor: "pointer" }}
      >
        <FiMessageSquare className="text-warning fs-3" />
        <span className="small text-muted">Chats</span>
      </div>

      {/* Group Chat Icon */}
      <div
        className="d-flex flex-column align-items-center my-3"
        onClick={() => navigate("/group-chat")}
        style={{ cursor: "pointer" }}
      >
        <FiUsers className="text-secondary fs-3" />
        <span className="small text-muted">Groups</span>
      </div>
    </div>
  );
};

export default ChatSideNav;
