import { useSelector } from "react-redux";

const ChatWindow = () => {
  const selectedContact = useSelector((state) => state.chat.selectedContact);

  if (!selectedContact) {
    return (
      <div className="text-gray-500 p-4">
        Select a contact to start chatting
      </div>
    );
  }

  return (
    <div className="p-4 border-l border-gray-300 w-full">
      <h2 className="text-lg font-semibold">{selectedContact.name}</h2>
      <p className="text-gray-500 text-sm">{selectedContact.email}</p>
      {/* Chat messages will go here */}
    </div>
  );
};

export default ChatWindow;
