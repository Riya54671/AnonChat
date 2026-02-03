import { MessageCircle, Shield, Users, MessageSquare, Sparkles, UserX, Heart, UserPlus, Settings, Smile, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';


export default function LandingPage() {
    
    const navigate = useNavigate();

   
  return (
    <div className="min-h-screen min-w-screen bg-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AnonChat
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-gray-200 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-400 hover:text-gray-200 transition-colors">
                How it Works
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">No profiles. No passwords. Just conversation.</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white">
                Connect{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Anonymously
                </span>
                , Chat Freely
              </h1>
              
              <p className="text-xl text-gray-400 max-w-xl">
                Find meaningful connections without the pressure of profiles. Match based on preferences, 
                share through nicknames, and have genuine conversations.
              </p>

              
<button onClick={() => navigate('/verification')} className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 w-60 h-12 text-2xl">
  Start Chatting
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</button>    
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1604872715218-1d3c2264ced5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB0YWxraW5nJTIwY29udmVyc2F0aW9uJTIwc2lsaG91ZXR0ZXxlbnwxfHx8fDE3NzAwMzMyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="People connecting anonymously"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                
                {/* Floating chat bubbles */}
                <div className="absolute -left-6 top-1/4 bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-700 max-w-xs animate-float">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">👤</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">MusicLover</div>
                      <div className="text-sm text-gray-400 mt-1">Hey! Love your taste in music 🎵</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-1/4 bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-700 max-w-xs animate-float-delayed">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">👤</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">StarGazer</div>
                      <div className="text-sm text-gray-400 mt-1">Thanks! Want to chat about concerts? 🎸</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 text-sm mb-4">
              Features
            </div>
            <h2 className="text-4xl sm:text-5xl mb-4 text-white">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AnonChat
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience a new way to connect with people online, free from the constraints of traditional social media
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Complete Anonymity',
                description: 'No profile pictures, no real names, no passwords. Just pick a nickname and start chatting.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Users,
                title: 'Smart Matching',
                description: 'Connect with people based on your preferences. Find conversations that matter to you.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: MessageSquare,
                title: 'Genuine Conversations',
                description: 'Without the pressure of profiles, focus on what really matters - meaningful dialogue.',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: Sparkles,
                title: 'Express Yourself',
                description: 'Share your interests through your bio. Let your personality shine without the profile pic.',
                color: 'from-violet-500 to-violet-600'
              },
              {
                icon: UserX,
                title: 'No Digital Footprint',
                description: 'Chat freely knowing your conversations stay private and your identity remains yours.',
                color: 'from-purple-600 to-blue-600'
              },
              {
                icon: Heart,
                title: 'Not a Dating App',
                description: 'Make friends, find communities, share interests. This is about connection, not romance.',
                color: 'from-blue-600 to-indigo-600'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 bg-gray-900"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 text-sm mb-4">
              Simple Process
            </div>
            <h2 className="text-4xl sm:text-5xl mb-4 text-white">
              How It{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in minutes and begin making meaningful connections right away
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
            {[
              {
                icon: UserPlus,
                step: '01',
                title: 'Pick a Nickname',
                description: 'Choose a unique nickname that represents you. No email, no password required.'
              },
              {
                icon: Settings,
                step: '02',
                title: 'Set Your Preferences',
                description: 'Tell us your matching preferences and write a bio that shows your interests.'
              },
              {
                icon: MessageCircle,
                step: '03',
                title: 'Get Matched',
                description: 'We\'ll connect you with people who match your preferences for meaningful conversations.'
              },
              {
                icon: Smile,
                step: '04',
                title: 'Start Chatting',
                description: 'Connect, chat, and build genuine friendships without the pressure of profiles.'
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                  )}
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-900 border-2 border-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-400">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
