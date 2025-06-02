"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowRight, ArrowLeft, Users, UserPlus, GraduationCap, BookOpen, Heart } from 'lucide-react'
import { useSWRFetch } from '@/hooks/useSWR'
import { toast } from 'sonner'
import { useOnboarding } from '@/hooks/useOnboarding'

const STEPS = [
  { id: 'profile', title: 'Complete Your Profile', icon: GraduationCap },
  { id: 'interests', title: 'Select Your Interests', icon: Heart },
  { id: 'follow', title: 'Follow Some Students', icon: Users }
]

const MAJORS = [
  'Computer Science', 'Business Administration', 'Psychology', 'Biology',
  'Engineering', 'English Literature', 'Mathematics', 'Pre-Med', 'Economics',
  'Political Science', 'Art & Design', 'Communications', 'History', 'Physics',
  'Chemistry', 'Marketing', 'Finance', 'Nursing', 'Education', 'Philosophy',
  'Sociology', 'Environmental Science', 'Music', 'Theater', 'Journalism'
]

const INTERESTS = [
  'Study Groups', 'Parties & Social', 'Sports & Fitness', 'Music & Arts',
  'Technology', 'Travel', 'Food & Dining', 'Gaming', 'Reading', 'Movies & TV',
  'Photography', 'Volunteering', 'Entrepreneurship', 'Fashion', 'Mental Health',
  'Sustainability', 'Politics', 'Relationships', 'Career Development', 'Hobbies'
]

export default function OnboardingPage() {
  const router = useRouter()
  // Use our enhanced onboarding hook
  const { user, completeOnboarding, isLoading, isUserReady } = useOnboarding({
    redirectUnauth: true,
    redirectOnboarded: true,
    redirectNotOnboarded: false
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    major: '',
    year: '',
    university: '',
    interests: [],
    followingUsers: []
  })
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        university: user.university || '',
        bio: user.bio || ''
      }))
    }
  }, [user])

  // Import the useSWR hook for suggestions
  const { data: suggestedUsersData, error: suggestedUsersError } = useSWRFetch(
    currentStep === 2 && user?.university ?
      `/api/users/suggestions?university=${encodeURIComponent(user.university)}&email=${encodeURIComponent(user.email)}` :
      null
  )

  // Update suggested users when data changes
  useEffect(() => {
    setLoadingUsers(true)
    if (suggestedUsersData) {
      setSuggestedUsers(suggestedUsersData)
      setLoadingUsers(false)
    } else if (suggestedUsersError) {
      console.error('Error fetching suggested users:', suggestedUsersError)
      setLoadingUsers(false)
    }
  }, [suggestedUsersData, suggestedUsersError])

  useEffect(() => {
    if (currentStep === 2 && !user?.university) {
      // Fallback for when university is not set
      fetchSuggestedUsers()
    }
  }, [currentStep, user, fetchSuggestedUsers])

  // Fallback method for when we don't have university information
  const fetchSuggestedUsers = useCallback(async () => {
    try {
      setLoadingUsers(true)
      const response = await fetch(`/api/users/suggestions?email=${user?.email ? encodeURIComponent(user.email) : ''}`)
      if (response.ok) {
        const { data } = await response.json()
        setSuggestedUsers(data || [])
      }
    } catch (error) {
      console.error('Error fetching suggested users:', error)
    } finally {
      setLoadingUsers(false)
    }
  }, [user?.email])

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding by saving to database
      try {
        const onboardingData = {
          username: formData.username,
          bio: formData.bio,
          major: formData.major,
          year: formData.year,
          university: formData.university,
          interests: JSON.stringify(formData.interests)
        };

        const success = await completeOnboarding(onboardingData);

        if (success) {
          // If user selected users to follow, send follow requests
          if (formData.followingUsers.length > 0) {
            try {
              const followPromises = formData.followingUsers.map(async (userId) => {
                const response = await fetch('/api/follows', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    followeeId: userId,
                    type: 'follow'
                  })
                });
                return response.ok;
              });

              await Promise.allSettled(followPromises);
            } catch (error) {
              console.error('Error sending follow requests:', error);
            }
          }

          toast.success('Welcome to Unistory! Your profile is set up.');
          router.push('/dashboard');
        } else {
          toast.error('There was a problem completing your profile. Please try again.');
        }
      } catch (error) {
        console.error('Error completing onboarding:', error);
        toast.error('There was a problem completing your profile. Please try again.');
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const toggleFollowUser = (userId) => {
    setFormData(prev => ({
      ...prev,
      followingUsers: prev.followingUsers.includes(userId)
        ? prev.followingUsers.filter(id => id !== userId)
        : [...prev.followingUsers, userId]
    }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.username && formData.major && formData.year && formData.university
      case 1:
        return formData.interests.length >= 3
      case 2:
        return true // Following users is optional
      default:
        return false
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const currentStepData = STEPS[currentStep]
  const StepIcon = currentStepData.icon

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                  {index + 1}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600">
            Step {currentStep + 1} of {STEPS.length}: {currentStepData.title}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <StepIcon className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Profile */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Choose a unique username"
                  />
                </div>

                <div>
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                    placeholder="Your university name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="major">Major</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, major: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your major" />
                      </SelectTrigger>
                      <SelectContent>
                        {MAJORS.map(major => (
                          <SelectItem key={major} value={major}>{major}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="year">Academic Year</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell everyone a bit about yourself..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  Select at least 3 interests to help us personalize your experience
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {INTERESTS.map(interest => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      className={`cursor-pointer transition-all p-3 text-center justify-center ${formData.interests.includes(interest)
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'hover:bg-gray-100'
                        }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Selected: {formData.interests.length} interests
                </p>
              </div>
            )}

            {/* Step 3: Follow Users */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  Follow some students from your university to get started
                </p>

                {loadingUsers ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Finding students to follow...</p>
                  </div>
                ) : suggestedUsers.length > 0 ? (
                  <div className="space-y-3">
                    {suggestedUsers.slice(0, 6).map(suggestedUser => (
                      <div key={suggestedUser.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            {suggestedUser.avatar ? (
                              <Image 
                                src={suggestedUser.avatar} 
                                alt={suggestedUser.name} 
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full" 
                              />
                            ) : (
                              <span className="text-lg font-semibold">{suggestedUser.name[0]}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{suggestedUser.name}</h4>
                            <p className="text-sm text-gray-500">@{suggestedUser.username}</p>
                            <p className="text-xs text-gray-400">{suggestedUser.major} • {suggestedUser.year}</p>
                          </div>
                        </div>
                        <Button
                          variant={formData.followingUsers.includes(suggestedUser.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFollowUser(suggestedUser.id)}
                        >
                          {formData.followingUsers.includes(suggestedUser.id) ? (
                            <>Following</>
                          ) : (
                            <>Follow</>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No suggested users found. You can discover and follow users later!</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
