"use client";

import { useState, useEffect } from "react";
import { useAppAccess } from '@/hooks/use-premium';
import PremiumGate from '@/components/premium/PremiumGate';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
    Brain,
    Eye,
    Zap,
    Star,
    Crown,
    Gem,
    Sparkles,
    Target,
    Search,
    Users,
    Heart,
    Lock,
    Unlock,
    Gift,
    Trophy,
    Award,
    Timer,
    TrendingUp,
    Flame,
    ThumbsUp,
    Share2,
    Camera,
    Play,
    Pause,
    RotateCcw,
    CheckCircle,
    AlertCircle,
    Info,
    Shuffle,
    Volume2,
    VolumeX
} from "lucide-react";

const personalityQuestions = [
    {
        id: 1,
        question: "When you see someone attractive on campus, your first thought is:",
        options: [
            { text: "I wonder what they're studying", personality: "intellectual", points: 3 },
            { text: "I should find an excuse to talk to them", personality: "confident", points: 3 },
            { text: "They're probably out of my league", personality: "insecure", points: 3 },
            { text: "I wonder if they'd swipe right on me", personality: "modern", points: 3 }
        ]
    },
    {
        id: 2,
        question: "Your ideal Friday night is:",
        options: [
            { text: "Netflix and actually chill (alone)", personality: "introvert", points: 3 },
            { text: "Party with friends until 3 AM", personality: "extrovert", points: 3 },
            { text: "Deep conversation over coffee", personality: "deep", points: 3 },
            { text: "Gaming with online friends", personality: "digital", points: 3 }
        ]
    },
    {
        id: 3,
        question: "When stressed about exams, you:",
        options: [
            { text: "Study harder until you collapse", personality: "perfectionist", points: 3 },
            { text: "Stress-eat and watch TikTok", personality: "avoidant", points: 3 },
            { text: "Talk it out with friends", personality: "social", points: 3 },
            { text: "Accept your fate and wing it", personality: "zen", points: 3 }
        ]
    },
    {
        id: 4,
        question: "Your biggest fear in relationships is:",
        options: [
            { text: "Being vulnerable and getting hurt", personality: "guarded", points: 3 },
            { text: "Not being interesting enough", personality: "insecure", points: 3 },
            { text: "Losing my independence", personality: "independent", points: 3 },
            { text: "Never finding 'the one'", personality: "romantic", points: 3 }
        ]
    },
    {
        id: 5,
        question: "If you could read minds for one day, you'd:",
        options: [
            { text: "Find out what crushes think of you", personality: "romantic", points: 3 },
            { text: "Cheat on all your exams", personality: "practical", points: 3 },
            { text: "Understand your parents better", personality: "empathetic", points: 3 },
            { text: "Discover campus gossip and secrets", personality: "curious", points: 3 }
        ]
    }
];

const mindReadingResults = {
    intellectual: {
        title: "The Deep Thinker 🧠",
        description: "You analyze everything before making moves. Your mind is your greatest asset.",
        strengths: ["Strategic thinking", "Problem solving", "Long-term planning"],
        attractions: "Intelligence, wit, meaningful conversations",
        weakness: "Overthinking simple social situations",
        compatibility: ["deep", "empathetic", "independent"],
        color: "from-blue-500 to-purple-500",
        advice: "Trust your instincts more. Not everything needs analysis."
    },
    confident: {
        title: "The Natural Charmer 😎",
        description: "You radiate confidence and people are drawn to your energy.",
        strengths: ["Social magnetism", "Leadership", "Adaptability"],
        attractions: "Confidence, adventure, spontaneity",
        weakness: "Can come across as arrogant",
        compatibility: ["social", "extrovert", "romantic"],
        color: "from-orange-500 to-red-500",
        advice: "Show vulnerability sometimes. It makes you more relatable."
    },
    insecure: {
        title: "The Hidden Gem 💎",
        description: "You underestimate yourself, but others see your amazing qualities.",
        strengths: ["Empathy", "Humility", "Authenticity"],
        attractions: "Genuine connections, emotional depth, loyalty",
        weakness: "Self-doubt blocks your potential",
        compatibility: ["empathetic", "deep", "zen"],
        color: "from-purple-500 to-pink-500",
        advice: "You're more amazing than you think. Start believing it."
    },
    romantic: {
        title: "The Hopeless Romantic 💕",
        description: "You believe in fairy tale love and won't settle for less.",
        strengths: ["Emotional intelligence", "Loyalty", "Passion"],
        attractions: "Deep connections, romance, emotional intimacy",
        weakness: "Idealizing relationships",
        compatibility: ["empathetic", "deep", "guarded"],
        color: "from-pink-500 to-red-500",
        advice: "Love is messy and imperfect. Embrace the chaos."
    },
    independent: {
        title: "The Free Spirit 🦋",
        description: "You value freedom above all else and march to your own beat.",
        strengths: ["Self-reliance", "Authenticity", "Strength"],
        attractions: "Independence, adventure, personal growth",
        weakness: "Difficulty with commitment",
        compatibility: ["confident", "zen", "practical"],
        color: "from-green-500 to-blue-500",
        advice: "Interdependence isn't loss of freedom—it's multiplication of joy."
    }
};

const MindReadingCard = ({ question, onAnswer, currentAnswer, showResult }) => {
    const [selectedOption, setSelectedOption] = useState(currentAnswer);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsAnimating(true);
        setTimeout(() => {
            onAnswer(option);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <Card className={`transition-all duration-500 ${isAnimating ? 'scale-105 shadow-2xl' : ''} ${showResult ? 'border-purple-500 shadow-purple-200' : ''}`}>
            <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                </div>
                <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {question.options.map((option, index) => (
                    <Button
                        key={index}
                        variant={selectedOption?.text === option.text ? "default" : "outline"}
                        className={`w-full text-left justify-start h-auto p-4 transition-all duration-300 ${selectedOption?.text === option.text
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                                : 'hover:bg-purple-50 hover:border-purple-300'
                            }`}
                        onClick={() => handleSelect(option)}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption?.text === option.text
                                    ? 'border-white bg-white'
                                    : 'border-gray-300'
                                }`}>
                                {selectedOption?.text === option.text && (
                                    <CheckCircle className="w-4 h-4 text-purple-500" />
                                )}
                            </div>
                            <span className="flex-1">{option.text}</span>
                        </div>
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
};

const PersonalityResult = ({ personality, onShare, onRetake }) => {
    const result = mindReadingResults[personality];
    const [showingDetails, setShowingDetails] = useState(false);

    return (
        <div className="space-y-6">
            {/* Main Result Card */}
            <Card className={`bg-gradient-to-r ${result.color} text-white overflow-hidden relative`}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 animate-pulse">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <div className="absolute top-8 right-8 animate-bounce delay-1000">
                        <Star className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-4 left-8 animate-pulse delay-500">
                        <Gem className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-8 right-4 animate-bounce delay-700">
                        <Crown className="w-5 h-5" />
                    </div>
                </div>

                <CardContent className="p-8 relative z-10">
                    <div className="text-center">
                        <div className="text-5xl mb-4">{result.title}</div>
                        <p className="text-xl opacity-90 mb-6">{result.description}</p>

                        <div className="flex justify-center space-x-4">
                            <Button
                                variant="secondary"
                                onClick={() => setShowingDetails(!showingDetails)}
                                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                {showingDetails ? 'Hide' : 'Show'} Details
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={onShare}
                                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Result
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Detailed Analysis */}
            {showingDetails && (
                <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-top duration-500">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <span>Your Strengths</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {result.strengths.map((strength, index) => (
                                    <li key={index} className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Heart className="w-5 h-5 text-red-500" />
                                <span>What Attracts You</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{result.attractions}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                <span>Growth Area</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{result.weakness}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                <span>Compatible Types</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {result.compatibility.map((type, index) => (
                                    <Badge key={index} variant="secondary">
                                        {mindReadingResults[type]?.title.split(' ')[1] || type}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Advice Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-800 mb-2">Mind Reader's Advice</h3>
                            <p className="text-blue-700">{result.advice}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <Button onClick={onRetake} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Take Again
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                    <Search className="w-4 h-4 mr-2" />
                    Find Compatible Matches
                </Button>
            </div>
        </div>
    );
};

export default function MindReadingPage() {
    const { hasAccess } = useAppAccess('Mind Reader');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [personalityType, setPersonalityType] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isThinking, setIsThinking] = useState(false);

    const handleAnswer = (option) => {
        const newAnswers = { ...answers, [currentQuestion]: option };
        setAnswers(newAnswers);

        setIsThinking(true);
        setTimeout(() => {
            if (currentQuestion < personalityQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setProgress(((currentQuestion + 1) / personalityQuestions.length) * 100);
            } else {
                // Calculate personality type
                const personalityScores = {};
                Object.values(newAnswers).forEach(answer => {
                    personalityScores[answer.personality] = (personalityScores[answer.personality] || 0) + answer.points;
                });

                const dominantPersonality = Object.keys(personalityScores).reduce((a, b) =>
                    personalityScores[a] > personalityScores[b] ? a : b
                );

                setPersonalityType(dominantPersonality);
                setShowResult(true);
                setProgress(100);
            }
            setIsThinking(false);
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResult(false);
        setPersonalityType(null);
        setProgress(0);
    };

    const shareResult = () => {
        // Implement sharing functionality
        console.log('Sharing personality result:', personalityType);
    };

    if (showResult && personalityType) {
        return (
            <>
                {!hasAccess && <PremiumGate appName="Mind Reader" />}
                {hasAccess && (
                    <div className="space-y-6">
                        <PersonalityResult
                            personality={personalityType}
                            onShare={shareResult}
                            onRetake={resetQuiz}
                        />
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            {!hasAccess && <PremiumGate appName="Mind Reader" />}
            {hasAccess && (
                <div className="space-y-6">
                    {/* Header */}
                    <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <CardContent className="p-6">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                                <Brain className="w-8 h-8" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold mb-2">AI Mind Reader</h1>
                        <p className="opacity-90">I can read your personality through 5 simple questions...</p>
                    </div>
                </CardContent>
            </Card>

            {/* Progress */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                            Question {currentQuestion + 1} of {personalityQuestions.length}
                        </span>
                        <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                </CardContent>
            </Card>

            {/* Thinking Animation */}
            {isThinking && (
                <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Reading your mind...</h3>
                            <p className="opacity-90">Analyzing your psychological patterns...</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Current Question */}
            {!isThinking && (
                <MindReadingCard
                    question={personalityQuestions[currentQuestion]}
                    onAnswer={handleAnswer}
                    currentAnswer={answers[currentQuestion]}
                    showResult={false}
                />
            )}

            {/* Previous Results Teaser */}
            {currentQuestion === 0 && Object.keys(answers).length === 0 && (
                <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <Info className="w-6 h-6 text-yellow-600" />
                            <div>
                                <h3 className="font-semibold text-yellow-800">Join 12,847 students</h3>
                                <p className="text-sm text-yellow-700">who discovered their true personality and found better matches!</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
                </div>
            )}
        </>
    );
}
