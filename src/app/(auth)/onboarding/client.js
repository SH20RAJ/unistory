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

export default function OnboardingClient() {
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
    interests: [],
    followingIds: []
  })
  const [suggestedStudents, setSuggestedStudents] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch suggested students for the follow step
  const { data: studentsData, error: studentsError } = useSWRFetch(
    currentStep === 2 ? '/api/users/suggested' : null
  )

  useEffect(() => {
    if (studentsData?.data) {
      setSuggestedStudents(studentsData.data)
    }
  }, [studentsData])

  // Auto-populate form with existing user data if available
  useEffect(() => {
    if (user && isUserReady) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        bio: user.bio || '',
        major: user.major || '',
        year: user.year || ''
      }))
    }
  }, [user, isUserReady])

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleInterestToggle = useCallback((interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }, [])

  const handleFollowToggle = useCallback((studentId) => {
    setFormData(prev => ({
      ...prev,
      followingIds: prev.followingIds.includes(studentId)
        ? prev.followingIds.filter(id => id !== studentId)
        : [...prev.followingIds, studentId]
    }))
  }, [])

  const isStepValid = useCallback(() => {
    switch (currentStep) {
      case 0: // Profile step
        return formData.username.trim() && 
               formData.major && 
               formData.year
      case 1: // Interests step
        return formData.interests.length >= 3
      case 2: // Follow step
        return true // Optional step
      default:
        return true
    }
  }, [currentStep, formData])

  const handleNext = useCallback(async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Complete onboarding
      await handleCompleteOnboarding()
    }
  }, [currentStep, handleCompleteOnboarding])

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const handleCompleteOnboarding = async () => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      const result = await completeOnboarding({
        ...formData,
        onboardingCompleted: true
      })
      
      if (result.success) {
        toast.success('Welcome to UniStory! Your profile is now complete.')
        router.push('/dashboard')
      } else {
        toast.error(result.error || 'Failed to complete onboarding')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state
  if (isLoading || !isUserReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your experience...</p>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
              <p className="text-gray-600">Tell us a bit about yourself to get started</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="major">Major *</Label>
                  <Select value={formData.major} onValueChange={(value) => handleInputChange('major', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select major" />
                    </SelectTrigger>
                    <SelectContent>
                      {MAJORS.map(major => (
                        <SelectItem key={major} value={major}>
                          {major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="year">Year *</Label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
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
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Interests</h2>
              <p className="text-gray-600">Choose at least 3 interests to help us personalize your experience</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INTERESTS.map(interest => (
                <Badge
                  key={interest}
                  variant={formData.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer text-center justify-center py-2 px-3 ${
                    formData.interests.includes(interest)
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>

            <div className="text-center text-sm text-gray-500">
              {formData.interests.length}/3+ interests selected
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Follow Some Students</h2>
              <p className="text-gray-600">Start building your network by following interesting students</p>
            </div>

            {studentsError ? (
              <div className="text-center text-gray-500">
                <p>Unable to load suggested students</p>
                <p className="text-sm">You can skip this step and find students later</p>
              </div>
            ) : suggestedStudents.length === 0 ? (
              <div className="text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p>Loading suggested students...</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {suggestedStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.username?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">@{student.username}</p>
                        <p className="text-sm text-gray-500">{student.major} • {student.year}</p>
                      </div>
                    </div>
                    <Button
                      variant={formData.followingIds.includes(student.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFollowToggle(student.id)}
                    >
                      {formData.followingIds.includes(student.id) ? (
                        <>
                          <UserPlus className="w-4 h-4 mr-1" />
                          Following
                        </>
                      ) : (
                        'Follow'
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center text-sm text-gray-500">
              {formData.followingIds.length} students selected
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-blue-600 text-white' : 
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
            </p>
          </div>
        </div>

        {/* Main content */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            {renderStepContent()}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
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
                disabled={!isStepValid() || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {currentStep === STEPS.length - 1 ? 'Completing...' : 'Next'}
                  </>
                ) : (
                  <>
                    {currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
