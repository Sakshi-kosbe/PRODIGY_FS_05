import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const useFollow = (targetProfileId: string | null) => {
  const { profile } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkFollowStatus = useCallback(async () => {
    if (!profile?.id || !targetProfileId) return;

    const { data, error } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", profile.id)
      .eq("following_id", targetProfileId)
      .maybeSingle();

    if (!error) {
      setIsFollowing(!!data);
    }
  }, [profile?.id, targetProfileId]);

  useEffect(() => {
    checkFollowStatus();
  }, [checkFollowStatus]);

  const toggleFollow = async () => {
    if (!profile?.id || !targetProfileId) {
      toast.error("Please log in to follow users");
      return;
    }

    if (profile.id === targetProfileId) {
      toast.error("You cannot follow yourself");
      return;
    }

    setLoading(true);

    try {
      if (isFollowing) {
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", profile.id)
          .eq("following_id", targetProfileId);

        if (error) throw error;
        setIsFollowing(false);
        toast.success("Unfollowed successfully");
      } else {
        const { error } = await supabase
          .from("follows")
          .insert({
            follower_id: profile.id,
            following_id: targetProfileId,
          });

        if (error) throw error;
        setIsFollowing(true);
        toast.success("Following!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update follow status");
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, toggleFollow, loading };
};

export const useFollowCounts = (profileId: string | null) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (!profileId) return;

    const fetchCounts = async () => {
      // Get followers count
      const { count: followers } = await supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("following_id", profileId);

      // Get following count
      const { count: following } = await supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("follower_id", profileId);

      setFollowersCount(followers || 0);
      setFollowingCount(following || 0);
    };

    fetchCounts();
  }, [profileId]);

  return { followersCount, followingCount };
};

export const useFollowingFeed = () => {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id) {
      setPosts([]);
      setLoading(false);
      return;
    }

    const fetchFollowingPosts = async () => {
      setLoading(true);

      // First get the list of users the current user follows
      const { data: followingData, error: followingError } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", profile.id);

      if (followingError) {
        console.error("Error fetching following:", followingError);
        setLoading(false);
        return;
      }

      const followingIds = followingData.map((f) => f.following_id);
      
      // Include current user's posts as well
      followingIds.push(profile.id);

      if (followingIds.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }

      // Get posts from followed users
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(`
          *,
          author:profiles!posts_author_id_fkey(*)
        `)
        .in("author_id", followingIds)
        .order("created_at", { ascending: false })
        .limit(50);

      if (postsError) {
        console.error("Error fetching posts:", postsError);
        setLoading(false);
        return;
      }

      setPosts(postsData || []);
      setLoading(false);
    };

    fetchFollowingPosts();
  }, [profile?.id]);

  return { posts, loading };
};
