import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import UserProfileCard from "@/components/profile/UserProfileCard";
import PostCard from "@/components/post/PostCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { profile: currentUserProfile, loading: authLoading, user } = useAuth();
  const [targetProfile, setTargetProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      // If no username in URL, show current user's profile
      if (!username) {
        if (!user) {
          navigate("/login");
          return;
        }
        if (currentUserProfile) {
          setTargetProfile(currentUserProfile);
          await fetchUserPosts(currentUserProfile.id);
        }
        setLoading(false);
        return;
      }

      // Fetch profile by username
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (error || !profileData) {
        setLoading(false);
        return;
      }

      setTargetProfile(profileData);
      await fetchUserPosts(profileData.id);
      setLoading(false);
    };

    const fetchUserPosts = async (profileId: string) => {
      const { data: postsData, error } = await supabase
        .from("posts")
        .select(`
          *,
          author:profiles!posts_author_id_fkey(*)
        `)
        .eq("author_id", profileId)
        .order("created_at", { ascending: false });

      if (!error && postsData) {
        setPosts(postsData);
      }
    };

    if (!authLoading) {
      fetchProfile();
    }
  }, [username, currentUserProfile, authLoading, user, navigate]);

  const formatPostDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return dateStr;
    }
  };

  // Convert DB posts to the format expected by PostCard
  const formattedPosts = posts.map((post) => ({
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

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!targetProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <p className="text-muted-foreground text-lg mb-4">
              User not found
            </p>
            <Link to="/explore">
              <Button variant="gradient">Discover Creators</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Profile Card */}
        <UserProfileCard 
          profile={targetProfile} 
          postsCount={posts.length}
        />

        {/* User's Posts */}
        <div className="mt-8 space-y-6">
          {formattedPosts.length > 0 ? (
            formattedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <p className="text-muted-foreground text-lg mb-4">
                {currentUserProfile?.id === targetProfile.id 
                  ? "You haven't posted anything yet"
                  : "This user hasn't posted anything yet"}
              </p>
              {currentUserProfile?.id === targetProfile.id && (
                <Link to="/create">
                  <Button variant="gradient">Create your first post</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
