import { Button } from "@/components/ui/button";
import { useFollow } from "@/hooks/useFollow";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface FollowButtonProps {
  targetProfileId: string;
  variant?: "default" | "gradient" | "outline" | "soft";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  className?: string;
}

const FollowButton = ({ 
  targetProfileId, 
  variant = "gradient",
  size = "sm",
  className = ""
}: FollowButtonProps) => {
  const { profile } = useAuth();
  const { isFollowing, toggleFollow, loading } = useFollow(targetProfileId);

  // Don't show button for own profile
  if (profile?.id === targetProfileId) {
    return null;
  }

  return (
    <Button
      variant={isFollowing ? "outline" : variant}
      size={size}
      onClick={toggleFollow}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isFollowing ? (
        "Following"
      ) : (
        "Follow"
      )}
    </Button>
  );
};

export default FollowButton;
