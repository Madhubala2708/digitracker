import React, { useState, useEffect } from "react";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import ChatIndividualList from "./ChatIndividualList";
import ChatIndividualScreen from "./ChatIndividualScreen";
import GroupChatList from "../GroupChat/GroupChatList";
import GroupChatScreen from "../GroupChat/GroupChatScreen";

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activeSection, setActiveSection] = useState("chats"); 

  useEffect(() => {
    if (activeSection === "chats") {
      setSelectedGroup(null);
    } else if (activeSection === "groups") {
      setSelectedChat(null);
    }
  }, [activeSection]);

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      {/* Top Navigation */}
      <div
        className="bg-light d-flex  border-bottom"
        style={{ height: "70px"  }}
      >
        <div
          className="d-flex flex-row align-items-center mx-4 p-1 rounded "
          style={{
            cursor: "pointer",
            backgroundColor: activeSection === "chats" ? "#FFE0B2" : "transparent",
            // height: 30,
            // marginTop : 10

          }}
          onClick={() => setActiveSection("chats")}
        >
          <FiMessageSquare
            className="fs-3"
            style={{ color: activeSection === "chats" ? "#FF6F00" : "gray"  , marginRight : 4}}
          />
          <span
            className={`small ${activeSection === "chats" ? "text-dark" : "text-muted"}`}
          >
            Chats
          </span>
        </div>

        <div
          className="d-flex flex-row align-items-center mx-4 p-2 rounded"
          style={{
            cursor: "pointer",
            backgroundColor: activeSection === "groups" ? "#FFE0B2" : "transparent",
            // height: 30,
            // marginTop : 10
          }}
          onClick={() => setActiveSection("groups")}
        >
          <FiUsers
            className="fs-3"
            style={{ color: activeSection === "groups" ? "#FF6F00" : "gray"  , marginRight : 4}}
          />
          <span
            className={`small ${activeSection === "groups" ? "text-dark" : "text-muted"}`}
          >
            Groups
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="d-flex flex-grow-1">
        {/* Left panel: List */}
        <div style={{ width: "250px" }}>
          {activeSection === "chats" ? (
            <ChatIndividualList
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          ) : (
            <GroupChatList
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          )}
        </div>

        {/* Right panel: Chat Screen */}
        <div className="flex-grow-1">
          {activeSection === "chats" ? (
            selectedChat ? (
              <ChatIndividualScreen selectedChat={selectedChat} />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <h5>Select a chat to start messaging</h5>
              </div>
            )
          ) : selectedGroup ? (
            <GroupChatScreen selectedGroup={selectedGroup} />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100">
              <h5>Select a group to start messaging</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
