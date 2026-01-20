import { Heart, MessageCircle, UserPlus, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/data/mockData";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: "1",
    type: "like",
    user: users[0],
    content: "liked your post",
    time: "2 minutes ago",
    postImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    type: "comment",
    user: users[1],
    content: "commented: \"This is absolutely stunning! 🎨\"",
    time: "15 minutes ago",
    postImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    type: "follow",
    user: users[2],
    content: "started following you",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "like",
    user: users[3],
    content: "liked your post",
    time: "2 hours ago",
    postImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&h=100&fit=crop",
  },
  {
    id: "5",
    type: "feature",
    user: users[4],
    content: "Your artwork was featured in Trending!",
    time: "5 hours ago",
  },
  {
    id: "6",
    type: "comment",
    user: users[0],
    content: "replied to your comment",
    time: "1 day ago",
    postImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop",
  },
];

const Notifications = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-4 h-4 text-primary" />;
      case "follow":
        return <UserPlus className="w-4 h-4 text-sage" />;
      case "feature":
        return <Star className="w-4 h-4 text-terracotta" />;
      default:
        return null;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "like":
        return "bg-red-50";
      case "comment":
        return "bg-coral-light";
      case "follow":
        return "bg-sage-light";
      case "feature":
        return "bg-orange-50";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">
          Notifications
        </h1>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors animate-fade-in",
                index !== notifications.length - 1 && "border-b border-border"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={notification.user.avatar} alt={notification.user.displayName} />
                  <AvatarFallback className="bg-coral-light text-primary">
                    {notification.user.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
                    getIconBg(notification.type)
                  )}
                >
                  {getIcon(notification.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-foreground">
                  <span className="font-semibold">{notification.user.displayName}</span>{" "}
                  <span className="text-muted-foreground">{notification.content}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>

              {notification.postImage && (
                <img
                  src={notification.postImage}
                  alt="Post"
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
