"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Building,
  Briefcase,
  MapPin,
  Calendar,
  MessageSquare,
  BookOpen,
  Coffee,
  Users,
  Star,
  Award,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

// Mock alumni data
const mockAlumni = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=1",
    graduationYear: 2018,
    degree: "B.Tech Computer Science",
    company: "Google",
    role: "Senior Software Engineer",
    location: "San Francisco, CA",
    industry: "Technology",
    isVerified: true,
    isAvailableForMentoring: true,
    linkedIn: "https://linkedin.com/in/sarahjohnson",
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "https://i.pravatar.cc/150?img=2",
    graduationYear: 2017,
    degree: "B.Tech Electrical Engineering",
    company: "Tesla",
    role: "Product Manager",
    location: "Austin, TX",
    industry: "Automotive",
    isVerified: true,
    isAvailableForMentoring: false,
    linkedIn: "https://linkedin.com/in/michaelchen",
  },
  {
    id: 3,
    name: "Jessica Patel",
    image: "https://i.pravatar.cc/150?img=3",
    graduationYear: 2020,
    degree: "MBA",
    company: "McKinsey",
    role: "Management Consultant",
    location: "New York, NY",
    industry: "Consulting",
    isVerified: true,
    isAvailableForMentoring: true,
    linkedIn: "https://linkedin.com/in/jessicapatel",
  },
  {
    id: 4,
    name: "David Kim",
    image: "https://i.pravatar.cc/150?img=4",
    graduationYear: 2019,
    degree: "B.Tech Mechanical Engineering",
    company: "Amazon",
    role: "Operations Manager",
    location: "Seattle, WA",
    industry: "E-commerce",
    isVerified: true,
    isAvailableForMentoring: true,
    linkedIn: "https://linkedin.com/in/davidkim",
  },
  {
    id: 5,
    name: "Aisha Rahman",
    image: "https://i.pravatar.cc/150?img=5",
    graduationYear: 2021,
    degree: "M.Tech Data Science",
    company: "Microsoft",
    role: "Data Scientist",
    location: "Redmond, WA",
    industry: "Technology",
    isVerified: true,
    isAvailableForMentoring: false,
    linkedIn: "https://linkedin.com/in/aisharahman",
  },
  {
    id: 6,
    name: "Raj Patel",
    image: "https://i.pravatar.cc/150?img=6",
    graduationYear: 2016,
    degree: "B.Tech Computer Science",
    company: "Meta",
    role: "Engineering Manager",
    location: "Menlo Park, CA",
    industry: "Technology",
    isVerified: true,
    isAvailableForMentoring: true,
    linkedIn: "https://linkedin.com/in/rajpatel",
  },
];

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Annual Alumni Mixer",
    date: "October 15, 2023",
    time: "6:00 PM - 9:00 PM",
    location: "Campus Center Ballroom",
    description: "Join fellow alumni for networking, refreshments, and updates from the university.",
    attendees: 75,
  },
  {
    id: 2,
    title: "Tech Industry Panel",
    date: "November 5, 2023",
    time: "5:30 PM - 7:30 PM",
    location: "Virtual (Zoom)",
    description: "Alumni working at top tech companies share insights and career advice.",
    attendees: 120,
  },
  {
    id: 3,
    title: "Homecoming Weekend",
    date: "November 18-19, 2023",
    time: "All Day",
    location: "University Campus",
    description: "A weekend of events celebrating school spirit and alumni achievements.",
    attendees: 500,
  },
];

// Mock job listings
const mockJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    posted: "2 days ago",
    salary: "$120,000 - $150,000",
    description: "Join our team to work on cutting-edge technologies and products used by billions of people.",
    alumni: "Posted by Sarah Johnson (Class of 2018)",
    isHot: true,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    posted: "1 week ago",
    salary: "$110,000 - $140,000",
    description: "Lead a team in developing innovative products that enhance customer experience.",
    alumni: "Posted by David Kim (Class of 2019)",
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "Microsoft",
    location: "Remote",
    type: "Internship",
    posted: "3 days ago",
    salary: "$30/hour",
    description: "Summer internship opportunity to work with our data science team on real-world projects.",
    alumni: "Posted by Aisha Rahman (Class of 2021)",
    isHot: true,
  },
  {
    id: 4,
    title: "Marketing Coordinator",
    company: "Netflix",
    location: "Los Angeles, CA",
    type: "Full-time",
    posted: "5 days ago",
    salary: "$85,000 - $105,000",
    description: "Develop and execute marketing strategies for new show releases and special campaigns.",
    alumni: "Posted by Jessica Patel (Class of 2020)",
  },
];

// Alumni Card Component
const AlumniCard = ({ alumni }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{alumni.name}</CardTitle>
            {alumni.isVerified && (
              <Badge variant="secondary" className="text-xs px-1 py-0">
                ✓ Verified
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs">
            Class of {alumni.graduationYear} • {alumni.degree}
          </CardDescription>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Briefcase className="w-3 h-3 mr-1" />
            {alumni.role} at {alumni.company}
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="w-3 h-3 mr-1" />
            {alumni.location}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div>
          {alumni.isAvailableForMentoring && (
            <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700">
              Available for Mentoring
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 h-auto">
            <Mail className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 h-auto">
            <Linkedin className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Event Card Component
const EventCard = ({ event }) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
          <Calendar className="w-4 h-4 mr-1" />
          {event.date} • {event.time}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          {event.location}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <Users className="w-4 h-4 inline mr-1" />
          {event.attendees} attending
        </div>
        <Button size="sm" variant="outline">
          RSVP
        </Button>
      </CardFooter>
    </Card>
  );
};

// Job Card Component
const JobCard = ({ job }) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {job.title}
              {job.isHot && (
                <Badge className="text-xs bg-red-500 hover:bg-red-600">Hot</Badge>
              )}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              {job.company} • {job.location}
            </CardDescription>
          </div>
          <Badge variant="outline">{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-2">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {job.salary}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {job.alumni} • Posted {job.posted}
        </div>
        <Button size="sm">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function AlumniNetwork() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");

  const filteredAlumni = mockAlumni.filter((alumni) =>
    alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumni.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Alumni Network
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Connect with graduates, find mentors, and discover opportunities
        </p>
      </div>

      <Tabs defaultValue="alumni" className="w-full">
        <TabsList className="w-full justify-start mb-8">
          <TabsTrigger value="alumni" className="flex items-center gap-1">
            <Users className="w-4 h-4" /> Alumni Directory
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="flex items-center gap-1">
            <Star className="w-4 h-4" /> Mentorship
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Events
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" /> Job Board
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alumni" className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                className="pl-10"
                placeholder="Search alumni by name, company, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Building className="w-4 h-4" /> Industries
              </Button>
            </div>
          </div>

          {/* Alumni Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">Load More Alumni</Button>
          </div>
        </TabsContent>

        <TabsContent value="mentorship">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Mentors</CardTitle>
                  <CardDescription>Connect with alumni who are offering mentorship</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAlumni
                    .filter(alumni => alumni.isAvailableForMentoring)
                    .map(alumni => (
                      <div key={alumni.id} className="flex items-start gap-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{alumni.name}</h3>
                            <Badge variant="secondary" className="text-xs">Class of {alumni.graduationYear}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {alumni.role} at {alumni.company}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              <MessageSquare className="w-3 h-3 mr-1" /> Message
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              <Coffee className="w-3 h-3 mr-1" /> Request Meeting
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Mentors</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Become a Mentor</CardTitle>
                  <CardDescription>Give back to your university community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Share your experience and help current students navigate their academic and career journeys.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Professional Growth</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Develop your leadership and coaching skills</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Expand Your Network</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Connect with talented students and other alumni</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Make an Impact</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Help shape the next generation of professionals</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply to Be a Mentor</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Alumni Events</h2>
            <Button variant="outline" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Calendar View
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Organize an Alumni Event
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Planning a reunion or professional networking event? Let us help you connect with fellow alumni.
                  </p>
                  <Button>Create Event</Button>
                </div>
                <div className="flex-shrink-0 w-32 h-32 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-blue-500 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alumni Job Board</h2>
            <Button className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" /> Post a Job
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">View All Job Listings</Button>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Update Your Alumni Profile</h3>
              <p className="mb-0">
                Keep your information current to stay connected and make the most of alumni benefits.
              </p>
            </div>
            <Button variant="secondary" className="whitespace-nowrap">
              Edit Profile <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
