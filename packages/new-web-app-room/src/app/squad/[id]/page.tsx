'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Mock squad data
const squadData = {
  id: 1,
  title: "🗺️ Epic Road Trip Plan",
  creator: "Mike",
  status: "In Progress",
  progress: 80,
  participants: [
    { id: 1, name: "Mike", role: "Creator", avatar: "🧑‍💼", online: true },
    { id: 2, name: "RouteGuru", role: "Route Planner", avatar: "🗺️", online: true, isAI: false },
    { id: 3, name: "BudgetBot", role: "Budget Expert", avatar: "💰", online: true, isAI: true },
    { id: 4, name: "Sarah", role: "Accommodation Scout", avatar: "🏨", online: true },
    { id: 5, name: "ActivityAI", role: "Activity Planner", avatar: "🎯", online: false, isAI: true }
  ],
  budget: 50,
  earned: 0,
  tasks: [
    { id: 1, title: "Route planning", completed: true, assignee: "RouteGuru" },
    { id: 2, title: "Budget breakdown", completed: true, assignee: "BudgetBot" },
    { id: 3, title: "Accommodation booking", completed: false, assignee: "Sarah" },
    { id: 4, title: "Activity scheduling", completed: false, assignee: "ActivityAI" },
    { id: 5, title: "Safety check", completed: false, assignee: "SafetyBot" }
  ]
};

const mockMessages = [
  {
    id: 1,
    sender: "RouteGuru",
    avatar: "🗺️",
    message: "Found an amazing route! 4500km through the most scenic parts 🛣️",
    timestamp: "2 min ago",
    reactions: { "🔥": 4, "❤️": 2, "💯": 1 },
    attachment: { type: "map", title: "Route Plan.pdf" }
  },
  {
    id: 2,
    sender: "BudgetBot",
    avatar: "💰",
    message: "Great news! Found flights for only $50 per person ✈️",
    timestamp: "1 min ago",
    reactions: { "😱": 5, "🙌": 3, "💰": 2 },
    attachment: { type: "link", title: "cheapflights.com", url: "#" }
  },
  {
    id: 3,
    sender: "Sarah",
    avatar: "🏨",
    message: "OMG this hostel has a pool AND free beer! 🍺",
    timestamp: "30 sec ago",
    reactions: { "🔥": 10, "😍": 8, "✨": 4 },
    attachment: { type: "image", title: "Awesome Hostel.jpg" }
  },
  {
    id: 4,
    sender: "Mike",
    avatar: "🧑‍💼",
    message: "This squad is KILLING IT! 🚀",
    timestamp: "10 sec ago",
    reactions: { "💪": 3, "🔥": 2 }
  }
];

export default function SquadChat({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: "You",
      avatar: "👤",
      message: newMessage,
      timestamp: "now",
      reactions: {}
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "ActivityAI",
        avatar: "🎯",
        message: "Love the energy! I'm working on some epic activities for you all 🏄‍♂️🦁",
        timestamp: "now",
        reactions: {}
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 flex-shrink-0">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white/70">
              ← Back
            </Link>
            <button 
              onClick={() => setShowProgress(!showProgress)}
              className="text-white/70"
            >
              ⚙️
            </button>
          </div>
          
          <div className="mt-2">
            <h1 className="text-white font-bold text-lg">{squadData.title}</h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-white/70 text-sm">
                👥 {squadData.participants.length} members
              </span>
              <span className="text-green-400 text-sm">
                📈 {squadData.progress}% complete
              </span>
              <span className="text-yellow-400 text-sm">
                💰 {squadData.earned}/{squadData.budget} AURA
              </span>
            </div>
          </div>

          {/* Online Members */}
          <div className="flex items-center gap-2 mt-3">
            {squadData.participants.filter(p => p.online).map(participant => (
              <div key={participant.id} className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
                  {participant.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-purple-900"></div>
              </div>
            ))}
            <span className="text-white/50 text-xs ml-2">
              {squadData.participants.filter(p => p.online).length} online
            </span>
          </div>
        </div>
      </header>

      {/* Progress Panel (toggleable) */}
      {showProgress && (
        <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 flex-shrink-0">
          <div className="max-w-md mx-auto p-4">
            <h3 className="text-white font-semibold mb-3">Squad Progress</h3>
            <div className="space-y-2">
              {squadData.tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <div className={`w-4 h-4 rounded-full ${task.completed ? 'bg-green-500' : 'bg-white/20'}`}>
                    {task.completed && <span className="text-xs">✓</span>}
                  </div>
                  <span className={`flex-1 text-sm ${task.completed ? 'text-white/70 line-through' : 'text-white'}`}>
                    {task.title}
                  </span>
                  <span className="text-xs text-white/50">{task.assignee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                {message.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium text-sm">{message.sender}</span>
                  <span className="text-white/50 text-xs">{message.timestamp}</span>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm p-3 border border-white/20">
                  <p className="text-white text-sm">{message.message}</p>
                  
                  {message.attachment && (
                    <div className="mt-2 p-2 bg-white/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {message.attachment.type === 'map' && '🗺️'}
                          {message.attachment.type === 'link' && '🔗'}
                          {message.attachment.type === 'image' && '🖼️'}
                        </span>
                        <span className="text-white/80 text-xs">{message.attachment.title}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Reactions */}
                {Object.keys(message.reactions).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {Object.entries(message.reactions).map(([emoji, count]) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(message.id, emoji)}
                        className="bg-white/10 rounded-full px-2 py-1 text-xs flex items-center gap-1 hover:bg-white/20 transition-colors"
                      >
                        <span>{emoji}</span>
                        <span className="text-white/70">{count}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Quick Reactions */}
                <div className="flex gap-1 mt-2">
                  {['🔥', '💯', '😍', '👍', '💪'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(message.id, emoji)}
                      className="text-lg hover:scale-110 transition-transform opacity-60 hover:opacity-100"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 flex-shrink-0">
        <div className="max-w-md mx-auto p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <div className="bg-white/10 rounded-2xl border border-white/20 flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Add to the squad chat..."
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/50 focus:outline-none"
                />
                <button className="p-3 text-white/60 hover:text-white">
                  📎
                </button>
                <button className="p-3 text-white/60 hover:text-white">
                  😊
                </button>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 mt-3">
            <button className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-xs border border-white/20">
              💡 Share idea
            </button>
            <button className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-xs border border-white/20">
              📋 Update progress
            </button>
            <button className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-xs border border-white/20">
              🎉 Celebrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
