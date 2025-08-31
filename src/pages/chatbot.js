import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Plus, Settings, User, MessageCircle, Clock, Trash2, Search, Stethoscope, Heart, Moon, Sun, Mic } from 'lucide-react';
import { useRouter } from 'next/router';
import VirtualAssistantCard from "./virtualAssistantCard";
const MedXChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm MedX, your AI healthcare assistant. 🏥 How can I help you today? I can provide health information, answer medical questions, and assist with wellness guidance.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [shouldSpeak, setShouldSpeak] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth');
        if (res.ok) {
          //   router.push('/chatbot');
          console.log('Authenticated');
        }
      } catch (error) {
        router.push('/login');
        console.error('Error checking authentication:', error);
      }
    };
    checkAuth();
  }, [router]);
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await fetch("/api/get-chathistory", {
          method: "GET",
          credentials: "include", // so JWT cookie is sent
        });

        const data = await res.json();
        if (data.success) {
          // Map backend chats into frontend format
          const formatted = data.chats.map(chat => ({
            id: chat.chatId, // use backend chatId
            title: " AI Consultation", // we don’t have AI titles yet, so default
            date: new Date(chat.createdAt).toISOString().split("T")[0],
            preview: chat.preview,
          }));
          setChatHistory(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    fetchChatHistory();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/get-messages", {
          method: "GET",
          credentials: "include", // ensures cookies (JWT) are sent
        });

        const data = await res.json();
        if (data.success && Array.isArray(data.messages)) {
          // Convert backend messages into your frontend format if needed
          const formatted = data.messages.map((msg, index) => ({
            id: index + 2, // avoid clashing with default id=1
            type: msg.role === "bot" ? "bot" : "user",
            content: msg.content,
            timestamp: new Date(msg.timestamp),
          }));

          setMessages((prev) => [...prev, ...formatted]);
          console.log("Received messages:", messages);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleVirtualAssistantActivate = () => {
    setAssistantOpen(true);
  };
  // Pass this function to VirtualAssistantCard
const handleVoiceSubmit = async (voiceInput) => {
  await handleSendMessage(voiceInput);  // Reuse your chatbot flow
  setShouldSpeak(true);
};
const handleSendMessage = async (messageToSend) => {
   //Safely normalize to string
  const safeMessage = typeof messageToSend === "string" ? messageToSend : "";
  const safeInput = typeof inputMessage === "string" ? inputMessage : "";
  const message = safeMessage.trim() || safeInput.trim(); // Voice > Text
  if (!message) return;

  // Add user message to UI immediately
  const newMessage = {
    id: messages.length + 1,
    type: "user",
    content: message,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, newMessage]);
  setInputMessage(""); // Clear text input box
  setIsTyping(true);

  try {
    let chatId = currentChatId;

    // 1️⃣ If no active chat, create a new one
    if (!chatId) {
      const chatRes = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstMessage: {
            role: "user",
            content: message,
          },
        }),
      });

      if (!chatRes.ok) throw new Error("Failed to create new chat");
      const chatData = await chatRes.json();
      setChatHistory(prev => [
        {
          id: chatData.chatId,
          title: "AI Consultation",
          date: new Date().toISOString().split("T")[0],
          preview: message,
        },
        ...prev,
      ]);
      chatId = chatData.chatId;
      setCurrentChatId(chatId);
    } else {
      // 2️⃣ Push message to existing chat
      const msgRes = await fetch(`/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          sender: "user",
          content: message,
        }),
      });

      if (!msgRes.ok) throw new Error("Failed to send message");
      await msgRes.json();
    }

    // 3️⃣ Get bot reply
    const botRes = await fetch(`/api/botreply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        userMessage: message,
      }),
    });

    if (!botRes.ok) throw new Error("Failed to get bot reply");
    const botData = await botRes.json();

    const botResponse = {
      id: messages.length + 2,
      type: "bot",
      content: botData.reply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);

    // 4️⃣ Store bot response in DB
    await fetch(`/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        sender: "bot",
        content: botData.reply,
      }),
    });

  } catch (error) {
    console.error(error);

    const errorResponse = {
      id: messages.length + 2,
      type: "bot",
      content: "⚠️ Sorry, something went wrong. Please try again.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorResponse]);
  } finally {
    setIsTyping(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    const newChatId = null
    setCurrentChatId(newChatId);
    setMessages([{
      id: 1,
      type: 'bot',
      content: "Hello! I'm MedX, your AI healthcare assistant. 🏥 How can I help you today?",
      timestamp: new Date()
    }]);
    setSidebarOpen(false);
  };

  const loadChat = async (chatId) => {
    setCurrentChatId(chatId);

    try {
      const res = await fetch(`/api/get-messages?chatId=${chatId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        const formatted = data.messages.map((msg, index) => ({
          id: index + 1,
          type: msg.role === "bot" ? "bot" : "user",
          content: msg.content,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(formatted);
      }
    } catch (err) {
      console.error("Failed to load chat:", err);
    }

    setSidebarOpen(false);
  };


  const deleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const filteredChats = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex h-screen transition-colors duration-300 ${darkMode
      ? 'bg-gradient-to-br from-gray-900 to-gray-800'
      : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 shadow-xl transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 ${darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 ${darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold text-white">MedX</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* New Chat Button */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>New Consultation</span>
            </button>
          </div>

          {/* Search */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-colors ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
              />
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className={`text-sm font-semibold mb-3 flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                <Clock className="w-4 h-4 mr-2" />
                Recent Chats
              </h3>
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${currentChatId === chat.id
                      ? darkMode
                        ? 'bg-gray-700 border-l-4 border-blue-400'
                        : 'bg-blue-100 border-l-4 border-blue-500'
                      : darkMode
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                      }`}
                    onClick={() => loadChat(chat.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-medium truncate ${darkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>{chat.title}</h4>
                        <p className={`text-xs mt-1 truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>{chat.preview}</p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}>{chat.date}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className={`opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2 ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                          }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className={`p-4 border-t space-y-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={toggleDarkMode}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
              }`}>
              <Settings className="w-5 h-5" />
              <span className="text-sm">Settings</span>
            </button>
            <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
              }`}>
              <User className="w-5 h-5" />
              <span className="text-sm">Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className={`shadow-sm border-b px-4 py-3 transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>MedX Assistant</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your AI Healthcare Companion</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`hidden sm:flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Online
              </div>
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs sm:max-w-md md:max-w-lg ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                } space-x-3`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user'
                  ? 'bg-blue-500 ml-3'
                  : 'bg-gradient-to-r from-green-400 to-blue-500 mr-3'
                  }`}>
                  {message.type === 'user' ? (
                    <span className="text-white text-sm">👤</span>
                  ) : (
                    <span className="text-white text-sm">🏥</span>
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 shadow-sm ${message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 border border-gray-600'
                    : 'bg-white border border-gray-200'
                  }`}>
                  <p className={`text-sm ${message.type === 'user'
                    ? 'text-white'
                    : darkMode
                      ? 'text-gray-100'
                      : 'text-gray-800'
                    }`}>
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 ${message.type === 'user'
                    ? 'text-blue-100'
                    : darkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                    }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm">🏥</span>
                </div>
                <div className={`rounded-2xl px-4 py-3 shadow-sm ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
                  }`}>
                  <div className="flex space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-400'}`}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-400'}`} style={{ animationDelay: '0.1s' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-400'}`} style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`border-t p-4 transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your health concerns, medications, symptoms..."
                className={`w-full px-4 py-3 border rounded-2xl resize-none min-h-[48px] max-h-32 transition-colors ${darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
                rows={1}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-blue-500 text-white px-4 py-3 rounded-2xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center min-w-[48px]"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              onClick={handleVirtualAssistantActivate}
              className="bg-blue-500 text-white px-4 py-3 rounded-2xl hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center min-w-[48px]"
            >
              <Mic className="w-5 h-5" />
            </button>
            {/* Assistant Card */}
            <VirtualAssistantCard
              isOpen={assistantOpen}
              onClose={() => setAssistantOpen(false)}
              onVoiceSubmit={handleVoiceSubmit}
              botReply={messages[messages.length - 1]?.type === "bot" ? messages[messages.length - 1].content : ""}
              shouldSpeak={shouldSpeak}
              onSpoken={() => setShouldSpeak(false)}
            />
          </div>
          <p className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ⚕️ Remember: This AI assistant provides general health information and should not replace professional medical advice.
          </p>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MedXChatbot;