'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingScreen } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Users, BookOpen, Shield, Zap, Star, ArrowRight, LogIn, Sparkles, GraduationCap, MessageCircle, Camera, ChevronUp } from "lucide-react";

export default function HomeClient() {
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
      router.push('/auth/signin');
    }
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading || authLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <div className="container flex items-center justify-between h-16 mx-auto px-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-calistoga">U</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white font-calistoga">Unistory</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Features</a>
            <a href="#community" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Community</a>
            <a href="#safety" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Safety</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:inline-flex" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-600 border-blue-200 bg-blue-50 dark:text-blue-400 dark:border-blue-900 dark:bg-blue-950">
              🎓 Exclusive College Social Network
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-100">
              Connect with Your Campus Community
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join the verified social platform built exclusively for college students. 
              Share experiences, form study groups, and make meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={handleGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg">
                Get Started with .edu Email
              </Button>
              <Button size="lg" variant="outline" onClick={handleSignIn} className="text-lg">
                <LogIn className="mr-2 h-5 w-5" /> Sign In
              </Button>
            </div>
          </div>

          <div className="mt-16 relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl -rotate-1 scale-105 opacity-10 blur-xl"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-900 rounded-t-xl">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <div className="flex justify-center mb-6">
                      <Camera className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">App screenshot or demo video will be here</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    U
                  </div>
                  <div>
                    <h4 className="font-semibold">Unistory Feed</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Latest updates from your campus</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900"></div>
                      <div>
                        <p className="text-sm font-medium">Campus Events</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Just now</p>
                      </div>
                    </div>
                    <p className="text-sm">Join us for the Computer Science Dept Hackathon this weekend!</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900"></div>
                      <div>
                        <p className="text-sm font-medium">Study Circle</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <p className="text-sm">Looking for students to join our ML study group...</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Join 10,000+ students already on the platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1">What We Offer</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Features Built for College Life</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tools and spaces designed to enhance your college experience and create meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Study Circles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Create or join study groups with students from your classes, departments, or shared interests.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">Resource Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Exchange notes, study guides, and helpful resources with peers in your academic community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-xl">Campus Life</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Stay updated on events, clubs, and activities happening around your campus.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Safe Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect privately with classmates and friends through our secure messaging system.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-xl">Verified Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  All members are verified through their .edu email addresses, ensuring a trusted community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl">Academic Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Access specialized tools for scheduling, task management, and academic planning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1">Join Our Community</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">A Network Built for Students</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Connect with fellow students, share experiences, and build lasting relationships on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exclusive Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Only current students with verified .edu emails can join
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Your People</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with classmates who share your interests and goals
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mb-4">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Your Network</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Establish connections that last beyond your college years
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" onClick={handleGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Join Your Campus Community <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1">Your Safety Matters</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Creating a Safe Environment</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We prioritize the safety and wellbeing of our community with robust security measures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Verified Users Only</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Every account is verified through institutional email addresses, ensuring only real students gain access.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced content moderation system helps maintain a respectful and positive environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1">Questions & Answers</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find answers to common questions about Unistory.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Who can join Unistory?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Unistory is exclusively for college students with a valid .edu email address. This ensures a trusted community of genuine students.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">How do I get started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Simply sign up using your college email address, complete your profile, and start connecting with your campus community!
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Is Unistory free to use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, Unistory is completely free for all college students. We believe in providing value without barriers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">How does Unistory protect my privacy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We take privacy seriously. Your data is encrypted, and we have strict policies about data sharing. You control what you share and with whom.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Your Campus Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with fellow students, access resources, and make the most of your college experience.
          </p>
          <Button size="lg" variant="secondary" onClick={handleGetStarted} className="text-lg px-8 py-6 h-auto hover:bg-white/90">
            Get Started with Your .edu Email
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-calistoga">U</span>
                </div>
                <span className="text-xl font-bold text-gray-800 dark:text-white font-calistoga">Unistory</span>
              </div>
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">© 2024 Unistory. All rights reserved.</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
