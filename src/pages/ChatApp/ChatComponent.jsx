import React, { useState } from "react";
import { PlusCircle, Search, X } from "lucide-react";
import Lottie from "lottie-react";
import { animationDefaultOptions } from "@/lib/utils";

import SearchContectSection from "./ContectBar/SearchContectSection";

const ChatComponent = ({ onClose }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex h-[500px] w-[700px]  text-white rounded-lg shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-900 p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Chats</h2>
          <button className="text-gray-400 hover:text-white">
            <PlusCircle size={20} />
          </button>
        </div>

        {/* Threads */}
      </div>

      {/* Main Chat Section */}

      <div className="w-2/3 flex flex-col p-4">
        {/* Chat Header with Close Button */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Welcome to chat!</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Welcome Section */}
        {isSearchOpen ? (
          <SearchContectSection />
        ) : (
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <Lottie
              {...animationDefaultOptions}
              style={{ width: 200, height: 200 }}
            />
            <div>
              <button
                className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <PlusCircle size={18} />
                Start new chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
