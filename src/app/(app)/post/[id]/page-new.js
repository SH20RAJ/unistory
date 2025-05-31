"use client";
 export const runtime = 'edge';
import { useState, useEffect } from "react";
import { PostDetail } from "@/components/posts/PostDetail";
import { CommentsList } from "@/components/comments";
import { SuggestedPosts } from "@/components/posts/SuggestedPosts";
import { SuggestedCircles } from "@/components/circles/SuggestedCircles";
import { SuggestedUsers } from "@/components/profile/SuggestedUsers";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data for the post
const MOCK_CURRENT_USER = {
  id: "user123",
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  isVerified: true,
  college: "Stanford University"
};

const MOCK_POST = {
  id: "post123",
  author: {
    id: "author456",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isVerified: true,
    college: "Stanford University",
    major: "Computer Science"
  },
  content: "Just finished my final project for CS50! Been working on this adaptive learning platform for the past month. It uses machine learning to personalize education content based on student performance and learning style. Check out the demo!",
  media: [
    {
      id: "media1",
      type: "image",
      src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
      title: "Project Demo Screenshot"
    },
    {
      id: "media2",
      type: "image",
      src: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=2073&auto=format&fit=crop",
      title: "Coding Session"
    }
  ],
  createdAt: "2023-10-05T14:48:00.000Z",
  likes: 42,
  comments: 7,
  isBookmarked: false
};

// Mock data for comments
const MOCK_COMMENTS = [
  {
    id: "comment1",
    user: {
      id: "user1",
      name: "Emily Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    },
    content: "This looks amazing! What technologies did you use for the ML part?",
    timestamp: "2023-10-05T15:30:00.000Z",
    likeCount: 5,
    isLiked: false,
    replies: [
      {
        id: "reply1",
        user: {
          id: "author456",
          name: "Alex Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
        },
        content: "Thanks! I used TensorFlow for the model training and Flask for the API backend. The recommendation engine uses collaborative filtering combined with content-based filtering.",
        timestamp: "2023-10-05T16:05:00.000Z",
        likeCount: 3,
        isLiked: false
      }
    ]
  },
  {
    id: "comment2",
    user: {
      id: "user2",
      name: "Marcus Wong",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    },
    content: "Would love to collaborate on something like this. I'm working on an educational platform for my capstone project too!",
    timestamp: "2023-10-05T18:22:00.000Z",
    likeCount: 2,
    isLiked: false,
    replies: []
  }
];

// Add these additional mock data for suggestions
const MOCK_SUGGESTED_POSTS = [
  {
    id: "suggestedPost1",
    author: {
      id: "user789",
      name: "Maya Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      isVerified: true
    },
    content: "Just launched my portfolio project using React and ThreeJS. Check it out!",
    media: [
      {
        id: "media-sugg-1",
        type: "image",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        title: "Web Portfolio"
      }
    ],
    createdAt: "2023-10-09T14:30:00Z",
    likes: 42,
    comments: 8
  },
  {
    id: "suggestedPost2",
    author: {
      id: "user567",
      name: "Jason Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jason",
      isVerified: true
    },
    content: "Study tips for finals week: create a schedule, use spaced repetition, and most importantly - get enough sleep!",
    createdAt: "2023-10-08T18:45:00Z",
    likes: 53,
    comments: 12
  }
];

const MOCK_SUGGESTED_CIRCLES = [
  {
    id: "circle1",
    name: "Computer Science Hub",
    description: "For CS students to discuss coursework, projects, and career opportunities.",
    memberCount: 1250,
    isPrivate: false,
    isMember: true,
    category: "Academic"
  },
  {
    id: "circle2",
    name: "Campus Photography Club",
    description: "Share your campus shots and photography techniques. Weekly challenges and contests.",
    memberCount: 743,
    isPrivate: false,
    isMember: false,
    category: "Hobby"
  },
  {
    id: "circle3",
    name: "Stanford Entrepreneurs",
    description: "For student entrepreneurs to connect, share ideas, and find co-founders.",
    memberCount: 892,
    isPrivate: true,
    isMember: false,
    category: "Career"
  }
];

const MOCK_SUGGESTED_USERS = [
  {
    id: "user456",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isVerified: true,
    college: "Stanford University",
    major: "Computer Science"
  },
  {
    id: "user789",
    name: "Maya Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    isVerified: true,
    college: "Stanford University",
    major: "Design"
  },
  {
    id: "user567",
    name: "Jason Park",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jason",
    isVerified: true,
    college: "Stanford University",
    major: "Economics"
  },
  {
    id: "user890",
    name: "Elena Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    isVerified: true,
    college: "Stanford University",
    major: "Biology"
  }
];

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState(MOCK_POST);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [suggestedPosts, setSuggestedPosts] = useState(MOCK_SUGGESTED_POSTS);
  const [suggestedCircles, setSuggestedCircles] = useState(MOCK_SUGGESTED_CIRCLES);
  const [suggestedUsers, setSuggestedUsers] = useState(MOCK_SUGGESTED_USERS);

  // In a real app, you'd fetch data based on the post ID
  useEffect(() => {
    // Simulating API call
    console.log(`Fetching post with ID: ${params.id}`);
    // setPost(fetchedPost)
    // setComments(fetchedComments)
  }, [params.id]);

  const handleAddComment = (text) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      user: MOCK_CURRENT_USER,
      content: text,
      timestamp: new Date().toISOString(),
      likeCount: 0,
      isLiked: false,
      replies: []
    };

    setComments([newComment, ...comments]);
  };

  const handleAddReply = (commentId, replyText) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newReply = {
          id: `reply-${Date.now()}`,
          user: MOCK_CURRENT_USER,
          content: replyText,
          timestamp: new Date().toISOString(),
          likeCount: 0,
          isLiked: false
        };

        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }

      return comment;
    }));
  };

  return (
    <div className="container max-w-7xl py-6 space-y-6">
      <Button variant="ghost" asChild className="mb-4 -ml-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <PostDetail
            post={post}
            currentUser={MOCK_CURRENT_USER}
            comments={comments}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
          />
        </div>

        <div className="space-y-6">
          <SuggestedPosts posts={suggestedPosts} />
          <SuggestedCircles circles={suggestedCircles} />
          <SuggestedUsers users={suggestedUsers} />
        </div>
      </div>
    </div>
  );
}
