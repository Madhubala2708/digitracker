import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { BsEmojiSmile, BsPlus } from "react-icons/bs";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { BsCheck2, BsCheck2All, BsEye } from "react-icons/bs";
import chatBg from "../../../../assets/images/chatbackgroundimage.jpg";

const messagesData = [
  { id: 1, sender: "other", text: "Hello, how are you?", time: "7:20 pm" },
  { id: 2, sender: "me", text: "I'm good, what about you?", time: "7:21 pm", status: "read" },
  { id: 3, sender: "other", text: "I'm doing great!", time: "7:22 pm" },
  { id: 4, sender: "me", text: "Glad to hear that.", time: "7:23 pm", status: "delivered" },
];

const ChatIndividualScreen = ({ selectedChat }) => {
  const [chatMessages, setChatMessages] = useState(messagesData);
  const [newMessage, setNewMessage] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "me",
          text: newMessage,
          time: getCurrentTime(),
          status: "sent",
        },
      ]);
      setNewMessage("");

      setTimeout(() => {
        setChatMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === chatMessages.length + 1
              ? { ...msg, status: "read" }
              : msg
          )
        );
      }, 2000);
    }
  };

  return (
    <div className="chat-window flex-grow-1 d-flex flex-column">
      <div className="chat-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <div className="chat-user-info d-flex align-items-center">
          <div
            className="avatar-placeholder me-2 d-flex justify-content-center align-items-center text-white"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {selectedChat.name?.charAt(0).toUpperCase()}
          </div>
          <span>{selectedChat.name}</span>
        </div>
        <FaEllipsisV className="menu-icon" />
      </div>

      {/* Messages */}
      <div
        className="chat-messages flex-grow-1 p-3 overflow-auto"
        style={{
           backgroundImage: `url(${chatBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 ${msg.sender === "me" ? "text-end" : ""}`}
          >
            <div
              className={`chat-bubble p-2 d-inline-block rounded ${
                msg.sender === "me"
                  ? "text-white ms-auto"
                  : "bg-light me-auto"
              }`}
              style={{
                maxWidth: "80%",
                backgroundColor: msg.sender === "me" ? "#FF6F00" : "white",
              }}
            >
              {msg.text}
              <div className="text-end">
                <small
                  className={`${
                    msg.sender === "me"
                      ? "text-white-50"
                      : "text-muted"
                  } d-flex align-items-center justify-content-end gap-1`}
                >
                  {msg.time}
                  {msg.sender === "me" && (
                    <>
                      {msg.status === "sent" && <BsCheck2 />}
                      {msg.status === "delivered" && <BsCheck2All />}
                      {msg.status === "read" && <BsEye />}
                    </>
                  )}
                </small>
              </div>
            </div>
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
          placeholder="Send message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ backgroundColor: "#EFEFEF" }}
        />
        <FiSend
          size={24}
          onClick={sendMessage}
          style={{
            color: "#FF6F00",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default ChatIndividualScreen;
