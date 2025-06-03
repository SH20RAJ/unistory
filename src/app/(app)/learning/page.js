"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Search,
  Filter,
  Book,
  GraduationCap,
  Heart,
  Star,
  Clock,
  Play,
  CheckCircle,
  ChevronRight,
  Award,
  Lock,
  ThumbsUp,
  User,
  Upload,
  BookOpen,
  MessageSquare,
  Video,
  Zap,
  BarChart,
  Brain,
  Coffee,
  Smile,
  ShieldCheck,
  Crown
} from "lucide-react";

// Mock course data
const freeCourses = [
  {
    id: 1,
    title: "Effective Communication Skills",
    instructor: "Prof. Jennifer Lee",
    category: "Soft Skills",
    level: "Beginner",
    duration: "3 hours",
    enrollments: 1245,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop",
    description: "Learn essential communication skills to express yourself clearly and confidently in academic and social settings.",
    lessons: 12,
    provider: "Unistory"
  },
  {
    id: 2,
    title: "Time Management for Students",
    instructor: "Dr. Michael Brown",
    category: "Productivity",
    level: "All Levels",
    duration: "2.5 hours",
    enrollments: 987,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&auto=format&fit=crop",
    description: "Master proven techniques to manage your time effectively, reduce stress, and improve your academic performance.",
    lessons: 8,
    provider: "Unistory"
  },
  {
    id: 3,
    title: "Study Techniques That Work",
    instructor: "Sarah Johnson",
    category: "Academic Success",
    level: "All Levels",
    duration: "4 hours",
    enrollments: 1567,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop",
    description: "Discover evidence-based study methods that help you learn more effectively and retain information longer.",
    lessons: 15,
    provider: "Unistory"
  },
  {
    id: 4,
    title: "Introduction to Research Methods",
    instructor: "Dr. Emily Chen",
    category: "Academic Success",
    level: "Intermediate",
    duration: "5 hours",
    enrollments: 763,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=800&auto=format&fit=crop",
    description: "Learn the fundamentals of academic research, from forming hypotheses to analyzing results.",
    lessons: 18,
    provider: "Unistory"
  },
];

const premiumCourses = [
  {
    id: 5,
    title: "Dating Decoded",
    instructor: "Dr. Alex Morgan",
    category: "Relationships",
    level: "All Levels",
    duration: "8 hours",
    enrollments: 2543,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1511306404404-ad607bd7c601?w=800&auto=format&fit=crop",
    description: "Navigate college dating with confidence. Learn about healthy relationships, communication, and connection.",
    lessons: 24,
    premium: true,
    price: "$49.99",
    provider: "Unistory Premium"
  },
  {
    id: 6,
    title: "Personal Finance for College Students",
    instructor: "Prof. Robert Johnson",
    category: "Finance",
    level: "Beginner",
    duration: "6 hours",
    enrollments: 1876,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    description: "Learn essential financial literacy skills to manage money, build credit, and plan for your future.",
    lessons: 18,
    premium: true,
    price: "$39.99",
    provider: "Unistory Premium"
  },
  {
    id: 7,
    title: "Public Speaking Mastery",
    instructor: "Amanda Richards",
    category: "Communication",
    level: "Intermediate",
    duration: "7 hours",
    enrollments: 1563,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop",
    description: "Overcome fear of public speaking and learn to deliver compelling presentations for classes and beyond.",
    lessons: 22,
    premium: true,
    price: "$44.99",
    provider: "Unistory Premium"
  },
  {
    id: 8,
    title: "Networking for Career Success",
    instructor: "James Wilson",
    category: "Career Development",
    level: "All Levels",
    duration: "5.5 hours",
    enrollments: 1245,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&auto=format&fit=crop",
    description: "Build meaningful professional connections and leverage networking to advance your career goals.",
    lessons: 16,
    premium: true,
    price: "$34.99",
    provider: "Unistory Premium"
  },
];

const academicCourses = [
  {
    id: 9,
    title: "C++ Full Course",
    instructor: "Prof. David Wilson",
    category: "Programming",
    level: "Beginner to Advanced",
    duration: "40 hours",
    enrollments: 3542,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop",
    description: "Comprehensive C++ programming course covering fundamentals to advanced techniques used in industry.",
    lessons: 75,
    provider: "IIT Bombay"
  },
  {
    id: 10,
    title: "Data Structures and Algorithms",
    instructor: "Dr. Sanjay Gupta",
    category: "Computer Science",
    level: "Intermediate",
    duration: "35 hours",
    enrollments: 4256,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop",
    description: "Master algorithmic thinking and implement efficient data structures to solve complex computing problems.",
    lessons: 60,
    provider: "IIT Bombay"
  },
  {
    id: 11,
    title: "Calculus I",
    instructor: "Prof. Rebecca Lee",
    category: "Mathematics",
    level: "Intermediate",
    duration: "30 hours",
    enrollments: 2890,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    description: "Build a strong foundation in calculus with clear explanations and practical problem-solving skills.",
    lessons: 48,
    provider: "University Math Department"
  },
  {
    id: 12,
    title: "Introduction to Psychology",
    instructor: "Dr. Maria Santos",
    category: "Psychology",
    level: "Beginner",
    duration: "25 hours",
    enrollments: 5127,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    description: "Explore the human mind and behavior through scientific research and real-world applications.",
    lessons: 40,
    provider: "Psychology Department"
  },
];

const wellnessCourses = [
  {
    id: 13,
    title: "Dealing with Anxiety",
    instructor: "Dr. Sarah Chen",
    category: "Mental Health",
    level: "All Levels",
    duration: "6 hours",
    enrollments: 3256,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1474418397713-003ec9d620b7?w=800&auto=format&fit=crop",
    description: "Learn effective techniques to manage anxiety, reduce stress, and improve your mental well-being as a student.",
    lessons: 18,
    provider: "University Counseling Center"
  },
  {
    id: 14,
    title: "Mindfulness for Students",
    instructor: "Michelle Johnson",
    category: "Wellness",
    level: "Beginner",
    duration: "4.5 hours",
    enrollments: 2874,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop",
    description: "Incorporate mindfulness practices into your daily routine to improve focus, reduce stress, and enhance well-being.",
    lessons: 15,
    provider: "Student Wellness Program"
  },
  {
    id: 15,
    title: "Sleep Science and Healthy Habits",
    instructor: "Dr. James Morgan",
    category: "Health",
    level: "All Levels",
    duration: "3 hours",
    enrollments: 1987,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop",
    description: "Discover the science of sleep and develop healthy sleep habits to improve academic performance and overall health.",
    lessons: 12,
    provider: "Health Services"
  },
  {
    id: 16,
    title: "Nutrition for Brain Performance",
    instructor: "Dr. Rachel Kim",
    category: "Nutrition",
    level: "All Levels",
    duration: "5 hours",
    enrollments: 2154,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
    description: "Learn how diet affects cognitive function and optimize your nutrition for better academic performance.",
    lessons: 16,
    provider: "Nutrition Department"
  },
];

// Course Card Component
const CourseCard = ({ course }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between">
          <Badge variant={course.premium ? "default" : "secondary"} className="mb-2">
            {course.premium ? "Premium" : course.provider}
          </Badge>
          {course.premium && (
            <div className="text-sm font-medium text-gray-900 dark:text-white">{course.price}</div>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
        <CardDescription className="flex items-center text-xs mt-1">
          <User className="w-3 h-3 mr-1" /> {course.instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-1 pb-2">
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            <span>{course.rating}</span>
            <span className="mx-1">•</span>
            <span>{course.enrollments.toLocaleString()} students</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <Book className="w-3 h-3 inline mr-1" />
          {course.lessons} lessons
        </div>
        <Button size="sm">
          {course.premium ? (
            <>
              <Lock className="w-3 h-3 mr-1" /> Enroll
            </>
          ) : (
            <>
              <Play className="w-3 h-3 mr-1" /> Start Learning
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Featured Course Component
const FeaturedCourse = ({ course }) => {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-full">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-blue-500 hover:bg-blue-600">Featured Course</Badge>
              {course.premium && (
                <Badge variant="outline" className="border-yellow-400 text-yellow-600 dark:text-yellow-400">
                  <Crown className="w-3 h-3 mr-1" /> Premium
                </Badge>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm font-medium">Instructor</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{course.instructor}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Duration</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Level</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{course.level}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Category</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{course.category}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">({course.enrollments.toLocaleString()} students)</span>
              </div>
              {course.premium && <div className="text-lg font-bold">{course.price}</div>}
            </div>
            <Button className="w-full">
              {course.premium ? (
                <>Enroll Now</>
              ) : (
                <>Start Learning Now</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// CourseUploadPreview Component
const CourseUploadPreview = () => {
  return (
    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Share Your Knowledge
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Have expertise to share? Create and upload your own course to help fellow students succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button>
                <Upload className="w-4 h-4 mr-2" /> Upload Course
              </Button>
              <Button variant="outline">Learn About Verification</Button>
            </div>
          </div>
          <div className="flex-shrink-0 w-32 h-32 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-blue-500 dark:text-blue-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// My Learning Component
const MyLearning = () => {
  const inProgressCourses = [
    {
      title: "Effective Communication Skills",
      progress: 45,
      lastAccessed: "2 days ago",
      nextLesson: "Nonverbal Communication",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop",
    },
    {
      title: "Data Structures and Algorithms",
      progress: 28,
      lastAccessed: "Yesterday",
      nextLesson: "Hash Tables and Dictionaries",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Learning</CardTitle>
        <CardDescription>Continue where you left off</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {inProgressCourses.map((course, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">{course.title}</h4>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-1">
                <Clock className="w-3 h-3 mr-1" />
                Last accessed {course.lastAccessed}
              </div>
              <Progress value={course.progress} className="h-1.5 mb-1" />
              <div className="flex justify-between text-xs">
                <span>{course.progress}% complete</span>
                <span className="text-blue-600 dark:text-blue-400">Next: {course.nextLesson}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All My Courses</Button>
      </CardFooter>
    </Card>
  );
};

export default function LearningHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredCourses = {
    free: freeCourses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    premium: premiumCourses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    academic: academicCourses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    wellness: wellnessCourses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Learning Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Enhance your skills and knowledge with our curated courses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <FeaturedCourse course={premiumCourses[0]} />
        </div>
        <div className="space-y-8">
          <MyLearning />
          <Card>
            <CardHeader>
              <CardTitle>Learning Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded mr-3">
                    <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <span className="text-sm">Hours Learned</span>
                </div>
                <span className="font-medium">24.5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded mr-3">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                  </div>
                  <span className="text-sm">Courses Completed</span>
                </div>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded mr-3">
                    <Award className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  </div>
                  <span className="text-sm">Certificates Earned</span>
                </div>
                <span className="font-medium">2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search courses by title, description, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Award className="w-4 h-4" /> Categories
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setCategory}>
        <TabsList className="w-full justify-start mb-8">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="free" className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> Free Courses
          </TabsTrigger>
          <TabsTrigger value="premium" className="flex items-center gap-1">
            <Crown className="w-4 h-4" /> Premium Courses
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" /> Academic
          </TabsTrigger>
          <TabsTrigger value="wellness" className="flex items-center gap-1">
            <Heart className="w-4 h-4" /> Mental Wellness
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Free Courses by Unistory</h2>
              <Button variant="ghost" className="text-blue-600 dark:text-blue-400">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.free.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Premium Courses</h2>
              <Button variant="ghost" className="text-blue-600 dark:text-blue-400">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.premium.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Academic Courses</h2>
              <Button variant="ghost" className="text-blue-600 dark:text-blue-400">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.academic.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mental Health & Wellness</h2>
              <Button variant="ghost" className="text-blue-600 dark:text-blue-400">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.wellness.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="free" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.free.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.premium.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.academic.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.wellness.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-10" />

      <CourseUploadPreview />

      <div className="mt-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Instructor Verification Process
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Learn how our course verification ensures high-quality content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
                <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Submit Course</CardTitle>
                <CardDescription>Upload your content and materials</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create engaging content with videos, quizzes, and assignments based on our guidelines and submit for review.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-full">
                <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle>Verification Process</CardTitle>
                <CardDescription>Expert review and feedback</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our academic team reviews your content for accuracy, quality, and educational value, providing constructive feedback.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full">
                <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>Publish & Earn</CardTitle>
                <CardDescription>Share knowledge and get rewarded</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Once approved, your course is published on the platform where you can earn recognition, teaching credits, and even revenue.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button>
            Apply as an Instructor
          </Button>
        </div>
      </div>
    </div>
  );
}
