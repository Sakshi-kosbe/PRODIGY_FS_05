import { cn } from "@/lib/utils";

interface FeedToggleProps {
  activeTab: "discover" | "following";
  onTabChange: (tab: "discover" | "following") => void;
}

const FeedToggle = ({ activeTab, onTabChange }: FeedToggleProps) => {
  return (
    <div className="flex gap-1 p-1 bg-muted rounded-xl">
      <button
        onClick={() => onTabChange("discover")}
        className={cn(
          "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
          activeTab === "discover"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Discover
      </button>
      <button
        onClick={() => onTabChange("following")}
        className={cn(
          "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
          activeTab === "following"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Following
      </button>
    </div>
  );
};

export default FeedToggle;
