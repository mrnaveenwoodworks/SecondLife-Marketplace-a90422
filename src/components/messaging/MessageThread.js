import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const MessageThread = () => {
  const { threadId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threadInfo, setThreadInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchThreadData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock thread data
        const mockThreadInfo = {
          product: {
            id: "prod123",
            title: "iPhone 12 Pro Max",
            price: 699.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkJwcm9kdWN0JTJCaW1hZ2V8ZW58MHx8fHwxNzQ3NTUwNjYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
            status: "available"
          },
          otherUser: {
            id: "user456",
            name: "Alice Johnson",
            avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHx1c2VyJTJCYXZhdGFyfGVufDB8fHx8MTc0NzU0OTk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
            isOnline: true,
            lastActive: "2023-11-20T15:30:00Z"
          }
        };

        // Mock messages
        const mockMessages = [
          {
            id: 1,
            senderId: "user456",
            content: "Hi, is this still available?",
            timestamp: "2023-11-20T10:00:00Z",
            isRead: true
          },
          {
            id: 2,
            senderId: "current",
            content: "Yes, it's still available! Are you interested in buying?",
            timestamp: "2023-11-20T10:05:00Z",
            isRead: true
          },
          {
            id: 3,
            senderId: "user456",
            content: "Great! Would you be willing to meet tomorrow for the exchange?",
            timestamp: "2023-11-20T10:10:00Z",
            isRead: true
          },
          {
            id: 4,
            senderId: "current",
            content: "Sure, I'm available tomorrow afternoon. What time works for you?",
            timestamp: "2023-11-20T10:15:00Z",
            isRead: true
          }
        ];

        setThreadInfo(mockThreadInfo);
        setMessages(mockMessages);
        setError(null);
      } catch (err) {
        setError("Failed to load messages. Please try again later.");
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreadData();
  }, [threadId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempMessage = {
      id: Date.now(),
      senderId: "current",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, tempMessage]);
    setNewMessage("");

    try {
      // Simulate API call to send message
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In production, update the message status based on API response
    } catch (err) {
      console.error("Error sending message:", err);
      // Handle error - maybe show a retry button for failed messages
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Messages</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!threadInfo) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Link to={`/profile/${threadInfo.otherUser.id}`} className="relative">
            {threadInfo.otherUser.avatar ? (
              <img
                src={threadInfo.otherUser.avatar}
                alt={threadInfo.otherUser.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
            )}
            {threadInfo.otherUser.isOnline && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
            )}
          </Link>
          <div>
            <h2 className="font-medium text-gray-900">{threadInfo.otherUser.name}</h2>
            <p className="text-sm text-gray-500">
              {threadInfo.otherUser.isOnline ? (
                "Online"
              ) : (
                `Last active ${formatDistanceToNow(new Date(threadInfo.otherUser.lastActive), { addSuffix: true })}`
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Voice call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="152" y1="56" x2="200" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="152" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M156.39,153.34a8,8,0,0,1,7.59-.69l47.16,21.13a8,8,0,0,1,4.8,8.3A48.33,48.33,0,0,1,168,224,136,136,0,0,1,32,88,48.33,48.33,0,0,1,73.92,40.06a8,8,0,0,1,8.3,4.8l21.13,47.2a8,8,0,0,1-.66,7.53L81.32,125a7.93,7.93,0,0,0-.54,7.81c8.27,16.93,25.77,34.22,42.75,42.41a7.92,7.92,0,0,0,7.83-.59Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </button>
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Video call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="24" y="64" width="176" height="128" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="200 112 244 80 244 176 200 144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </button>
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="More options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="92" cy="60" r="16"/><circle cx="164" cy="60" r="16"/><circle cx="92" cy="128" r="16"/><circle cx="164" cy="128" r="16"/><circle cx="92" cy="196" r="16"/><circle cx="164" cy="196" r="16"/></svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
            <img
              src={threadInfo.product.image}
              alt={threadInfo.product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {threadInfo.product.title}
            </h3>
            <p className="text-sm text-gray-500">
              ${threadInfo.product.price.toFixed(2)}
            </p>
          </div>
          <div>
            <span className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${threadInfo.product.status === "available"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"}
            `}>
              {threadInfo.product.status === "available" ? "Available" : "Sold"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === "current" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Show avatar for first message or when previous message was from other user */}
            {message.senderId !== "current" && (
              (index === 0 || messages[index - 1].senderId !== message.senderId) ? (
                <div className="flex-shrink-0 mr-3">
                  {threadInfo.otherUser.avatar ? (
                    <img
                      src={threadInfo.otherUser.avatar}
                      alt={threadInfo.otherUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-8 mr-3" /> // Spacer for alignment
              )
            )}

            <div className={`
              max-w-[70%] rounded-lg px-4 py-2 
              ${message.senderId === "current"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900"}
            `}>
              <p>{message.content}</p>
              <div className={`
                text-xs mt-1 flex items-center
                ${message.senderId === "current" ? "text-blue-100" : "text-gray-500"}
              `}>
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                {message.senderId === "current" && (
                  <span className="ml-2 flex items-center">
                    {message.isRead ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        <span className="ml-1">Read</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        <span className="ml-1">Sent</span>
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              {threadInfo.otherUser.avatar ? (
                <img
                  src={threadInfo.otherUser.avatar}
                  alt={threadInfo.otherUser.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </div>
              )}
            </div>
            <div className="bg-gray-100 rounded-full px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Attach file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M32,216V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V216l-32-16-32,16-32-16L96,216,64,200Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="148" y1="108" x2="184" y2="108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="148" y1="148" x2="184" y2="148" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="72" y="96" width="40" height="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Send emoji"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="92" cy="140" r="16"/><circle cx="164" cy="140" r="16"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="92 92 128 116 164 92" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M108,177.5a39.11,39.11,0,0,1,40,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </button>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`
              p-2 rounded-full
              ${newMessage.trim()
                ? "text-white bg-blue-600 hover:bg-blue-700"
                : "text-gray-400 bg-gray-100"}
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="144" y1="128" x2="80" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48.49,221.28A8,8,0,0,0,59.93,231l168-96.09a8,8,0,0,0,0-14l-168-95.85a8,8,0,0,0-11.44,9.67L80,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageThread;