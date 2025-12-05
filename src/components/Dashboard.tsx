'use client'

import { useState } from 'react'
import { ArrowRight, Users, Trophy, Zap, MessageCircle, Star, TrendingUp, Plus, Search, Filter } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('feed')

  const squads = [
    {
      id: 1,
      title: "🚀 Startup Launch Plan",
      creator: "Alex & 4 friends",
      status: "Complete",
      timeAgo: "2 hrs ago",
      members: 5,
      earned: 50,
      rating: 4.9,
      preview: "This is genius! 🔥",
      category: "Business"
    },
    {
      id: 2,
      title: "💪 Summer Fit Challenge",
      creator: "Jamie & crew",
      status: "In Progress",
      timeAgo: "3 days",
      members: 6,
      progress: "Day 3/90",
      category: "Health"
    },
    {
      id: 3,
      title: "🎬 Viral TikTok Content",
      creator: "Sarah's Squad",
      status: "Complete",
      timeAgo: "1 day ago",
      members: 4,
      earned: 35,
      rating: 4.8,
      preview: "2M views! 🔥",
      category: "Content"
    }
  ]

  const myStats = {
    totalEarned: 425,
    thisWeek: 156,
    reputation: 850,
    squadsCompleted: 23
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Aura Squad
              </div>
              <div className="hidden md:flex space-x-8">
                <button 
                  onClick={() => setActiveTab('feed')}
                  className={`px-3 py-2 rounded-lg transition-all ${activeTab === 'feed' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  Feed
                </button>
                <button 
                  onClick={() => setActiveTab('my-squads')}
                  className={`px-3 py-2 rounded-lg transition-all ${activeTab === 'my-squads' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  My Squads
                </button>
                <button 
                  onClick={() => setActiveTab('earnings')}
                  className={`px-3 py-2 rounded-lg transition-all ${activeTab === 'earnings' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  Earnings
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-300">Your Balance</div>
                <div className="text-lg font-bold text-purple-400">{myStats.totalEarned} AURA</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">This Week</span>
                  <span className="text-purple-400 font-bold">{myStats.thisWeek} AURA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Reputation</span>
                  <span className="text-yellow-400 font-bold">{myStats.reputation} ⭐</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Squads Done</span>
                  <span className="text-green-400 font-bold">{myStats.squadsCompleted}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create Squad</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search squads..."
                  className="w-full pl-10 pr-4 py-3 bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="px-6 py-3 bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
            </div>

            {/* Squad Feed */}
            <div className="space-y-6">
              {squads.map((squad) => (
                <div key={squad.id} className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{squad.title}</h3>
                      <p className="text-gray-300">by {squad.creator}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        squad.status === 'Complete' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {squad.status === 'Complete' ? '✅ Complete' : '⏳ In Progress'}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{squad.timeAgo}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">{squad.members} people</span>
                    </div>
                    {squad.earned && (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-bold">{squad.earned} AURA earned</span>
                      </div>
                    )}
                    {squad.rating && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">{squad.rating}/5 rating</span>
                      </div>
                    )}
                    {squad.progress && (
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-green-400">{squad.progress} complete</span>
                      </div>
                    )}
                  </div>

                  {squad.preview && (
                    <div className="bg-white/5 rounded-lg p-3 mb-4">
                      <p className="text-gray-300 italic">"{squad.preview}"</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                        Join Squad
                      </button>
                      <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                        View Details
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-400 text-sm">Join the conversation</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">
                Load More Squads
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
