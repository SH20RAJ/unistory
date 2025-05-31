"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  Film,
  Mic,
  Send,
  Loader2
} from "lucide-react";
import { MediaUpload } from "../media";

/**
 * CreatePostForm Component
 * A form for creating a new post with media upload capabilities
 */
export function CreatePostForm({
  onSubmit,
  currentUser,
  placeholder = "What's on your mind?",
  inCircle = null
}) {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the currentUser from props or from a global state/context
  const user = currentUser || {
    name: "You",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You"
  };

  const handleMediaUpload = (uploadedMedia) => {
    setMedia(uploadedMedia.map(item => ({
      id: item.id,
      type: item.file.type.split('/')[0],
      src: URL.createObjectURL(item.file),
      title: item.file.name
    })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim() && media.length === 0) return;

    setIsSubmitting(true);

    // In a real app, you would upload the media files to your storage
    const postData = {
      content: content.trim(),
      media,
    };

    if (inCircle) {
      postData.circleName = inCircle;
      postData.isInCircle = true;
    }

    onSubmit(postData);

    // Reset the form
    setContent('');
    setMedia([]);
    setIsExpanded(false);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div
            className={`rounded-full border bg-background px-4 py-2 text-sm ${isExpanded ? 'rounded-b-none' : ''
              }`}
            onClick={() => setIsExpanded(true)}
          >
            {!isExpanded ? (
              <div className="text-muted-foreground">{placeholder}</div>
            ) : (
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none mt-2 p-0 min-h-20"
                autoFocus
              />
            )}
          </div>

          {isExpanded && (
            <div className="border border-t-0 rounded-b-lg p-3 space-y-3">
              {media.length > 0 && (
                <div className="mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    {media.map((item) => (
                      <div key={item.id} className="relative rounded-md overflow-hidden aspect-video bg-muted">
                        {item.type === 'image' && (
                          <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                        )}
                        {item.type === 'video' && (
                          <video src={item.src} className="w-full h-full object-cover" controls />
                        )}
                        {item.type === 'audio' && (
                          <div className="flex items-center justify-center w-full h-full bg-muted p-4">
                            <audio src={item.src} className="w-full" controls />
                          </div>
                        )}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-80"
                          onClick={() => setMedia(media.filter(m => m.id !== item.id))}
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-1">
                  <MediaUpload
                    onUpload={handleMediaUpload}
                    maxFiles={4}
                    allowedTypes={["image", "video", "audio"]}
                  >
                    <Button type="button" variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                      <ImageIcon className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only">Photo</span>
                    </Button>
                  </MediaUpload>

                  <MediaUpload
                    onUpload={handleMediaUpload}
                    maxFiles={1}
                    allowedTypes={["video"]}
                  >
                    <Button type="button" variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                      <Film className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only">Video</span>
                    </Button>
                  </MediaUpload>

                  <MediaUpload
                    onUpload={handleMediaUpload}
                    maxFiles={1}
                    allowedTypes={["audio"]}
                  >
                    <Button type="button" variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                      <Mic className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only">Audio</span>
                    </Button>
                  </MediaUpload>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={(!content.trim() && media.length === 0) || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
