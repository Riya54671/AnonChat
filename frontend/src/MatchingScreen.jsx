import { Sparkles, Users, Zap, Smile, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function MatchingScreen() {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  const preferences = [
    { id: 'male', label: 'Male', icon: '👨' },
    { id: 'female', label: 'Female', icon: '👩' },
    { id: 'everyone', label: 'Everyone', icon: '🌍' },
  ];
  
  const togglePreference = (id) => {
    if (id === 'everyone') {
      // If "everyone" is selected, clear all other preferences
      setSelectedPreferences(['everyone']);
    } else {
      // Remove "everyone" if selecting specific preferences
      const newPrefs = selectedPreferences.filter(p => p !== 'everyone');
      
      if (newPrefs.includes(id)) {
        setSelectedPreferences(newPrefs.filter(p => p !== id));
      } else {
        setSelectedPreferences([...newPrefs, id]);
      }
    }
  };
  
  const handleFindChat = () => {
    if (selectedPreferences.length > 0) {
      setIsSearching(true);
      // Simulate matching process
      setTimeout(() => {
        setIsSearching(false);
        alert('Match found! Starting chat...');
        navigate('/chat');
      }, 3000);
    }
  };
  
  const isButtonEnabled = selectedPreferences.length > 0;
  
  return (
    <div className="min-h-screen min-w-screen bg-gray-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {!isSearching ? (
        <div className="max-w-3xl w-full relative z-10">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl mb-6 shadow-lg shadow-purple-500/30 animate-bounce">
              <Users className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl text-white mb-4">
              Ready to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Connect
              </span>
              ?
            </h1>
            
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-4">
              Choose who you'd like to chat with and we'll find you the perfect match!
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm text-purple-300 rounded-full border border-white/10">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Real people, real conversations!</span>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Chat Preferences</h2>
                <p className="text-gray-400 text-sm">Who would you like to talk to?</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {preferences.map((pref) => {
                const isSelected = selectedPreferences.includes(pref.id);
                return (
                  <button
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500 shadow-lg shadow-purple-500/30'
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
                      {pref.icon}
                    </div>
                    <p className={`text-lg font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {pref.label}
                    </p>
                    
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fun Fact Card */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <Smile className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">💡 Pro Tip!</h3>
                <p className="text-gray-300 text-sm">
                  Be yourself! The best conversations happen when you're genuine. 
                  Remember, everyone here is looking for real connections too!
                </p>
              </div>
            </div>
          </div>

          {/* Find Chat Button */}
          <button
            onClick={handleFindChat}
            disabled={!isButtonEnabled}
            className={`w-full py-5 rounded-2xl font-semibold text-lg text-white transition-all duration-300 flex items-center justify-center gap-3 ${
              isButtonEnabled
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] animate-pulse'
                : 'bg-gray-700/50 cursor-not-allowed opacity-50'
            }`}
          >
            <Search className="w-6 h-6" />
            Find a Chat Partner
            <Sparkles className="w-6 h-6" />
          </button>

          {!isButtonEnabled && (
            <p className="text-center text-gray-500 text-sm mt-4">
              Please select at least one preference to start matching
            </p>
          )}
        </div>
      ) : (
        // Loading State
        <div className="max-w-2xl w-full relative z-10">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              {/* Animated Circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full animate-ping"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-blue-500/30 rounded-full animate-ping delay-150"></div>
              </div>
              
              {/* Center Icon */}
              <div className="relative w-40 h-40 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-bounce">
                <Search className="w-16 h-16 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl text-white mb-4 font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Finding
              </span>{' '}
              Your Match...
            </h2>
            
            <div className="space-y-3 mb-8">
              <LoadingText text="🔍 Searching for awesome people..." delay={0} />
              <LoadingText text="✨ Checking compatibility..." delay={800} />
              <LoadingText text="🎯 Almost there..." delay={1600} />
            </div>
            
            {/* Floating Emojis */}
            <div className="flex items-center justify-center gap-4 text-4xl">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>😊</span>
              <span className="animate-bounce" style={{ animationDelay: '200ms' }}>💬</span>
              <span className="animate-bounce" style={{ animationDelay: '400ms' }}>🎉</span>
              <span className="animate-bounce" style={{ animationDelay: '600ms' }}>🚀</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingText({ text, delay }) {
  return (
    <p 
      className="text-gray-400 text-lg animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </p>
  );
}
