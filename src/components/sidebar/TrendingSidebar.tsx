import { Link } from "react-router-dom";
import { TrendingUp, Hash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { trendingHashtags, suggestedUsers } from "@/data/mockData";
import FollowButton from "@/components/FollowButton";
import { useAuth } from "@/hooks/useAuth";

const TrendingSidebar = () => {
  const { user } = useAuth();

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <aside className="hidden lg:block w-80 space-y-6">
      {/* Trending Hashtags */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Trending</h3>
        </div>
        <div className="space-y-3">
          {trendingHashtags.slice(0, 6).map((item, index) => (
            <Link
              key={item.tag}
              to={`/explore?tag=${item.tag}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-coral-light flex items-center justify-center group-hover:bg-primary transition-colors">
                <Hash className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">#{item.tag}</p>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(item.posts)} posts
                </p>
              </div>
              <span className="text-sm text-muted-foreground">#{index + 1}</span>
            </Link>
          ))}
        </div>
        <Link to="/explore">
          <Button variant="ghost" className="w-full mt-3 text-primary hover:text-primary/80">
            See all trends
          </Button>
        </Link>
      </div>

      {/* Suggested Users */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">
          Suggested Creators
        </h3>
        <div className="space-y-4">
          {suggestedUsers.map((mockUser) => (
            <div key={mockUser.id} className="flex items-center gap-3">
              <Link to={`/profile/${mockUser.username}`}>
                <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-primary/20 transition-all">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.displayName} />
                  <AvatarFallback className="bg-coral-light text-primary">
                    {mockUser.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/profile/${mockUser.username}`}
                  className="font-medium text-foreground hover:text-primary transition-colors truncate block"
                >
                  {mockUser.displayName}
                </Link>
                <p className="text-sm text-muted-foreground truncate">
                  @{mockUser.username}
                </p>
              </div>
              {user ? (
                <Button variant="soft" size="sm">
                  Follow
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="soft" size="sm">
                    Follow
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
        <Link to="/explore">
          <Button variant="ghost" className="w-full mt-3 text-primary hover:text-primary/80">
            See more
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <p>© 2024 Artify. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Help</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
    </aside>
  );
};

export default TrendingSidebar;
