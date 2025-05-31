"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    ArrowLeft,
    Mail,
    Lock,
    User,
    GraduationCap,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Eye,
    EyeOff,
    Shield,
    Calendar,
    MapPin
} from "lucide-react";
import Link from "next/link";

const universities = [
    'Stanford University',
    'Harvard University',
    'MIT',
    'UC Berkeley',
    'UCLA',
    'Yale University',
    'Princeton University',
    'Columbia University',
    'University of Pennsylvania',
    'Northwestern University',
    'Other'
];

const majors = [
    'Computer Science',
    'Business Administration',
    'Psychology',
    'Engineering',
    'Biology',
    'Economics',
    'English',
    'Mathematics',
    'Political Science',
    'Chemistry',
    'Other'
];

const graduationYears = Array.from({ length: 8 }, (_, i) => 2025 + i);

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        university: '',
        major: '',
        graduationYear: '',
        agreeTerms: false,
        emailVerified: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\.edu$/.test(formData.email) && !formData.email.includes('@university.')) {
            newErrors.email = 'Please use a valid .edu email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.university) {
            newErrors.university = 'Please select your university';
        }

        if (!formData.major) {
            newErrors.major = 'Please select your major';
        }

        if (!formData.graduationYear) {
            newErrors.graduationYear = 'Please select your graduation year';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async () => {
        if (!formData.agreeTerms) {
            setErrors({ terms: 'You must agree to the terms and conditions' });
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep(4); // Success step
        }, 2000);
    };

    const sendVerificationEmail = () => {
        // Simulate sending verification email
        setFormData({ ...formData, emailVerified: true });
    };

    const updateFormData = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error for this field
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const getProgressPercentage = () => {
        switch (step) {
            case 1: return 25;
            case 2: return 50;
            case 3: return 75;
            case 4: return 100;
            default: return 0;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to Home */}
                <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to home
                </Link>

                <Card className="border-0 shadow-xl">
                    <CardHeader className="text-center pb-2">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">U</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Unistory
                            </span>
                        </div>

                        <div className="mb-4">
                            <Progress value={getProgressPercentage()} className="h-2" />
                            <p className="text-sm text-gray-500 mt-2">Step {step} of 4</p>
                        </div>

                        {step === 1 && (
                            <>
                                <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                                <CardDescription>
                                    Let's start with your basic information
                                </CardDescription>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <CardTitle className="text-2xl font-bold">Academic Details</CardTitle>
                                <CardDescription>
                                    Tell us about your university and studies
                                </CardDescription>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <CardTitle className="text-2xl font-bold">Almost Done!</CardTitle>
                                <CardDescription>
                                    Review and confirm your information
                                </CardDescription>
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <CardTitle className="text-2xl font-bold text-green-600">Welcome to Unistory!</CardTitle>
                                <CardDescription>
                                    Your account has been created successfully
                                </CardDescription>
                            </>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="text-center mb-4">
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100">
                                        🎓 College Students Only
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        Full Name
                                    </label>
                                    <Input
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={(e) => updateFormData('fullName', e.target.value)}
                                        className={errors.fullName ? 'border-red-500' : ''}
                                    />
                                    {errors.fullName && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            {errors.fullName}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        College Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="yourname@university.edu"
                                        value={formData.email}
                                        onChange={(e) => updateFormData('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email ? (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            {errors.email}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-gray-500">
                                            Must be a verified .edu or institutional email address
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <Lock className="w-4 h-4 mr-2" />
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a secure password"
                                            value={formData.password}
                                            onChange={(e) => updateFormData('password', e.target.value)}
                                            className={errors.password ? 'border-red-500' : ''}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                                            className={errors.confirmPassword ? 'border-red-500' : ''}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    onClick={handleNext}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <GraduationCap className="w-4 h-4 mr-2" />
                                        University/College
                                    </label>
                                    <Select value={formData.university} onValueChange={(value) => updateFormData('university', value)}>
                                        <SelectTrigger className={errors.university ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select your university" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {universities.map((uni) => (
                                                <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.university && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            {errors.university}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        Major/Field of Study
                                    </label>
                                    <Select value={formData.major} onValueChange={(value) => updateFormData('major', value)}>
                                        <SelectTrigger className={errors.major ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select your major" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {majors.map((major) => (
                                                <SelectItem key={major} value={major}>{major}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.major && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            {errors.major}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Expected Graduation Year
                                    </label>
                                    <Select value={formData.graduationYear} onValueChange={(value) => updateFormData('graduationYear', value)}>
                                        <SelectTrigger className={errors.graduationYear ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select graduation year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {graduationYears.map((year) => (
                                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.graduationYear && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            {errors.graduationYear}
                                        </p>
                                    )}
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <Button variant="outline" onClick={handleBack} className="flex-1">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                    <Button onClick={handleNext} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                        Continue
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <Alert>
                                    <Shield className="h-4 w-4" />
                                    <AlertDescription>
                                        Please review your information before creating your account.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-sm font-medium">Personal Information</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {formData.fullName} • {formData.email}
                                        </div>
                                    </div>

                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-sm font-medium">Academic Information</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {formData.university} • {formData.major} • Class of {formData.graduationYear}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={formData.agreeTerms}
                                            onCheckedChange={(checked) => updateFormData('agreeTerms', checked)}
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                                            I agree to the{" "}
                                            <Link href="/terms" className="text-blue-600 hover:underline">
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="/privacy" className="text-blue-600 hover:underline">
                                                Privacy Policy
                                            </Link>
                                        </label>
                                    </div>
                                    {errors.terms && (
                                        <p className="text-sm text-red-500 flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            {errors.terms}
                                        </p>
                                    )}
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <Button variant="outline" onClick={handleBack} className="flex-1">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        {isLoading ? 'Creating Account...' : 'Create Account'}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Account Created Successfully!</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        We've sent a verification email to {formData.email}. Please check your inbox and click the verification link to complete your registration.
                                    </p>
                                </div>

                                <Alert>
                                    <Mail className="h-4 w-4" />
                                    <AlertDescription>
                                        Don't see the email? Check your spam folder or{" "}
                                        <Button variant="link" className="p-0 h-auto text-blue-600" onClick={sendVerificationEmail}>
                                            resend verification email
                                        </Button>
                                    </AlertDescription>
                                </Alert>

                                <Link href="/dashboard">
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                        Continue to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {step < 4 && (
                            <>
                                <Separator />
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Already have an account?{" "}
                                        <Link href="/signin" className="text-blue-600 hover:underline font-medium">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Trust Indicators */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Verified Students Only
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Safe & Moderated
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            Privacy First
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
