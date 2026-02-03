import { User, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfileCreation() {
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const deviceId = localStorage.getItem("deviceId");
  
  const wordCount = bio.trim().split(/\s+/).filter(word => word.length > 0).length;
  const maxWords = 100;
  const isOverLimit = wordCount > maxWords;
  const isFormValid = nickname.trim().length > 0 && bio.trim().length > 0 && !isOverLimit;

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  
  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      const deviceId = localStorage.getItem("deviceId");
      console.log("📝 Submitting profile with deviceId:", deviceId);

      if (!deviceId) {
        alert("Device ID missing. Please restart.");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/profile/create", {
        deviceId,
        nickname,
        bio
      });

      console.log("✅ Profile response:", response.data);
      alert("Profile created successfully!");
      navigate('/matching');

    } catch (error) {
      console.error("❌ Profile creation error:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.error || error.message || "Profile creation failed";
      alert("Profile creation failed: " + errorMsg);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-2xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/30">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl text-white mb-4">
            Create Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
             Profile
            </span>
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm text-purple-300 rounded-full border border-white/10">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Just a nickname and bio—no personal info needed!</span>
          </div>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50">
          {/* Nickname Input */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-white font-medium mb-3">
              <User className="w-5 h-5 text-purple-400" />
              Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Choose a fun nickname..."
              maxLength={30}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
            />
            <p className="text-gray-500 text-sm mt-2">{nickname.length}/30 characters</p>
          </div>

          {/* Bio Textarea */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-white font-medium mb-3">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Bio
            </label>
            <textarea
              value={bio}
              onChange={handleBioChange}
              placeholder="Tell us about yourself... What do you like? What are you looking for in conversations?"
              rows={5}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <p className={`text-sm transition-colors duration-200 ${
                isOverLimit ? 'text-red-400 font-medium' : 'text-gray-500'
              }`}>
                {wordCount}/{maxWords} words
              </p>
              {isOverLimit && (
                <p className="text-red-400 text-sm">Please reduce your bio length</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              isFormValid
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-700/50 cursor-not-allowed opacity-50'
            }`}
          >
            Complete Profile
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
 