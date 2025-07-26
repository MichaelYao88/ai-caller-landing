import { useState, useEffect, useRef } from "react";
import { PhoneCall, Bot, CalendarCheck, Users, Clock, CheckCircle, Star, Play, X, ArrowRight, Sparkles, Shield } from "lucide-react";

function App() {
  const [useCase, setUseCase] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(1247);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef(null);

  // Load reCAPTCHA script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize reCAPTCHA when script loads
      window.grecaptcha.ready(() => {
        if (recaptchaRef.current) {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: 'YOUR_SITE_KEY_HERE', // Replace with your actual site key
            callback: (token) => {
              console.log('reCAPTCHA verified:', token);
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
            }
          });
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Simulate real-time waitlist counter
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinWaitlist = async () => {
    if (!useCase || !email) {
      alert("Please fill in all fields.");
      return;
    }

    // Get reCAPTCHA token
    const recaptchaToken = window.grecaptcha ? window.grecaptcha.getResponse() : null;
    
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsLoading(true);

    try {
      // Verify reCAPTCHA token with your backend
      const response = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: recaptchaToken,
          useCase,
          email
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setUseCase("");
        setEmail("");
        setWaitlistCount(prev => prev + 1);
        // Reset reCAPTCHA
        window.grecaptcha.reset();
      } else {
        alert("Verification failed. Please try again.");
        window.grecaptcha.reset();
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Something went wrong. Please try again.");
      window.grecaptcha.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen text-gray-900 font-sans overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Callers
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{waitlistCount.toLocaleString()} joined</span>
          </div>
          <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold animate-pulse">
            Beta launching soon
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Revolutionary AI Phone Assistant</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black leading-tight">
              Skip the Calls.
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Let AI Handle It.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Tired of booking appointments or canceling subscriptions over the phone? Your AI assistant makes the call, handles the conversation, and gets things done — so you don't have to.
            </p>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-3">Join {waitlistCount.toLocaleString()}+ others</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-1">Early access reviews</span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 gap-4 pt-6">
              <FeatureItem 
                icon={<PhoneCall className="text-blue-500 h-5 w-5" />} 
                text="Calls real businesses and people on your behalf"
                highlight="real businesses"
              />
              <FeatureItem 
                icon={<CalendarCheck className="text-purple-500 h-5 w-5" />} 
                text="Books appointments, checks availability instantly"
                highlight="instantly"
              />
              <FeatureItem 
                icon={<Bot className="text-pink-500 h-5 w-5" />} 
                text="Sounds completely natural — they won't know it's AI"
                highlight="completely natural"
              />
            </div>

            {/* Video CTA */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="font-semibold">Watch it book a hair appointment</span>
            </button>
          </div>

          {/* Form Side */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/40 relative overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl opacity-75 blur-sm"></div>
              <div className="absolute inset-0.5 bg-white rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Get Early Access</h2>
                  <p className="text-gray-600 text-sm">
                    Join {waitlistCount.toLocaleString()}+ people on the waitlist
                  </p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-600 text-sm font-medium">Limited beta spots available</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      How would you use this? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      placeholder="e.g., Cancel my gym membership, call to check if a store has something in stock, book a doctor's appointment..."
                      className="w-full p-4 h-24 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none bg-white/90 placeholder-gray-400 transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/90 placeholder-gray-400 transition-colors"
                      required
                    />
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex justify-center py-2">
                    <div ref={recaptchaRef}></div>
                  </div>
                  
                  <button
                    onClick={handleJoinWaitlist}
                    disabled={submitted || isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Verifying...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>You're on the waitlist!</span>
                      </>
                    ) : (
                      <>
                        <span>Join the Waitlist</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mt-3">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Free early access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Can Your AI Assistant Do?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From mundane tasks to complex conversations, your AI handles phone calls with human-like intelligence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<PhoneCall className="h-10 w-10 text-blue-600" />}
              title="Handle Any Phone Call"
              desc="From booking appointments to asking questions, your AI navigates complex conversations with ease."
              examples={["Book restaurant reservations", "Cancel subscriptions", "Ask about store hours", "Schedule appointments"]}
            />
            <FeatureCard
              icon={<CalendarCheck className="h-10 w-10 text-purple-600" />}
              title="Real-Time Availability"
              desc="Get instant answers about availability, pricing, and scheduling without waiting on hold."
              examples={["Check if stores are open", "Get appointment slots", "Verify product availability", "Compare prices"]}
            />
            <FeatureCard
              icon={<Bot className="h-10 w-10 text-pink-600" />}
              title="Sounds Completely Human"
              desc="Advanced AI that understands context, shows empathy, and responds naturally to any situation."
              examples={["Natural conversation flow", "Handles interruptions", "Shows appropriate emotion", "Remembers context"]}
            />
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full relative">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-800/50 hover:bg-gray-800/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Demo video would play here</p>
                <p className="text-sm opacity-75 mt-2">Watch AI book a hair appointment</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-500 text-sm py-12 bg-gray-50">
        <p>© 2025 AI Callers — Making phone calls effortless for everyone</p>
      </footer>
    </div>
  );
}

// Enhanced Feature Card
function FeatureCard({ icon, title, desc, examples }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{desc}</p>
      <div className="space-y-1">
        {examples.map((example, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span>{example}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced Feature Item
function FeatureItem({ icon, text, highlight }) {
  const parts = text.split(highlight);
  return (
    <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-gray-700">
        {parts[0]}
        <span className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded">
          {highlight}
        </span>
        {parts[1]}
      </span>
    </div>
  );
}

export default App;