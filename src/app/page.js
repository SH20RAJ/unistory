"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingScreen } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Users, BookOpen, Shield, Zap, Star, ArrowRight, LogIn, Sparkles, GraduationCap, MessageCircle, Camera, ChevronUp } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, isOnboarded, isLoading: authLoading, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle scroll to show/hide scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Redirect authenticated users
    if (isAuthenticated && !authLoading) {
      if (isOnboarded) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    }
  }, [isAuthenticated, isOnboarded, authLoading, router]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (isOnboarded) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    } else {
      router.push('/signin');
    }
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Enhanced Header with Glass Effect */}
      <header className="border-b border-white/20 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
              Unistory
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white dark:from-white dark:to-gray-100 dark:text-gray-900 dark:hover:from-gray-100 dark:hover:to-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {isAuthenticated ? 'Continue' : 'Get Started'}
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 animate-fade-in-scale animate-stagger-1">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm hover-lift glass-effect">
              <GraduationCap className="w-4 h-4 mr-2" />
              For College Students
              <Sparkles className="w-4 h-4 ml-2 animate-subtle-bounce" />
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight animate-fade-in-up animate-stagger-2">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent animate-gradient">
              Your Campus
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              Your Story
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up animate-stagger-3">
            Connect authentically with verified students in a safe, supportive environment designed for college life.
            <span className="hidden md:inline"><br />Share experiences, find study partners, and build meaningful relationships.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-fade-in-up animate-stagger-4">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 text-lg rounded-full group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 hover-glow"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-float" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 px-8 py-5 text-lg rounded-full backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover-lift glass-effect"
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
            >
              <Camera className="w-5 h-5 mr-2" />
              See Features
            </Button>
          </div>

          {/* Enhanced Trust Indicators with animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto animate-fade-in-scale animate-stagger-5">
            {[
              { icon: Shield, text: "Verified Only", color: "text-green-600" },
              { icon: Heart, text: "Safe Space", color: "text-red-500" },
              { icon: Users, text: "Real Connections", color: "text-blue-600" },
              { icon: BookOpen, text: "Academic Focus", color: "text-purple-600" }
            ].map((item, index) => (
              <div key={index} className={`flex flex-col items-center space-y-3 p-6 group hover-lift transition-all duration-300 animate-stagger-${index + 1}`}>
                <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-600 glass-effect hover-glow">
                  <item.icon className={`w-7 h-7 ${item.color} group-hover:scale-110 transition-transform duration-300 animate-float`} style={{ animationDelay: `${index * 0.5}s` }} />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-200">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="relative py-20 lg:py-32">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-blue-50/80 dark:from-gray-900/50 dark:to-blue-950/30" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="mb-6">
              <Badge className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                ✨ Campus Life Reimagined
              </Badge>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Built for College Life
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto">
              Essential features designed with student wellbeing and authentic connection in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: "Anonymous Connections",
                description: "Connect authentically without judgment in a safe, moderated environment.",
                gradient: "from-pink-500 to-rose-500",
                bgGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
              },
              {
                icon: Shield,
                title: "Private Sharing",
                description: "Share thoughts and experiences in secure, supportive spaces with verified students.",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              },
              {
                icon: BookOpen,
                title: "Study Together",
                description: "Find study partners and collaborative learning opportunities across your campus.",
                gradient: "from-blue-500 to-indigo-500",
                bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
              },
              {
                icon: Users,
                title: "Verified Community",
                description: "Connect only with verified students from your campus through secure verification.",
                gradient: "from-purple-500 to-violet-500",
                bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
              },
              {
                icon: Zap,
                title: "Real-time Chat",
                description: "Instant messaging with end-to-end encryption and privacy at the core.",
                gradient: "from-yellow-500 to-orange-500",
                bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
              },
              {
                icon: Star,
                title: "Campus Events",
                description: "Discover and participate in campus activities, clubs, and social gatherings.",
                gradient: "from-cyan-500 to-teal-500",
                bgGradient: "from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20"
              }
            ].map((feature, index) => (
              <Card key={index} className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 hover-lift overflow-hidden relative glass-effect animate-fade-in-scale animate-stagger-${(index % 6) + 1}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex flex-col space-y-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 hover-glow animate-float`} style={{ animationDelay: `${index * 0.3}s` }}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Enhanced Testimonials Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="mb-6">
              <Badge className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border-0">
                💬 Student Voices
              </Badge>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                What Students Say
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto">
              Hear from our community about their authentic campus experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Emily R.",
                role: "Sophomore, Biology Major",
                university: "UC Berkeley",
                testimonial: "Unistory has transformed how I connect with classmates. It's a safe space to share and learn without fear of judgment.",
                avatar: "ER",
                gradient: "from-pink-400 to-rose-400"
              },
              {
                name: "Jake T.",
                role: "Senior, Computer Science",
                university: "MIT",
                testimonial: "Finally a platform that understands college life! I've made genuine friends and amazing study partners through anonymous connections.",
                avatar: "JT",
                gradient: "from-blue-400 to-indigo-400"
              },
              {
                name: "Sofia L.",
                role: "Freshman, Business Admin",
                university: "Stanford",
                testimonial: "The anonymous sharing feature is incredible. It allows me to express myself freely and connect with others going through similar experiences.",
                avatar: "SL",
                gradient: "from-purple-400 to-violet-400"
              }
            ].map((testimonial, index) => (
              <Card key={index} className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 hover-lift relative overflow-hidden glass-effect animate-fade-in-scale animate-stagger-${index + 1}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 hover-glow animate-float`} style={{ animationDelay: `${index * 0.4}s` }}>
                        <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                          {testimonial.university}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 text-4xl text-gray-300 dark:text-gray-600 font-serif animate-subtle-bounce">"</div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic pl-6 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 lg:py-32 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Trusted by Students Nationwide
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light">
              Join a growing community of verified college students
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "10,000+", label: "Active Students", icon: Users, color: "text-blue-600" },
              { number: "500+", label: "Universities", icon: GraduationCap, color: "text-green-600" },
              { number: "50,000+", label: "Connections Made", icon: Heart, color: "text-red-500" },
              { number: "99.9%", label: "Uptime", icon: Shield, color: "text-purple-600" }
            ].map((stat, index) => (
              <div key={index} className={`text-center group animate-fade-in-scale animate-stagger-${index + 1}`}>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto group-hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 hover-lift">
                    <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Interactive Elements */}
      <section className="container mx-auto px-6 py-20 lg:py-32 relative">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-blue-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-white dark:via-gray-100 dark:to-gray-200 rounded-3xl p-16 lg:p-20 glass-effect shadow-2xl hover:shadow-3xl transition-all duration-500 hover-lift animate-fade-in-scale relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
            </div>

            <div className="relative z-10">
              <div className="mb-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 dark:bg-gray-900/10 text-white/80 dark:text-gray-900/80 text-sm font-medium border border-white/20 dark:border-gray-900/20 backdrop-blur-sm animate-bounce-in">
                  <Sparkles className="w-4 h-4 mr-2 animate-subtle-bounce" />
                  Join the Community
                  <Sparkles className="w-4 h-4 ml-2 animate-subtle-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-amber-400 text-white dark:text-gray-900 tracking-tight animate-fade-in-up animate-stagger-1">
                {isAuthenticated
                  ? `Welcome back, ${user?.name?.split(' ')[0] || 'User'}!`
                  : 'Ready to Connect?'}
              </h2>

              <p className="text-xl mb-10 text-gray-300 dark:text-gray-600 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up animate-stagger-2">
                {isAuthenticated
                  ? 'Continue to your personalized campus experience and connect with your community.'
                  : 'Join thousands of students creating meaningful connections and building supportive communities across campuses.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-stagger-3">
                {isAuthenticated ? (
                  <Button
                    onClick={() => router.push('/dashboard')}
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 text-lg px-10 py-5 rounded-full group shadow-lg hover:shadow-xl transition-all duration-300 hover-glow"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleGetStarted}
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 text-lg px-10 py-5 rounded-full group shadow-lg hover:shadow-xl transition-all duration-300 hover-glow"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Join Your Campus
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white/30 dark:border-gray-900/30 text-white dark:text-gray-900 hover:bg-white/10 dark:hover:bg-gray-900/10 px-8 py-5 text-lg rounded-full backdrop-blur-sm transition-all duration-300 hover-lift"
                      onClick={handleSignIn}
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </Button>
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              {!isAuthenticated && (
                <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60 dark:text-gray-900/60 text-sm animate-fade-in-up animate-stagger-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>100% Verified Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Safe & Supportive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>10,000+ Active Users</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        </div>

        <div className="container mx-auto px-6 py-16 relative">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
                  Unistory
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mb-6">
                Connecting college students in safe, supportive environments. Built by students, for students, with privacy and authenticity at our core.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Privacy First</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Student Wellbeing</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
              <ul className="space-y-3">
                {['Features', 'Safety', 'Community', 'Support'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200 hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200 hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-500 dark:text-gray-500 font-light text-center md:text-left">
                © 2025 Unistory. Built for students, by students.
              </p>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-subtle-bounce" />
              <span className="text-sm text-gray-500">for college students</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group animate-bounce-in"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform duration-200" />
        </button>
      )}
    </div>
  );
}
