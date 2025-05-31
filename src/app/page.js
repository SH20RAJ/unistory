"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Users, BookOpen, Shield, Zap, Star } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('unistory_onboarding_completed');
    if (onboardingCompleted === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleJoinCampus = () => {
    router.push('/signup');
  };
  return (<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">      {/* Header */}      <header className="border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80">        <div className="container mx-auto px-4 py-4 flex items-center justify-between">          <div className="flex items-center space-x-2">            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">              <span className="text-white font-bold text-lg">U</span>            </div>            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">              Unistory            </span>          </div>          <div className="flex items-center space-x-4">            <Button variant="ghost">Sign In</Button>            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">              Join Campus            </Button>          </div>        </div>      </header>      {/* Hero Section */}      <section className="container mx-auto px-4 py-20 text-center">        <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100">          🎓 College Students Only        </Badge>                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">          Your Campus,          <br />          Your Story        </h1>                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">          Connect with verified college students, share confessions anonymously,           find study buddies, and build meaningful relationships in a safe, psychology-driven environment.        </p>        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">          <div className="flex w-full sm:w-auto">            <Input placeholder="Enter your .edu email" className="rounded-r-none w-64" />            <Button className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600">              Get Started            </Button>          </div>        </div>        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm text-gray-600 dark:text-gray-400">          <div className="flex items-center justify-center space-x-2">            <Shield className="w-4 h-4" />            <span>Verified Only</span>          </div>          <div className="flex items-center justify-center space-x-2">            <Heart className="w-4 h-4" />            <span>Mental Wellness</span>          </div>          <div className="flex items-center justify-center space-x-2">            <Users className="w-4 h-4" />            <span>Safe Community</span>          </div>          <div className="flex items-center justify-center space-x-2">            <BookOpen className="w-4 h-4" />            <span>Study Together</span>          </div>        </div>      </section>      {/* Features Section */}      <section className="container mx-auto px-4 py-20">        <div className="text-center mb-16">          <h2 className="text-4xl font-bold mb-4">Everything You Need for College Life</h2>          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">            From anonymous confessions to study groups, we've built features that understand college student psychology          </p>        </div>        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">          {/* Secret Crush Feature */}          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20">            <CardHeader>              <CardTitle className="flex items-center space-x-2">                <Heart className="w-6 h-6 text-pink-600" />                <span>Secret Crush</span>              </CardTitle>            </CardHeader>            <CardContent>              <p className="text-gray-600 dark:text-gray-300">                Anonymously choose up to 5 people. If there's a match, both get notified. Safe, private, and exciting.              </p>            </CardContent>          </Card>          {/* Confession Wall */}
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-purple-600" />
          <span>Confession Wall</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          Share your thoughts anonymously in a moderated, safe space. Express yourself without judgment.
        </p>
      </CardContent>
    </Card>

    {/* Study Rooms */}
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-green-600" />
          <span>Virtual Study Rooms</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          Join focus sessions with Pomodoro timers, share notes, and collaborate on assignments with classmates.
        </p>
      </CardContent>
    </Card>

    {/* Mood Tracking */}
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-yellow-600" />
          <span>Mood & Growth Tracking</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          Daily check-ins, reflective journaling, and AI insights to support your mental wellness journey.
        </p>
      </CardContent>
    </Card>

    {/* Campus Feed */}
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-blue-600" />
          <span>Campus Community</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          Connect with classmates, join clubs, discover events, and build your college social network.
        </p>
      </CardContent>
    </Card>

    {/* Gamification */}
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-indigo-600" />
          <span>Growth Gamification</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          Earn badges for helpfulness, maintain streaks, and level up your college experience.
        </p>
      </CardContent>
    </Card>
  </div>
  </section>

    {/* CTA Section */}
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your College Experience?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Join thousands of students already connecting, learning, and growing together
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
          Join Your Campus Community
        </Button>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t bg-white/80 backdrop-blur-md dark:bg-gray-900/80 py-8">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 Unistory. Built for college students, by college students.</p>
      </div>
    </footer>
  </div>
  );
}
