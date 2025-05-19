import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MessageList from "../components/messaging/MessageList";
import MessageThread from "../components/messaging/MessageThread";

const MessagesPage = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [selectedThreadId, setSelectedThreadId] = useState(threadId || null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { 
        state: { 
          from: "/messages",
          message: "Please log in to view your messages" 
        } 
      });
      return;
    }

    // Check if URL contains a thread ID
    if (threadId && threadId !== selectedThreadId) {
      setSelectedThreadId(threadId);
    }

    setLoading(false);

    // Handle resize for responsive layout
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isAuthenticated, navigate, threadId, selectedThreadId]);

  const handleThreadSelect = (newThreadId) => {
    setSelectedThreadId(newThreadId);
    navigate(`/messages/${newThreadId}`);
  };

  const handleBackToList = () => {
    setSelectedThreadId(null);
    navigate("/messages");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Layout for mobile view
  if (isMobileView) {
    return (
      <div className="bg-gray-50 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm px-4 py-3 flex items-center">
          {selectedThreadId ? (
            <button
              onClick={handleBackToList}
              className="mr-3 text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(256 0) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="120 96 88 128 120 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </button>
          ) : null}
          <h1 className="text-xl font-semibold text-gray-900">
            {selectedThreadId ? "Conversation" : "Messages"}
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {selectedThreadId ? (
            <MessageThread threadId={selectedThreadId} />
          ) : (
            <MessageList onSelectThread={handleThreadSelect} />
          )}
        </div>
      </div>
    );
  }

  // Layout for desktop view
  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        <p className="text-gray-500">Conversations with buyers and sellers</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Message List Sidebar */}
        <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
          <MessageList 
            onSelectThread={handleThreadSelect} 
            selectedThreadId={selectedThreadId}
          />
        </div>

        {/* Conversation Area */}
        <div className="w-2/3 flex flex-col bg-gray-50 overflow-hidden">
          {selectedThreadId ? (
            <MessageThread threadId={selectedThreadId} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64"><rect width="256" height="256" fill="none"/><line x1="96" y1="100" x2="160" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="140" x2="160" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M105.07,192l16,28a8,8,0,0,0,13.9,0l16-28H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">No conversation selected</h2>
              <p className="text-gray-500 max-w-md">
                Select a conversation from the list to view messages or start a new conversation by clicking on "Message" on a product page.
              </p>
              <button
                onClick={() => navigate("/browse")}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Browse Items
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;