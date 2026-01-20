export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  hashtags: string[];
  createdAt: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: "1",
    username: "luna_creates",
    displayName: "Luna Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    bio: "Digital artist & dreamer ✨ Creating worlds one pixel at a time",
    followers: 12400,
    following: 342,
    postsCount: 156,
  },
  {
    id: "2",
    username: "art.by.marcus",
    displayName: "Marcus Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Oil painter | Nature enthusiast 🎨 Capturing light and shadow",
    followers: 8900,
    following: 512,
    postsCount: 89,
  },
  {
    id: "3",
    username: "sketch_daily",
    displayName: "Emma Watson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Illustrator | Sketch artist 📝 One drawing a day keeps the art block away",
    followers: 5600,
    following: 890,
    postsCount: 365,
  },
  {
    id: "4",
    username: "color_burst",
    displayName: "Kai Tanaka",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Abstract expressionist 🌈 Finding beauty in chaos",
    followers: 15200,
    following: 234,
    postsCount: 203,
  },
  {
    id: "5",
    username: "photo_soul",
    displayName: "Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    bio: "Photography is my language 📷 NYC based",
    followers: 22000,
    following: 567,
    postsCount: 412,
  },
];

export const posts: Post[] = [
  {
    id: "1",
    author: users[0],
    content: "Just finished this digital painting of a mystical forest at dawn. The light filtering through the trees was so magical to capture! 🌲✨",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
    likes: 1243,
    comments: 89,
    hashtags: ["digitalart", "fantasy", "natureart", "mystical"],
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    author: users[1],
    content: "Golden hour at the studio. Working on a new series inspired by Mediterranean landscapes. Oil on canvas, 24x36.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
    likes: 876,
    comments: 45,
    hashtags: ["oilpainting", "landscape", "studiolife", "mediterranean"],
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    author: users[2],
    content: "Day 247 of my daily sketch challenge! Today's prompt: 'Serenity'. Sometimes the simplest drawings carry the deepest meaning.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
    likes: 2341,
    comments: 167,
    hashtags: ["sketch", "dailyart", "illustration", "serenity"],
    createdAt: "8 hours ago",
  },
  {
    id: "4",
    author: users[3],
    content: "Experimenting with color theory today. This piece explores the tension between warm and cool tones. What emotions does it evoke for you?",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    likes: 3456,
    comments: 234,
    hashtags: ["abstract", "colortheory", "expressionism", "contemporary"],
    createdAt: "12 hours ago",
  },
  {
    id: "5",
    author: users[4],
    content: "Caught this moment during golden hour in Central Park. Sometimes the best shots find you when you least expect them.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    likes: 5678,
    comments: 312,
    hashtags: ["photography", "goldenhour", "nyc", "naturephotography"],
    createdAt: "1 day ago",
  },
  {
    id: "6",
    author: users[0],
    content: "Character design for a personal project I've been working on. Meet Aria, a wandering bard from the northern realms! 🎵",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    likes: 4523,
    comments: 278,
    hashtags: ["characterdesign", "fantasy", "digitalart", "conceptart"],
    createdAt: "1 day ago",
  },
];

export const trendingHashtags = [
  { tag: "digitalart", posts: 12500 },
  { tag: "watercolor", posts: 8900 },
  { tag: "sketch", posts: 7600 },
  { tag: "portrait", posts: 6200 },
  { tag: "abstract", posts: 5800 },
  { tag: "photography", posts: 5400 },
  { tag: "oilpainting", posts: 4900 },
  { tag: "illustration", posts: 4500 },
];

export const suggestedUsers = users.slice(2, 5);

export const currentUser: User = {
  id: "current",
  username: "artify_user",
  displayName: "Creative Soul",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "Just starting my creative journey on Artify! 🎨",
  followers: 42,
  following: 128,
  postsCount: 3,
};
