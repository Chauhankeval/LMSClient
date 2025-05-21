import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedContact } from "@/Features/chatSlice";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import MessageBar from "./MessageBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ChatModal = () => {
  const selectedContact = useSelector((state) => state.chat.selectedContact);
  const dispatch = useDispatch();

  return (
    <Dialog open={!!selectedContact} onOpenChange={() => dispatch(setSelectedContact(null))}>
      <DialogContent className="w-[600px] p-4 bg-[#2c2e3b] rounded-lg">
        {selectedContact ? (
          <div className="flex flex-col h-[500px]">
            {/* Chat Header */}
            <ChatHeader contact={selectedContact} />

            {/* Message Container */}
            <MessageContainer contactId={selectedContact._id} />

            {/* Message Bar */}
            <MessageBar contactId={selectedContact._id} />
          </div>
        ) : (
          <div>No Contact Selected</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
