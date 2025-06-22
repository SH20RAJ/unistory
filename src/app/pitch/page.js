'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  TrendingUp, 
  Shield, 
  DollarSign,
  Zap,
  Target,
  Globe,
  Award,
  AlertTriangle,
  Rocket
} from 'lucide-react';

const pitchSlides = [
  {
    id: 1,
    title: "Executive Summary",
    icon: <Rocket className="w-8 h-8" />,
    content: {
      question: "What is Unistory in one sentence?",
      answer: "Unistory is the world's first verified college-only social platform that combines academic collaboration, mental wellness, and authentic connections to create a safer, smarter social media experience for 270 million college students globally.",
      keyPoints: [
        "First-mover in verified college-only social space",
        "Psychology-first design reduces anxiety, increases connection", 
        "Multi-dimensional: social + academic + wellness + career + dating",
        "Perfect timing: post-COVID demand for authentic connections"
      ],
      stats: [
        { label: "Target Market", value: "270M Students" },
        { label: "Market Size", value: "$400B+" },
        { label: "Mental Health Crisis", value: "87%" }
      ]
    }
  },
  {
    id: 2,
    title: "Market Opportunity",
    icon: <Globe className="w-8 h-8" />,
    content: {
      question: "How big is the total addressable market?",
      answer: "TAM: $400B+ global education technology market. SAM: $50B social media market for 18-24 demographic. SOM: $13.1B student wellness market targeting 270 million college students worldwide.",
      keyPoints: [
        "270 million college students globally spending $163B annually",
        "India: 45M students (largest market), US: 20M students",
        "87% report mental health challenges from current social media",
        "Post-COVID students crave genuine connections more than ever"
      ],
      stats: [
        { label: "TAM", value: "$400B+" },
        { label: "SAM", value: "$50B" },
        { label: "SOM", value: "$13.1B" }
      ]
    }
  },
  {
    id: 3,
    title: "Product & Technology",
    icon: <Zap className="w-8 h-8" />,
    content: {
      question: "What makes your product different from existing social media?",
      answer: "Five key differentiators: Verified safety (only real college students), Academic integration (study groups, note sharing), Mental wellness focus (mood tracking, peer support), Smart AI matching (study partners, dating), and Campus context (events, clubs, local businesses).",
      keyPoints: [
        "Verified .edu authentication eliminates fake accounts, trolls, predators",
        "AI-powered moderation trained specifically on college student behavior",
        "Integration with university systems (SSO, calendars, directories)",
        "Next.js 15, React 19, cloud-native infrastructure for scale"
      ],
      stats: [
        { label: "Safety Improvement", value: "90%" },
        { label: "Uptime", value: "99.9%" },
        { label: "Universities Ready", value: "500+" }
      ]
    }
  },
  {
    id: 4,
    title: "Business Model",
    icon: <DollarSign className="w-8 h-8" />,
    content: {
      question: "How do you make money?",
      answer: "Five revenue streams: Freemium subscriptions ($9.99/month), Enterprise B2B ($10K-100K/year), Targeted advertising ($50-200 CPM), Premium features ($4.99/month), and Marketplace commissions (15%).",
      keyPoints: [
        "Freemium model: 80% free users, 20% premium subscribers",
        "Students already pay $500+ for textbooks, $10/month for study tools is rational",
        "B2B enterprise licensing for universities and corporate recruiting",
        "Hyper-targeted advertising with precise demographic data"
      ],
      stats: [
        { label: "Year 1 ARR", value: "$2M" },
        { label: "Year 3 ARR", value: "$75M" },
        { label: "Year 5 ARR", value: "$600M" }
      ]
    }
  },
  {
    id: 5,
    title: "Competition Analysis",
    icon: <Target className="w-8 h-8" />,
    content: {
      question: "How do you compete with Instagram, TikTok, and Snapchat?",
      answer: "Different use case: we're academic collaboration with social features vs pure entertainment. Safety advantage: verified users vs anonymous trolls. Mental health focus: designed to reduce anxiety vs algorithms that increase it.",
      keyPoints: [
        "Instagram/TikTok: Generic, unsafe, mental health destructive",
        "Discord: Gaming-focused, complex UI, no academic features",
        "Slack: Corporate tool, expensive, not social",
        "We offer: Purpose-built for students, verified safety, comprehensive features"
      ],
      stats: [
        { label: "Safety vs Competitors", value: "10x Better" },
        { label: "Academic Integration", value: "First Mover" },
        { label: "Mental Health Focus", value: "Unique" }
      ]
    }
  },
  {
    id: 6,
    title: "Team & Execution",
    icon: <Users className="w-8 h-8" />,
    content: {
      question: "Who's on your founding team and what's your execution plan?",
      answer: "Experienced founding team with full-stack development, academic advisory from cognitive scientists, university connections through former student leaders, and proven execution through agile development and data-driven decisions.",
      keyPoints: [
        "CEO/CTO: Full-stack developer with previous startup experience",
        "Academic Advisor: Cognitive scientist specializing in student wellness",
        "Campus Relations: Former student government president with university connections",
        "Technical Team: 5 developers with social media, AI, and ed-tech experience"
      ],
      stats: [
        { label: "Current Team", value: "8 People" },
        { label: "Year 1 Target", value: "50 People" },
        { label: "Universities Partnered", value: "3" }
      ]
    }
  },
  {
    id: 7,
    title: "Financial Projections",
    icon: <TrendingUp className="w-8 h-8" />,
    content: {
      question: "What are your revenue projections and key metrics?",
      answer: "Aggressive but achievable growth: Year 1: $2M ARR with 50K paying users. Year 3: $75M ARR with 1M users. Year 5: $600M ARR with 8M users. LTV/CAC ratio of 20:1 with 2.3 month payback period.",
      keyPoints: [
        "CAC: $12 per user through campus ambassadors and viral growth",
        "LTV: $240 per user over 4-year college period",
        "Break-even: Month 18 with 100K paying users",
        "Profitability: Month 24 with diverse revenue streams"
      ],
      stats: [
        { label: "LTV/CAC Ratio", value: "20:1" },
        { label: "Payback Period", value: "2.3 Months" },
        { label: "Gross Margin", value: "85%" }
      ]
    }
  },
  {
    id: 8,
    title: "Funding Requirements",
    icon: <DollarSign className="w-8 h-8" />,
    content: {
      question: "How much are you raising and at what valuation?",
      answer: "Series A: ₹50 crores ($6M USD) for 15% equity at ₹335 crores ($41M USD) post-money valuation. Use of funds: 40% technology development, 30% user acquisition, 20% team building, 10% operations.",
      keyPoints: [
        "Pre-money valuation: ₹285 crores ($35M USD)",
        "Justified by market comparables: Discord ($15B), Clubhouse ($4B)",
        "36 months runway to profitability and Series B readiness",
        "Board seat for lead investor ($2M+ investment)"
      ],
      stats: [
        { label: "Raising", value: "₹50 Crores" },
        { label: "Valuation", value: "₹335 Crores" },
        { label: "Equity", value: "15%" }
      ]
    }
  },
  {
    id: 9,
    title: "Risk Mitigation",
    icon: <AlertTriangle className="w-8 h-8" />,
    content: {
      question: "What are the biggest risks and how do you mitigate them?",
      answer: "Key risks: University resistance (solved by partnership strategy), Privacy/safety incidents (advanced AI moderation), Competition from big tech (first-mover advantage), Regulatory changes (proactive compliance), User acquisition challenges (multiple channels).",
      keyPoints: [
        "Privacy by design architecture with minimal data collection",
        "GDPR and CCPA compliant with user control over personal data",
        "University partnerships create switching costs and loyalty",
        "Agile innovation vs corporate bureaucracy advantage"
      ],
      stats: [
        { label: "Data Protection", value: "GDPR Compliant" },
        { label: "Security", value: "SOC 2 Certified" },
        { label: "Uptime", value: "99.9%" }
      ]
    }
  },
  {
    id: 10,
    title: "Exit Strategy & Returns",
    icon: <Award className="w-8 h-8" />,
    content: {
      question: "What returns can investors expect and what's your exit strategy?",
      answer: "Multiple exit paths: IPO (5-7 years, $5B+ valuation), Strategic acquisition by education companies or tech giants, International licensing deals. Conservative 15x return, optimistic 30x return, moon shot 100x return for Series A investors.",
      keyPoints: [
        "IPO path: Following Snapchat, Pinterest trajectory",
        "Strategic buyers: Microsoft (LinkedIn education), Google (Workspace)",
        "Education acquirers: Pearson ($5B), McGraw-Hill ($3B), Chegg ($1B)",
        "First-mover advantage in $50B verified social market"
      ],
      stats: [
        { label: "Conservative Return", value: "15x" },
        { label: "Base Case Return", value: "30x" },
        { label: "Moon Shot Return", value: "100x" }
      ]
    }
  }
];

export default function PitchPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (isFullscreen) {
          toggleFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isFullscreen]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlides.length) % pitchSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const currentSlideData = pitchSlides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-xl">
            U
          </div>
          <div>
            <h1 className="text-2xl font-bold">Unistory Investor Pitch</h1>
            <p className="text-blue-200">The Future of College Social Media</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-white border-white/30">
            Slide {currentSlide + 1} of {pitchSlides.length}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleFullscreen}
            className="text-white border-white/30 hover:bg-white/10"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Card className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-8">
            {/* Slide Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                {currentSlideData.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{currentSlideData.title}</h2>
                <p className="text-blue-200">Slide {currentSlide + 1} of {pitchSlides.length}</p>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">
                Q: {currentSlideData.content.question}
              </h3>
              <p className="text-lg leading-relaxed mb-6">
                <span className="font-semibold text-green-300">A:</span> {currentSlideData.content.answer}
              </p>
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-300">Key Points</h4>
                <ul className="space-y-2">
                  {currentSlideData.content.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-purple-300">Key Metrics</h4>
                <div className="space-y-3">
                  {currentSlideData.content.stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-sm">{stat.label}</span>
                      <span className="font-bold text-lg text-green-300">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {pitchSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide 
                        ? 'bg-blue-400' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <Button 
                onClick={nextSlide}
                disabled={currentSlide === pitchSlides.length - 1}
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-black/20 backdrop-blur-sm p-4 text-center">
        <p className="text-blue-200 text-sm">
          Use arrow keys, spacebar, or buttons to navigate • Press F for fullscreen • ESC to exit fullscreen
        </p>
        <div className="flex justify-center space-x-6 mt-2 text-xs text-white/60">
          <span>📧 founders@unistory.in</span>
          <span>🌐 unistory.pages.dev</span>
          <span>📅 Schedule Demo</span>
        </div>
      </div>
    </div>
  );
}
