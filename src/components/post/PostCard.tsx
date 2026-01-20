import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Post } from "@/data/mockData";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <article className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${post.author.username}`} className="flex items-center gap-3 group">
          <Avatar className="w-10 h-10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
            <AvatarImage src={post.author.avatar} alt={post.author.displayName} />
            <AvatarFallback className="bg-coral-light text-primary font-medium">
              {post.author.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
              {post.author.displayName}
            </p>
            <p className="text-sm text-muted-foreground">@{post.author.username}</p>
          </div>
        </Link>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Image */}
      {post.image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={cn(
                "transition-all duration-200",
                isLiked && "text-red-500 hover:text-red-600"
              )}
            >
              <Heart
                className={cn(
                  "w-6 h-6 transition-all",
                  isLiked && "fill-current scale-110"
                )}
              />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Share2 className="w-6 h-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className={cn(
              "transition-all duration-200",
              isSaved && "text-primary"
            )}
          >
            <Bookmark className={cn("w-6 h-6", isSaved && "fill-current")} />
          </Button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-foreground mb-2">
          {formatNumber(likesCount)} likes
        </p>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-foreground">
            <Link to={`/profile/${post.author.username}`} className="font-medium hover:text-primary transition-colors">
              {post.author.username}
            </Link>{" "}
            {post.content}
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1">
            {post.hashtags.map((tag) => (
              <Link
                key={tag}
                to={`/explore?tag=${tag}`}
                className="text-primary hover:text-primary/80 text-sm transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Comments link */}
          <button className="text-muted-foreground text-sm hover:text-foreground transition-colors">
            View all {post.comments} comments
          </button>

          {/* Timestamp */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {post.createdAt}
          </p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
