import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, X, Hash, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/data/mockData";
import { toast } from "sonner";

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }

    // Mock post creation
    toast.success("Post created successfully!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h1 className="font-display text-2xl font-bold text-foreground mb-6">
            Create Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
                <AvatarFallback className="bg-coral-light text-primary">
                  {currentUser.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{currentUser.displayName}</p>
                <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
              </div>
            </div>

            {/* Content */}
            <Textarea
              placeholder="What's on your creative mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none border-0 bg-muted rounded-xl focus-visible:ring-2 focus-visible:ring-primary text-lg"
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-96 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 w-8 h-8 bg-foreground/80 text-background rounded-full flex items-center justify-center hover:bg-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Hashtags */}
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Add hashtags (comma separated)"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="pl-12 h-12 rounded-xl bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground">
                    <Image className="w-5 h-5" />
                    <span className="text-sm font-medium">Add Image</span>
                  </div>
                </label>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={!content.trim()}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Post
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
