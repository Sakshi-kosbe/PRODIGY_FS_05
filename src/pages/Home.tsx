import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import PostCard from "@/components/post/PostCard";
import TrendingSidebar from "@/components/sidebar/TrendingSidebar";
import FeedToggle from "@/components/FeedToggle";
import { useAuth } from "@/hooks/useAuth";
import { useFollowingFeed } from "@/hooks/useFollow";
import { posts as mockPosts } from "@/data/mockData";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

const Home = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"discover" | "following">("discover");
  const { posts: followingPosts, loading: feedLoading } = useFollowingFeed();

  const formatPostDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return dateStr;
    }
  };

  // Convert DB posts to the format expected by PostCard
  const formattedFollowingPosts = followingPosts.map((post) => ({
    id: post.id,
    author: {
      id: post.author?.id || "",
      username: post.author?.username || "unknown",
      displayName: post.author?.display_name || "Unknown User",
      avatar: post.author?.avatar || "",
      bio: post.author?.bio || "",
      followers: 0,
      following: 0,
      postsCount: 0,
    },
    content: post.content,
    image: post.image,
    likes: post.likes_count || 0,
    comments: post.comments_count || 0,
    hashtags: post.hashtags || [],
    createdAt: formatPostDate(post.created_at),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="flex gap-8">
          {/* Main Feed */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Your Feed
              </h1>
            </div>

            {/* Feed Toggle - Only show when logged in */}
            {user && (
              <FeedToggle activeTab={activeTab} onTabChange={setActiveTab} />
            )}
            
            {activeTab === "discover" ? (
              // Discover Feed - Mock posts for all users
              mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : feedLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : formattedFollowingPosts.length > 0 ? (
              // Following Feed - Posts from followed users
              formattedFollowingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <p className="text-muted-foreground mb-4">
                  {user ? "No posts from users you follow yet." : "Log in to see posts from creators you follow."}
                </p>
                {user ? (
                  <Link to="/explore">
                    <Button variant="gradient">Discover Creators</Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button variant="gradient">Log In</Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <TrendingSidebar />
        </div>
      </main>
    </div>
  );
};

export default Home;
