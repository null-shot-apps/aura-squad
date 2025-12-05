'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuraSquadHome() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-white font-bold text-xl">Aura Squad</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-white/80 text-sm">
              <span className="text-yellow-400">156</span> AURA
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {/* Action Buttons */}
        <div className="p-4 flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold text-sm">
            🎉 Create Squad
          </button>
          <button className="flex-1 bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-semibold text-sm border border-white/20">
            👥 Join Squads
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'trending'
                  ? 'bg-white text-purple-900'
                  : 'text-white/70'
              }`}
            >
              🔥 Trending
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'friends'
                  ? 'bg-white text-purple-900'
                  : 'text-white/70'
              }`}
            >
              👫 Friends
            </button>
          </div>
        </div>

        {/* Squad Feed */}
        <div className="px-4 space-y-4">
          {trendingSquads.map((squad) => (
            <div
              key={squad.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              {/* Squad Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {squad.title}
                  </h3>
                  <p className="text-white/70 text-sm">by {squad.creator}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    squad.status === 'Complete'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {squad.status === 'Complete' ? '✅' : '⏳'} {squad.status}
                  </div>
                  <p className="text-white/50 text-xs mt-1">{squad.timeAgo}</p>
                </div>
              </div>

              {/* Squad Stats */}
              <div className="flex items-center gap-4 mb-3 text-sm">
                <span className="text-white/70">
                  👥 {squad.participants} people
                </span>
                {squad.earned && (
                  <span className="text-green-400">
                    💰 {squad.earned} AURA earned
                  </span>
                )}
                {squad.rating && (
                  <span className="text-yellow-400">
                    ⭐ {squad.rating}/5
                  </span>
                )}
                {squad.progress && (
                  <span className="text-blue-400">
                    📈 {squad.progress}
                  </span>
                )}
              </div>

              {/* Preview/Latest */}
              {squad.preview && (
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                  <p className="text-white/90 text-sm">{squad.preview}</p>
                  {squad.memes && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {squad.memes.map((meme, idx) => (
                        <span key={idx} className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                          {meme}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {squad.latest && (
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                  <p className="text-white/90 text-sm">Latest: "{squad.latest}"</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium">
                  {squad.status === 'Complete' ? 'View Results' : 'Join Squad'}
                </button>
                <button className="bg-white/10 text-white py-2 px-4 rounded-lg text-sm">
                  👍
                </button>
                <button className="bg-white/10 text-white py-2 px-4 rounded-lg text-sm">
                  💬
                </button>
                <button className="bg-white/10 text-white py-2 px-4 rounded-lg text-sm">
                  📤
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black/80 backdrop-blur-sm border-t border-white/10">
          <div className="flex items-center justify-around py-3">
            <button className="flex flex-col items-center gap-1 text-purple-400">
              <span className="text-xl">🏠</span>
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60">
              <span className="text-xl">👥</span>
              <span className="text-xs">My Squads</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60">
              <span className="text-xl">💰</span>
              <span className="text-xs">Earnings</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60">
              <span className="text-xl">👤</span>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>

        {/* Bottom padding for fixed nav */}
        <div className="h-20"></div>
      </main>
    </div>
  );
}


