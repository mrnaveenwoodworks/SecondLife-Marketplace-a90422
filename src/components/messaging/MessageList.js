import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { formatDistanceToNow } from "date-fns";

const MessageList = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, unread, archived

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

    fetchMessages();
  }, [isAuthenticated, navigate]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock message data
      const mockMessages = [
        {
          id: "msg1",
          product: {
            id: "prod1",
            title: "iPhone 12 Pro Max",
            price: 699.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkJwcm9kdWN0JTJCdGh1bWJuYWlsfGVufDB8fHx8MTc0NzU1MDczOXww&ixlib=rb-4.1.0&q=80&w=1080"
          },
          otherUser: {
            id: "user1",
            name: "Alice Johnson",
            avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHx1c2VyJTJCYXZhdGFyfGVufDB8fHx8MTc0NzU0OTk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
            isOnline: true
          },
          lastMessage: {
            content: "Is this still available?",
            timestamp: "2023-11-20T10:30:00Z",
            isRead: false,
            sender: "user1"
          },
          messageCount: 3
        },
        {
          id: "msg2",
          product: {
            id: "prod2",
            title: "MacBook Pro 16\"",
            price: 1499.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTJCcHJvZHVjdCUyQnRodW1ibmFpbHxlbnwwfHx8fDE3NDc1NTA3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          },
          otherUser: {
            id: "user2",
            name: "Bob Smith",
            avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHx1c2VyJTJCYXZhdGFyfGVufDB8fHx8MTc0NzU0OTk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
            isOnline: false,
            lastActive: "2023-11-20T09:15:00Z"
          },
          lastMessage: {
            content: "Great! I can meet tomorrow at 2 PM.",
            timestamp: "2023-11-19T18:45:00Z",
            isRead: true,
            sender: "current"
          },
          messageCount: 8
        }
      ];

      setMessages(mockMessages);
      setError(null);
    } catch (err) {
      setError("Failed to load messages. Please try again later.");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleArchiveThread = async (threadId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages(messages.filter(msg => msg.id !== threadId));
    } catch (err) {
      console.error("Error archiving thread:", err);
    }
  };

  const handleMarkAsRead = async (threadId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages(messages.map(msg => 
        msg.id === threadId 
          ? { ...msg, lastMessage: { ...msg.lastMessage, isRead: true } }
          : msg
      ));
    } catch (err) {
      console.error("Error marking thread as read:", err);
    }
  };

  const filteredMessages = messages.filter(msg => {
    switch (filter) {
      case "unread":
        return !msg.lastMessage.isRead;
      case "archived":
        return msg.isArchived;
      default:
        return !msg.isArchived;
    }
  });

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Messages</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchMessages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Message List */}
      {filteredMessages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><line x1="96" y1="100" x2="160" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="140" x2="160" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M105.07,192l16,28a8,8,0,0,0,13.9,0l16-28H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-500">
            {filter === "unread" 
              ? "You've read all your messages"
              : filter === "archived"
              ? "No archived messages"
              : "Start browsing items to connect with sellers"}
          </p>
          {filter === "all" && (
            <Link
              to="/browse"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Items
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((thread) => (
            <div
              key={thread.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Link
                to={`/messages/${thread.id}`}
                className="block p-4"
              >
                <div className="flex items-start space-x-4">
                  {/* User Avatar */}
                  <div className="relative">
                    {thread.otherUser.avatar ? (
                      <img
                        src={thread.otherUser.avatar}
                        alt={thread.otherUser.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                      </div>
                    )}
                    {thread.otherUser.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {thread.otherUser.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(thread.lastMessage.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <p className={`text-sm ${thread.lastMessage.isRead ? "text-gray-500" : "text-gray-900 font-medium"}`}>
                      {thread.lastMessage.sender === "current" && "You: "}
                      {thread.lastMessage.content}
                    </p>

                    {/* Product Preview */}
                    <div className="mt-2 flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={thread.product.image}
                          alt={thread.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 truncate">
                          {thread.product.title}
                        </p>
                        <p className="text-xs font-medium text-gray-900">
                          ${thread.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message Count Badge */}
                  {!thread.lastMessage.isRead && (
                    <div className="ml-2 flex-shrink-0">
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {thread.messageCount}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Action Buttons */}
              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => handleMarkAsRead(thread.id)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-2">Mark as {thread.lastMessage.isRead ? "unread" : "read"}</span>
                </button>
                <button
                  onClick={() => handleArchiveThread(thread.id)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center border-l border-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="24" y="56" width="208" height="40" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M216,96v96a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="136" x2="152" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-2">Archive</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;