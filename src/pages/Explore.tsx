import { useState } from "react";
import { Search, TrendingUp, Hash } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PostCard from "@/components/post/PostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { posts, trendingHashtags } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.hashtags.includes(selectedTag))
    : posts;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Explore
          </h1>
          
          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts, hashtags, or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Trending Hashtags */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Trending Hashtags
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "gradient" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="rounded-full"
            >
              All
            </Button>
            {trendingHashtags.map((item) => (
              <Button
                key={item.tag}
                variant={selectedTag === item.tag ? "gradient" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(item.tag)}
                className="rounded-full gap-2"
              >
                <Hash className="w-3 h-3" />
                {item.tag}
                <span className="text-xs opacity-70">
                  {formatNumber(item.posts)}
                </span>
              </Button>
            ))}
          </div>
        </section>

        {/* Posts Grid */}
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            {selectedTag ? `#${selectedTag}` : "Discover"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="animate-fade-in">
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No posts found for #{selectedTag}
              </p>
              <Button
                variant="ghost"
                className="mt-4 text-primary"
                onClick={() => setSelectedTag(null)}
              >
                View all posts
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Explore;
