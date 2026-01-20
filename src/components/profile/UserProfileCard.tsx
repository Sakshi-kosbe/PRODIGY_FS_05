import { useState, useEffect } from "react";
import { Settings, Grid, Bookmark, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useFollow, useFollowCounts } from "@/hooks/useFollow";
import { Loader2 } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar: string;
}

interface UserProfileCardProps {
  profile: Profile;
  postsCount: number;
}

const UserProfileCard = ({ profile: targetProfile, postsCount }: UserProfileCardProps) => {
  const { profile: currentUserProfile } = useAuth();
  const { isFollowing, toggleFollow, loading: followLoading } = useFollow(targetProfile.id);
  const { followersCount, followingCount } = useFollowCounts(targetProfile.id);
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "liked">("posts");

  const isOwnProfile = currentUserProfile?.id === targetProfile.id;

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 1000).toFixed(1) + "K";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const tabs = [
    { id: "posts" as const, icon: Grid, label: "Posts" },
    { id: "saved" as const, icon: Bookmark, label: "Saved" },
    { id: "liked" as const, icon: Heart, label: "Liked" },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 sm:h-48 bg-gradient-to-br from-primary/30 via-accent/20 to-sage/30" />

      {/* Profile Info */}
      <div className="px-4 sm:px-6 pb-6">
        <div className="relative flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-16">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 ring-4 ring-card shadow-lg">
            <AvatarImage src={targetProfile.avatar} alt={targetProfile.display_name} />
            <AvatarFallback className="bg-coral-light text-primary text-2xl font-display">
              {targetProfile.display_name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 sm:pt-0 sm:pb-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                {targetProfile.display_name}
              </h1>
              <p className="text-muted-foreground">@{targetProfile.username}</p>
            </div>

            <div className="flex gap-2">
              {isOwnProfile ? (
                <>
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={isFollowing ? "outline" : "gradient"}
                    size="sm"
                    onClick={toggleFollow}
                    disabled={followLoading}
                  >
                    {followLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isFollowing ? (
                      "Following"
                    ) : (
                      "Follow"
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-foreground max-w-lg">{targetProfile.bio || "No bio yet"}</p>

        {/* Stats */}
        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{formatNumber(postsCount)}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{formatNumber(followersCount)}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{formatNumber(followingCount)}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border mt-6 -mx-4 sm:-mx-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-4 border-t-2 -mt-[1px] transition-colors",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
