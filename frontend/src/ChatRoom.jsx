import { Send, Smile, MoreVertical, ArrowLeft, Sparkles, Flag, LogOut, SkipForward } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export default function ChatRoomScreen() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! 👋",
      sender: 'other',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: 2,
      text: "Hi! How's it going?",
      sender: 'me',
      timestamp: new Date(Date.now() - 90000)
    },
    {
      id: 3,
      text: "Pretty good! Just enjoying some music. What about you?",
      sender: 'other',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 4,
      text: "Nice! I'm good too, just exploring this app 😊",
      sender: 'me',
      timestamp: new Date(Date.now() - 30000)
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const menuRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
  
  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'me',
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate other person typing and responding
      setTimeout(() => {
        const responses = [
          "That's interesting! Tell me more 😊",
          "Haha, I totally agree!",
          "Really? That sounds cool!",
          "I love that! 🎉",
          "Nice! What else do you like?",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
          id: messages.length + 2,
          text: randomResponse,
          sender: 'other',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 1500 + Math.random() * 1500);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };
  
  const handleReportUser = () => {
    setShowMenu(false);
    if (window.confirm('Are you sure you want to report this user?')) {
      alert('User reported. Thank you for helping keep our community safe.');
    }
  };
  
  const handleLeaveChat = () => {
    setShowMenu(false);
    if (window.confirm('Are you sure you want to leave this chat?')) {
      alert('You have left the chat.');
    }
    navigate('/matching');
  };
  
  const handleNextMatch = () => {
    setShowMenu(false);
    if (window.confirm('Find a new match? This will end the current conversation.')) {
      alert('Finding your next match... ✨');
    }
    navigate('/matching');
  };
  
  return (
    <div className="h-screen min-w-screen bg-gray-950 flex flex-col relative overflow-hidden">
      {/* Quirky Background Illustrations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Quirky small illustrations scattered around */}
        <div className="absolute top-20 left-1/4 text-4xl opacity-10 animate-bounce" style={{ animationDuration: '3s' }}>💬</div>
        <div className="absolute top-40 right-1/4 text-3xl opacity-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-40 left-1/3 text-5xl opacity-10 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>😊</div>
        <div className="absolute top-1/2 right-20 text-3xl opacity-10 animate-bounce" style={{ animationDuration: '4.5s' }}>💭</div>
        <div className="absolute bottom-1/3 right-1/3 text-4xl opacity-10 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '2s' }}>🎉</div>
        <div className="absolute top-1/3 left-20 text-3xl opacity-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1.5s' }}>💫</div>
        <div className="absolute bottom-20 left-1/4 text-3xl opacity-10 animate-bounce" style={{ animationDuration: '5s' }}>🚀</div>
        
        {/* Small decorative shapes */}
        <div className="absolute top-1/4 right-1/2 w-8 h-8 border-2 border-purple-500/10 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-6 h-6 border-2 border-blue-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-10 h-10 border-2 border-purple-500/10 rounded-full animate-pulse"></div>
      </div>
      
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-xl">🎭</span>
          </div>
          
          <div>
            <h2 className="text-white font-semibold">Anonymous Friend</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-gray-400 text-sm">Online</p>
            </div>
          </div>
        </div>
        
        {/* Leave Chat Button - Top Right */}
        <button 
          onClick={handleLeaveChat}
          className="text-orange-400 hover:text-orange-300 transition-colors hover:scale-110 active:scale-95"
          title="Leave Chat"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
      
      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 relative z-10"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 transparent' }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'me'
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-sm'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/10 rounded-bl-sm'
                }`}
              >
                <p className="text-[15px] leading-relaxed break-words">{message.text}</p>
              </div>
              <p className={`text-xs text-gray-500 mt-1 px-2 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-t border-white/5 px-4 py-5 relative z-10">
        <div className="flex items-end gap-3">
          <button className="text-gray-400 hover:text-white transition-colors pb-3">
            <Smile className="w-6 h-6" />
          </button>
          
          <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onClick={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-[15px]"
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-3 rounded-2xl transition-all duration-200 ${
              inputText.trim()
                ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Action Buttons Row */}
        <div className="flex items-center justify-between mt-4 px-1 py-3 bg-white/5 rounded-xl border border-white/5">
          {/* Report User */}
          <button
            onClick={handleReportUser}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all hover:scale-105 active:scale-95"
            title="Report User"
          >
            <Flag className="w-5 h-5" />
            <span className="text-sm font-medium">Report</span>
          </button>
          
          {/* Fun hint */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <p className="text-gray-400 text-sm font-medium">Be kind, be yourself!</p>
          </div>
          
          {/* Next Match */}
          <button
            onClick={handleNextMatch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-400 hover:from-purple-600/30 hover:to-blue-600/30 hover:text-purple-300 transition-all hover:scale-105 active:scale-95"
            title="Next Match"
          >
            <span className="text-sm font-medium">Next Match</span>
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </div>
  );
}