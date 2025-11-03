import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { BsEmojiSmile, BsPlus } from "react-icons/bs";
import { FiPaperclip, FiSend } from "react-icons/fi";
import chatBg from "../../../../assets/images/chatbackgroundimage.jpg";

// Dummy data for group messages
const groupMessagesData = [
  { id: 1, sender: "Albert Flores", text: "Hey team, let's discuss the project timeline.", time: "7:15 pm", date: "Today" },
  { id: 2, sender: "Wade Warren", text: "I've completed the initial designs.", time: "7:16 pm", date: "Today" },
  { id: 3, sender: "Jenny Wilson", text: "Great job! Can we review them tomorrow?", time: "7:17 pm", date: "Today" },
  { id: 4, sender: "Floyd Miles", text: "Works for me. I'll prepare the documentation.", time: "7:18 pm", date: "Today" },
];

const GroupChatScreen = ({ selectedGroup }) => {
  const [messages, setMessages] = useState(groupMessagesData);
  const [newMessage, setNewMessage] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getCurrentDate = () => {
    return "Today";
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { 
          id: messages.length + 1, 
          sender: "Me", 
          text: newMessage, 
          time: getCurrentTime(),
          date: getCurrentDate()
        },
      ]);
      setNewMessage("");
    }
  };

  if (!selectedGroup) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-grow-1">
        <h5>Select a group to start messaging</h5>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = message.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="chat-window flex-grow-1 d-flex flex-column">
      {/* Group Chat Header */}
      <div className="chat-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <div className="chat-group-info">
          <h5 className="mb-0">{selectedGroup.name}</h5>
          <small className="text-muted">
            {(selectedGroup?.members || []).slice(0, 3).join(", ")}
            {(selectedGroup?.members || []).length > 3
              ? ` + ${(selectedGroup.members || []).length - 3} more`
              : ""}
          </small>
        </div>
        <FaEllipsisV className="menu-icon" style={{ cursor: "pointer" }} />
      </div>

      {/* Messages Area */}
      <div 
        className="chat-messages flex-grow-1 p-3 overflow-auto"
        style={{
          backgroundImage: `url(${chatBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date divider */}
            <div className="text-center position-relative my-4" style={{ overflow: "hidden" }}>
              <div style={{ 
                display: "inline-block",
                position: "relative",
                color: "#6c757d",
                fontSize: "14px",
                padding: "0 10px",
                backgroundColor: "transparent",
                zIndex: 1
              }}>
                {date}
              </div>
              <div style={{ 
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                borderBottom: "1px solid #e0e0e0",
                zIndex: 0
              }}></div>
            </div>
            
            {/* Messages for this date */}
            {dateMessages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 d-flex ${msg.sender === "Me" ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`chat-bubble p-2 d-inline-block rounded ${
                    msg.sender === "Me" ? "sent" : "received"
                  }`}
                  style={{ 
                    maxWidth: "80%", 
                    backgroundColor: msg.sender === "Me" ? "#FF6F00" : "white",
                    color: msg.sender === "Me" ? "white" : "black"
                  }}
                >
                  {msg.sender !== "Me" && <small className="text-muted">{msg.sender}</small>}
                  <div>{msg.text}</div>
                  <div className="message-time">
                    <small className={`${msg.sender === "Me" ? "text-white-50" : "text-muted"}`}>
                      {msg.time}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="chat-input p-3 d-flex align-items-center border-top">
        <BsEmojiSmile className="icon me-2" style={{ cursor: "pointer" }} />
        <FiPaperclip className="icon me-2" style={{ cursor: "pointer" }} />
        <BsPlus className="icon me-2" style={{ cursor: "pointer" }} />
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ backgroundColor: "#EFEFEF" }}
        />
        <FiSend
          className="icon send-icon"
          style={{ color: "#FF6F00", cursor: "pointer" }}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default GroupChatScreen;