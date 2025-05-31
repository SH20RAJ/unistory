"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    ChevronRight,
    ChevronLeft,
    Sparkles,
    User,
    GraduationCap,
    Heart,
    Target,
    MapPin,
    Calendar
} from "lucide-react";
import { useRouter } from "next/navigation";

const colleges = [
    "MIT", "Stanford University", "Harvard University", "UC Berkeley", "Carnegie Mellon",
    "Georgia Tech", "University of Washington", "UT Austin", "UCLA", "USC",
    "NYU", "Columbia University", "Princeton", "Yale", "Cornell",
    "Other"
];

const majors = [
    "Computer Science", "Engineering", "Business", "Psychology", "Biology",
    "Mathematics", "Physics", "Chemistry", "Economics", "Political Science",
    "Art & Design", "Literature", "History", "Philosophy", "Medicine",
    "Law", "Education", "Communications", "Environmental Science", "Music",
    "Other"
];

const interests = [
    { id: "tech", label: "Technology", icon: "💻" },
    { id: "sports", label: "Sports & Fitness", icon: "⚽" },
    { id: "music", label: "Music", icon: "🎵" },
    { id: "art", label: "Arts & Creativity", icon: "🎨" },
    { id: "gaming", label: "Gaming", icon: "🎮" },
    { id: "reading", label: "Reading", icon: "📚" },
    { id: "cooking", label: "Cooking", icon: "👨‍🍳" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "photography", label: "Photography", icon: "📸" },
    { id: "movies", label: "Movies & TV", icon: "🎬" },
    { id: "fashion", label: "Fashion", icon: "👗" },
    { id: "entrepreneurship", label: "Entrepreneurship", icon: "💡" },
    { id: "volunteering", label: "Volunteering", icon: "🤝" },
    { id: "nature", label: "Nature & Outdoors", icon: "🌲" },
    { id: "mental-health", label: "Mental Health", icon: "🧠" },
    { id: "networking", label: "Networking", icon: "🌐" },
    { id: "dancing", label: "Dancing", icon: "💃" },
    { id: "podcasts", label: "Podcasts", icon: "🎙️" },
    { id: "writing", label: "Writing", icon: "✍️" },
    { id: "meditation", label: "Meditation", icon: "🧘" },
    { id: "board-games", label: "Board Games", icon: "🎲" },
    { id: "anime", label: "Anime & Manga", icon: "🀄" },
    { id: "coffee", label: "Coffee Culture", icon: "☕" },
    { id: "sustainable-living", label: "Sustainability", icon: "♻️" }
];

const goals = [
    { id: "academic", label: "Excel academically", icon: "🎓" },
    { id: "social", label: "Make new friends", icon: "👥" },
    { id: "career", label: "Build my career", icon: "💼" },
    { id: "skills", label: "Learn new skills", icon: "🛠️" },
    { id: "relationship", label: "Find a relationship", icon: "💕" },
    { id: "fitness", label: "Stay healthy & fit", icon: "💪" },
    { id: "mental", label: "Improve mental wellness", icon: "🧘" },
    { id: "leadership", label: "Develop leadership", icon: "👑" },
    { id: "creativity", label: "Express creativity", icon: "🎨" },
    { id: "networking", label: "Professional networking", icon: "🤝" }
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0); // Start with welcome screen
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        location: "",
        phoneNumber: "",

        // Step 2: Academic Info
        college: "",
        major: "",
        year: "",
        gpa: "",
        dormOrOffCampus: "",

        // Step 3: Interests & Hobbies
        selectedInterests: [],
        bio: "",
        favoriteQuote: "",

        // Step 4: Goals & Preferences
        selectedGoals: [],
        studyHabits: "",
        socialPreferences: "",
        privacyLevel: "public",
        weekendActivities: "",

        // Step 5: Final Personalization
        morningOrNight: "",
        stressRelief: "",
        dreamJob: "",
        funFact: ""
    });

    const totalSteps = 5; // Updated to include welcome screen and final step
    const progress = currentStep === 0 ? 0 : ((currentStep - 1) / (totalSteps - 1)) * 100;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            // Complete onboarding
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        // Create a comprehensive user profile
        const userProfile = {
            ...formData,
            completedAt: new Date().toISOString(),
            profileComplete: true,
            version: "1.0",
            preferences: {
                notifications: {
                    email: true,
                    push: true,
                    sms: false
                },
                privacy: {
                    level: formData.privacyLevel,
                    showOnlineStatus: true,
                    allowDirectMessages: true
                },
                display: {
                    theme: "system",
                    language: "en"
                }
            },
            stats: {
                joinDate: new Date().toISOString(),
                totalPoints: 100, // Welcome bonus
                level: 1,
                badges: ["🎉"], // Welcome badge
                streak: 0
            }
        };

        // Save onboarding data to localStorage (in real app, this would be API call)
        localStorage.setItem('unistory_user_profile', JSON.stringify(userProfile));
        localStorage.setItem('unistory_onboarding_completed', 'true');

        // Show success message and redirect
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleInterest = (interestId) => {
        setFormData(prev => ({
            ...prev,
            selectedInterests: prev.selectedInterests.includes(interestId)
                ? prev.selectedInterests.filter(id => id !== interestId)
                : [...prev.selectedInterests, interestId]
        }));
    };

    const toggleGoal = (goalId) => {
        setFormData(prev => ({
            ...prev,
            selectedGoals: prev.selectedGoals.includes(goalId)
                ? prev.selectedGoals.filter(id => id !== goalId)
                : [...prev.selectedGoals, goalId]
        }));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 0:
                return true; // Welcome screen
            case 1:
                return formData.firstName && formData.lastName && formData.dateOfBirth && formData.gender;
            case 2:
                return formData.college && formData.major && formData.year;
            case 3:
                return formData.selectedInterests.length >= 3;
            case 4:
                return formData.selectedGoals.length >= 2;
            case 5:
                return true; // Final step, optional fields
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-8 text-center">
                        <div className="animate-fade-in">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-4xl">U</span>
                            </div>
                            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
                                Welcome to Unistory
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-light">
                                The exclusive social network where verified college students connect, learn, and grow together.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-0">
                                <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎓</span>
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Study Together</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Join virtual study rooms and connect with classmates
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-0">
                                <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💬</span>
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Share Safely</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Anonymous confessions and authentic campus conversations
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-0">
                                <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🌟</span>
                                </div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Grow Together</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Track wellness, build habits, and achieve your goals
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl max-w-2xl mx-auto border-0">
                            <p className="text-gray-700 dark:text-gray-300 font-light">
                                <strong className="font-semibold">🔒 Your Privacy Matters:</strong> We'll ask a few questions to personalize your experience.
                                You can always update these later, and we never share your personal information.
                            </p>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                                <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight">Tell us about yourself</h2>
                            <p className="text-gray-600 dark:text-gray-400 font-light">Let's start with the basics</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData('firstName', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData('lastName', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Gender</Label>
                            <RadioGroup
                                value={formData.gender}
                                onValueChange={(value) => updateFormData('gender', value)}
                                className="flex flex-wrap gap-4 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="non-binary" id="non-binary" />
                                    <Label htmlFor="non-binary">Non-binary</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label htmlFor="location">Location (City, State)</Label>
                            <Input
                                id="location"
                                placeholder="Boston, MA"
                                value={formData.location}
                                onChange={(e) => updateFormData('location', e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                            <Input
                                id="phoneNumber"
                                placeholder="+1 (555) 123-4567"
                                value={formData.phoneNumber}
                                onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Used for account security and campus event notifications</p>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                            <h2 className="text-2xl font-bold mb-2">Academic Information</h2>
                            <p className="text-gray-600 dark:text-gray-400">Help us connect you with the right people</p>
                        </div>

                        <div>
                            <Label htmlFor="college">College/University</Label>
                            <Select onValueChange={(value) => updateFormData('college', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your college" />
                                </SelectTrigger>
                                <SelectContent>
                                    {colleges.map((college) => (
                                        <SelectItem key={college} value={college}>
                                            {college}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="major">Major/Field of Study</Label>
                            <Select onValueChange={(value) => updateFormData('major', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your major" />
                                </SelectTrigger>
                                <SelectContent>
                                    {majors.map((major) => (
                                        <SelectItem key={major} value={major}>
                                            {major}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="year">Academic Year</Label>
                                <Select onValueChange={(value) => updateFormData('year', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="freshman">Freshman</SelectItem>
                                        <SelectItem value="sophomore">Sophomore</SelectItem>
                                        <SelectItem value="junior">Junior</SelectItem>
                                        <SelectItem value="senior">Senior</SelectItem>
                                        <SelectItem value="graduate">Graduate Student</SelectItem>
                                        <SelectItem value="phd">PhD Student</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="gpa">GPA (Optional)</Label>
                                <Input
                                    id="gpa"
                                    placeholder="3.8"
                                    value={formData.gpa}
                                    onChange={(e) => updateFormData('gpa', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="dormOrOffCampus">Living Situation</Label>
                            <Select onValueChange={(value) => updateFormData('dormOrOffCampus', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Where do you live?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="on-campus-dorm">On-campus Dorm</SelectItem>
                                    <SelectItem value="on-campus-apartment">On-campus Apartment</SelectItem>
                                    <SelectItem value="off-campus-with-roommates">Off-campus with Roommates</SelectItem>
                                    <SelectItem value="off-campus-alone">Off-campus Alone</SelectItem>
                                    <SelectItem value="with-family">Living with Family</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <Heart className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                            <h2 className="text-2xl font-bold mb-2">What are you passionate about?</h2>
                            <p className="text-gray-600 dark:text-gray-400">Select at least 3 interests (choose as many as you like!)</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {interests.map((interest) => (
                                <button
                                    key={interest.id}
                                    onClick={() => toggleInterest(interest.id)}
                                    className={`p-4 rounded-lg border-2 transition-all text-left interest-button ${formData.selectedInterests.includes(interest.id)
                                        ? 'border-blue-500 bg-gray-50 dark:bg-gray-700'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">{interest.icon}</div>
                                    <div className="font-medium text-sm">{interest.label}</div>
                                </button>
                            ))}
                        </div>

                        <div>
                            <Label htmlFor="bio">Tell us a bit about yourself (Optional)</Label>
                            <Textarea
                                id="bio"
                                placeholder="I'm a passionate computer science student who loves building apps and playing guitar in my free time..."
                                value={formData.bio}
                                onChange={(e) => updateFormData('bio', e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>

                        <div>
                            <Label htmlFor="favoriteQuote">Favorite Quote or Motto (Optional)</Label>
                            <Input
                                id="favoriteQuote"
                                placeholder="\'Be the change you wish to see in the world\' - Gandhi"
                                value={formData.favoriteQuote}
                                onChange={(e) => updateFormData('favoriteQuote', e.target.value)}
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                Selected: {formData.selectedInterests.length} interest{formData.selectedInterests.length !== 1 ? 's' : ''}
                                {formData.selectedInterests.length < 3 && (
                                    <span className="text-red-500 ml-2">
                                        (Need {3 - formData.selectedInterests.length} more)
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <Target className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                            <h2 className="text-2xl font-bold mb-2">What are your goals?</h2>
                            <p className="text-gray-600 dark:text-gray-400">Select at least 2 goals for your college experience</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {goals.map((goal) => (
                                <button
                                    key={goal.id}
                                    onClick={() => toggleGoal(goal.id)}
                                    className={`p-4 rounded-lg border-2 transition-all text-left goal-button ${formData.selectedGoals.includes(goal.id)
                                        ? 'border-blue-500 bg-gray-50 dark:bg-gray-700'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">{goal.icon}</div>
                                        <div className="font-medium">{goal.label}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="studyHabits">Study Preferences</Label>
                                <Select onValueChange={(value) => updateFormData('studyHabits', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="How do you prefer to study?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="solo">I prefer studying alone</SelectItem>
                                        <SelectItem value="small-groups">Small study groups (2-4 people)</SelectItem>
                                        <SelectItem value="large-groups">Large study groups (5+ people)</SelectItem>
                                        <SelectItem value="flexible">I'm flexible with both</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="socialPreferences">Social Preferences</Label>
                                <Select onValueChange={(value) => updateFormData('socialPreferences', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="How social are you?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="introverted">I'm more introverted</SelectItem>
                                        <SelectItem value="extroverted">I'm very extroverted</SelectItem>
                                        <SelectItem value="ambivert">I'm an ambivert</SelectItem>
                                        <SelectItem value="depends">It depends on the situation</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Privacy Preferences</Label>
                                <RadioGroup
                                    value={formData.privacyLevel}
                                    onValueChange={(value) => updateFormData('privacyLevel', value)}
                                    className="mt-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="public" id="public" />
                                        <Label htmlFor="public">Public - Anyone can find and connect with me</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="college-only" id="college-only" />
                                        <Label htmlFor="college-only">College Only - Only students from my college</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="private" id="private" />
                                        <Label htmlFor="private">Private - Only people I approve can connect</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div>
                                <Label htmlFor="weekendActivities">What do you usually do on weekends?</Label>
                                <Select onValueChange={(value) => updateFormData('weekendActivities', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your typical weekend" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="study-catch-up">Catch up on studies</SelectItem>
                                        <SelectItem value="social-events">Attend social events and parties</SelectItem>
                                        <SelectItem value="outdoor-activities">Outdoor activities and sports</SelectItem>
                                        <SelectItem value="creative-projects">Work on creative projects</SelectItem>
                                        <SelectItem value="part-time-work">Part-time work or internships</SelectItem>
                                        <SelectItem value="relax-recharge">Relax and recharge</SelectItem>
                                        <SelectItem value="explore-city">Explore the city/area</SelectItem>
                                        <SelectItem value="mix-everything">A mix of everything</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                Selected: {formData.selectedGoals.length} goal{formData.selectedGoals.length !== 1 ? 's' : ''}
                                {formData.selectedGoals.length < 2 && (
                                    <span className="text-red-500 ml-2">
                                        (Need {2 - formData.selectedGoals.length} more)
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                            <h2 className="text-2xl font-bold mb-2">Just a few more fun questions!</h2>
                            <p className="text-gray-600 dark:text-gray-400">Help us match you with like-minded people</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label>Are you more of a morning person or night owl?</Label>
                                <RadioGroup
                                    value={formData.morningOrNight}
                                    onValueChange={(value) => updateFormData('morningOrNight', value)}
                                    className="flex flex-wrap gap-4 mt-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="early-bird" id="early-bird" />
                                        <Label htmlFor="early-bird">🌅 Early bird (up before 7 AM)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="morning-person" id="morning-person" />
                                        <Label htmlFor="morning-person">☀️ Morning person</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="night-owl" id="night-owl" />
                                        <Label htmlFor="night-owl">🦉 Night owl</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="flexible" id="flexible" />
                                        <Label htmlFor="flexible">🔄 Flexible/Depends</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div>
                                <Label htmlFor="stressRelief">How do you usually handle stress?</Label>
                                <Select onValueChange={(value) => updateFormData('stressRelief', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose your stress relief method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="exercise">Exercise or physical activity</SelectItem>
                                        <SelectItem value="music">Listen to music or play instruments</SelectItem>
                                        <SelectItem value="friends">Talk to friends or family</SelectItem>
                                        <SelectItem value="alone-time">Spend time alone</SelectItem>
                                        <SelectItem value="creative">Creative activities (art, writing, etc.)</SelectItem>
                                        <SelectItem value="meditation">Meditation or mindfulness</SelectItem>
                                        <SelectItem value="gaming">Gaming or entertainment</SelectItem>
                                        <SelectItem value="nature">Spend time in nature</SelectItem>
                                        <SelectItem value="sleep">Sleep or rest</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="dreamJob">What's your dream job or career goal?</Label>
                                <Input
                                    id="dreamJob"
                                    placeholder="Software engineer at a startup, Doctor, Teacher, etc."
                                    value={formData.dreamJob}
                                    onChange={(e) => updateFormData('dreamJob', e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="funFact">Share a fun fact about yourself!</Label>
                                <Textarea
                                    id="funFact"
                                    placeholder="I can solve a Rubik's cube in under 2 minutes, I've been to 15 countries, I collect vintage postcards..."
                                    value={formData.funFact}
                                    onChange={(e) => updateFormData('funFact', e.target.value)}
                                    className="min-h-[80px]"
                                />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-center">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>🎉 Almost done!</strong> These details will help us create your personalized campus experience.
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
            <div className="max-w-2xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">U</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Welcome to Unistory
                        </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-light">
                        Let's personalize your experience to help you make the most of college life
                    </p>
                </div>

                {/* Progress */}
                {currentStep > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Step {currentStep} of {totalSteps}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}% complete</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 rounded-2xl">
                    <CardContent className="p-8">
                        <div className="animate-fade-in">
                            {renderStep()}
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="flex items-center space-x-2 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-full px-6"
                    >
                        <span>
                            {currentStep === 0 ? "Let's Get Started!" :
                                currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* Help Text */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                        This information helps us create a personalized experience for you.
                        <br />
                        You can always update these preferences later in your profile settings.
                    </p>
                </div>
            </div>
        </div>
    );
}
