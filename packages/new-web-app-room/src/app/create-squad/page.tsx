'use client';

import { useState } from 'react';
import Link from 'next/link';

const suggestedRoles = {
  business: ['Market Researcher', 'Business Strategist', 'Financial Analyst', 'Marketing Expert', 'Operations Manager'],
  fitness: ['Personal Trainer', 'Nutritionist', 'Motivational Coach', 'Progress Tracker', 'Workout Planner'],
  travel: ['Route Planner', 'Budget Expert', 'Accommodation Scout', 'Activity Planner', 'Safety Advisor'],
  content: ['Content Strategist', 'Video Editor', 'Thumbnail Designer', 'Growth Hacker', 'Trend Analyst'],
  tech: ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'DevOps Engineer', 'Product Manager'],
  lifestyle: ['Life Coach', 'Organizer', 'Research Assistant', 'Creative Director', 'Accountability Partner']
};

export default function CreateSquad() {
  const [step, setStep] = useState(1);
  const [squadData, setSquadData] = useState({
    title: '',
    description: '',
    category: '',
    budget: 50,
    roles: [] as string[],
    privacy: 'friends' // 'friends' or 'public'
  });

  const handleRoleToggle = (role: string) => {
    setSquadData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleCreateSquad = () => {
    // Here we would integrate with the MCP tools
    console.log('Creating squad:', squadData);
    // Redirect to squad chat
    window.location.href = '/squad/1';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-white/70">
            ← Back
          </Link>
          <h1 className="text-white font-bold text-lg">Create Squad</h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Step {step} of 3</span>
            <span className="text-white/70 text-sm">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-xl font-bold mb-2">What do you need help with?</h2>
              <p className="text-white/70 text-sm mb-4">Describe your challenge and we'll suggest the perfect squad</p>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Squad Title</label>
              <input
                type="text"
                value={squadData.title}
                onChange={(e) => setSquadData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Plan my epic road trip"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Description</label>
              <textarea
                value={squadData.description}
                onChange={(e) => setSquadData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Tell us more about what you want to achieve..."
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">Category</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(suggestedRoles).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSquadData(prev => ({ ...prev, category }))}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                      squadData.category === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white/70 border border-white/20'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!squadData.title || !squadData.category}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Choose Your Squad
            </button>
          </div>
        )}

        {/* Step 2: Squad Roles */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-xl font-bold mb-2">Build Your Dream Squad</h2>
              <p className="text-white/70 text-sm mb-4">Select the roles you need for your {squadData.category} project</p>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">Suggested Roles</label>
              <div className="space-y-2">
                {suggestedRoles[squadData.category as keyof typeof suggestedRoles]?.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleToggle(role)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      squadData.roles.includes(role)
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white/70 border border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{role}</span>
                      {squadData.roles.includes(role) && <span>✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">Squad Preview</h3>
              <p className="text-white/70 text-sm mb-2">Selected roles: {squadData.roles.length}</p>
              <div className="flex flex-wrap gap-2">
                {squadData.roles.map((role) => (
                  <span key={role} className="bg-purple-600/30 text-purple-200 px-2 py-1 rounded-lg text-xs">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-white/10 text-white py-3 px-4 rounded-xl font-semibold border border-white/20"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={squadData.roles.length === 0}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold disabled:opacity-50"
              >
                Next: Settings
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget & Privacy */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-xl font-bold mb-2">Squad Settings</h2>
              <p className="text-white/70 text-sm mb-4">Set your budget and privacy preferences</p>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">Budget (AURA)</label>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/70 text-sm">Total budget</span>
                  <span className="text-white font-bold">{squadData.budget} AURA (~${(squadData.budget * 0.5).toFixed(2)})</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={squadData.budget}
                  onChange={(e) => setSquadData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-white/50 mt-2">
                  <span>10 AURA</span>
                  <span>200 AURA</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">Who can join?</label>
              <div className="space-y-3">
                <button
                  onClick={() => setSquadData(prev => ({ ...prev, privacy: 'friends' }))}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    squadData.privacy === 'friends'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/70 border border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👫</span>
                    <div>
                      <div className="font-medium">Friends Only</div>
                      <div className="text-sm opacity-70">Invite your friends to help for free</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setSquadData(prev => ({ ...prev, privacy: 'public' }))}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    squadData.privacy === 'public'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/70 border border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <div className="font-medium">Public Squad</div>
                      <div className="text-sm opacity-70">Hire expert agents from the community</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/30">
              <h3 className="text-white font-medium mb-2">🎉 Squad Summary</h3>
              <div className="space-y-1 text-sm text-white/80">
                <p><strong>Title:</strong> {squadData.title}</p>
                <p><strong>Category:</strong> {squadData.category}</p>
                <p><strong>Roles:</strong> {squadData.roles.length} selected</p>
                <p><strong>Budget:</strong> {squadData.budget} AURA</p>
                <p><strong>Privacy:</strong> {squadData.privacy === 'friends' ? 'Friends only' : 'Public'}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-white/10 text-white py-3 px-4 rounded-xl font-semibold border border-white/20"
              >
                Back
              </button>
              <button
                onClick={handleCreateSquad}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold"
              >
                🚀 Create Squad!
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
