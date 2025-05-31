"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingScreen } from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { SignInButton } from "@/components/auth/SignIn";
import { Heart, Users, BookOpen, Shield, Zap, Star, ArrowRight, LogIn } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('unistory_onboarding_completed');
    if (onboardingCompleted === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Clean Header */}
      <header className="border-b border-gray-100 dark:border-gray-800 bg-white/80 backdrop-blur-xl dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Unistory
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              Sign In
            </Button>
            <Button onClick={handleGetStarted} className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Minimalistic Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
              🎓 For College Students
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
            Your Campus
            <br />
            <span className="text-gray-400">Your Story</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Connect authentically with verified students in a safe, supportive environment designed for college life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 px-8 py-4 text-lg rounded-full group shadow-lg"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Clean Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, text: "Verified Only" },
              { icon: Heart, text: "Safe Space" },
              { icon: Users, text: "Real Connections" },
              { icon: BookOpen, text: "Academic Focus" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 p-6">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800/30 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Built for College Life
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light">
              Essential features designed with student wellbeing in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Anonymous Connections",
                description: "Connect authentically without judgment in a safe environment."
              },
              {
                icon: Shield,
                title: "Private Sharing",
                description: "Share thoughts and experiences in moderated, supportive spaces."
              },
              {
                icon: BookOpen,
                title: "Study Together",
                description: "Find study partners and collaborative learning opportunities."
              },
              {
                icon: Users,
                title: "Verified Community",
                description: "Connect only with verified students from your campus."
              },
              {
                icon: Zap,
                title: "Real-time Chat",
                description: "Instant messaging with privacy and safety at the core."
              },
              {
                icon: Star,
                title: "Campus Events",
                description: "Discover and participate in campus activities and gatherings."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 rounded-2xl p-8">
                <div className="flex flex-col space-y-4">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Clean Testimonials Section */}
      <section className="bg-gray-50 dark:bg-gray-800/30 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light">
              Hear from our community about their experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Emily R.",
                role: "Sophomore, Biology Major",
                testimonial: "Unistory has transformed how I connect with classmates. It's a safe space to share and learn."
              },
              {
                name: "Jake T.",
                role: "Senior, Computer Science",
                testimonial: "Finally a platform that understands college life! I've made great friends and study partners."
              },
              {
                name: "Sofia L.",
                role: "Freshman, Business Admin",
                testimonial: "I love the anonymous sharing feature. It allows me to express myself freely without fear of judgment."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 rounded-2xl p-8">
                <div className="flex flex-col space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {testimonial.role}
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Elegant CTA Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-900 dark:bg-white rounded-3xl p-16 lg:p-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-gray-900 tracking-tight">
              {isAuthenticated
                ? `Welcome back, ${user?.name?.split(' ')[0] || 'User'}!`
                : 'Ready to Connect?'}
            </h2>
            <p className="text-xl mb-10 text-gray-300 dark:text-gray-600 max-w-2xl mx-auto font-light">
              {isAuthenticated
                ? 'Continue to your personalized campus experience.'
                : 'Join students creating meaningful connections and building supportive communities.'}
            </p>
            {isAuthenticated ? (
              <Button
                onClick={() => router.push('/dashboard')}
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 text-lg px-8 py-4 rounded-full group shadow-lg"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 text-lg px-8 py-4 rounded-full group shadow-lg"
              >
                Join Your Campus
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </section>
      
      {/* Clean Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 dark:text-gray-500 font-light">
            © 2025 Unistory. Built for students, by students.
          </p>
        </div>
      </footer>
    </div>
  );
}
