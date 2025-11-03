import React from "react";

const chatUsers = [
  { id: 1, name: "Ronald Richards", unread: 2 },
  { id: 2, name: "Floyd Miles", unread: 1 },
  { id: 3, name: "Dianne Russell", unread: 1 },
  { id: 4, name: "David Billa", unread: 2 },
  { id: 5, name: "Lavanya", unread: 1 },
  { id: 6, name: "Vivek", unread: 1 },
  { id: 7, name: "Daniel", unread: 2 },
];

const ChatIndividualList = ({ selectedChat, setSelectedChat }) => {
  const openChat = (chat) => {
    setSelectedChat(chat);
  };

  const getInitial = (name) => name.charAt(0).toUpperCase();

  return (
    <div className="bg-white p-3 border-end" style={{ width: "250px" }}>
      {/* <h5 className="text-dark mb-3">Chats</h5> */}
      {chatUsers.map((user) => (
       <div
  key={user.id}
  className={`d-flex justify-content-between align-items-center p-2 border-bottom ${
    selectedChat && selectedChat.id === user.id ? "active-chat" : ""
  }`}
  onClick={() => openChat(user)}
  style={{ cursor: "pointer" }}
  
>

          <div className="d-flex align-items-center">
            <div
              className="rounded-circle text-white d-flex align-items-center justify-content-center me-2"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#FF6F00",
                fontWeight: "bold",
              }}
            >
              {getInitial(user.name)}
            </div>
            <span>{user.name}</span>
          </div>
          {user.unread > 0 && (
            <span className="badge" style={{ backgroundColor: "#FF6F00", color: "white" }}>
              {user.unread}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatIndividualList;
