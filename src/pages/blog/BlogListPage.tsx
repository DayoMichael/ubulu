import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useBlogStore } from "../../stores/blog/blogStore";
import { Sparkles, Trash2, Edit2, Plus, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "../../components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBlogBackground } from "../../widgets/blog/shared/AnimatedBlogBackground";

const AVATARS = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/65.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/12.jpg",
];

function formatDate(date = new Date()) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Update the initial post to be more informative and Markdown-rich
const initialPost = {
  id: 1,
  title: "Welcome to the Ubulu Blog! Markdown Demo & Tips",
  content: `Hey everyone! 👋\n\n Feel free to test things out`,
};

export function BlogListPage() {
  const navigate = useNavigate();
  const posts = useBlogStore((s) => s.posts);
  const deletePost = useBlogStore((s) => s.deletePost);
  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-background via-background to-muted/20 overflow-x-hidden">
      {/* Animated background */}
      <AnimatedBlogBackground />
      <div className="relative z-10 max-w-2xl w-full mx-auto py-6 px-1 sm:px-0">
        {/* Top bar: Back to Home + Theme Toggle */}
        <div className="flex items-center justify-between mb-4 px-1 sm:px-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-base font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <ThemeToggle />
        </div>
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-card border border-border/60 rounded-xl px-4 py-3 mb-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Blog Feed
            </h1>
          </div>
          <Button
            onClick={() => navigate("/blog/new")}
            className="gap-2 font-semibold px-3 py-1.5 h-auto text-sm rounded-lg"
          >
            <Plus className="w-4 h-4" /> New Post
          </Button>
        </div>
        {/* Main Blog Card */}
        <Card className="bg-card/90 border border-border/80 shadow-lg rounded-2xl p-0 sm:p-2">
          <CardContent className="p-0">
            <div className="space-y-5">
              <AnimatePresence>
                {posts.length === 0 ? (
                  <motion.div
                    className="text-muted-foreground text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Sparkles className="w-8 h-8 mb-2 text-primary animate-float" />
                      <div className="text-lg font-semibold mb-2">
                        No posts yet. Be the first to post!
                      </div>
                      <div className="prose prose-base max-w-none text-foreground/80 bg-black/80 border border-border/80 rounded-2xl shadow-md p-6 mt-4">
                        <div className="text-xl font-bold mb-2 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                          {initialPost.title}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: initialPost.content,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  posts.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 30, scale: 0.96 }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      whileHover={{
                        scale: 1.01,
                        y: -2,
                        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
                      }}
                    >
                      <div className="flex gap-3 p-5 sm:p-6 bg-black/90 border border-border/90 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200">
                        {/* Avatar */}
                        <img
                          src={AVATARS[idx % AVATARS.length]}
                          alt="avatar"
                          className="w-11 h-11 rounded-full object-cover border border-border shadow-sm mt-1"
                        />
                        {/* Main content */}
                        <div className="flex-1 min-w-0">
                          {/* Username, timestamp, actions */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-light text-sm text-muted-foreground">
                                @ubulu_user
                              </span>
                              <span className="text-xs text-muted-foreground">
                                · {formatDate()}
                              </span>
                            </div>
                            <div className="flex flex-row gap-1 items-center">
                              <button
                                title="Edit"
                                onClick={() =>
                                  navigate(`/blog/edit/${post.id}`)
                                }
                                className="p-1 rounded-full hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                                style={{ lineHeight: 0 }}
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                title="Delete"
                                onClick={() => deletePost(post.id)}
                                className="p-1 rounded-full hover:bg-destructive/10 text-destructive transition-colors cursor-pointer"
                                style={{ lineHeight: 0 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {/* Title as main tweet */}
                          <div className="text-lg font-bold leading-tight mb-2 mt-1 break-words bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent drop-shadow-sm">
                            {post.title}
                          </div>
                          {/* Markdown content as tweet body */}
                          <div className="prose prose-base max-w-none text-foreground/90 mt-2 mb-0 markdown-fine prose-pre:bg-background/80 prose-pre:rounded-lg prose-pre:p-3 prose-code:bg-muted prose-code:rounded prose-code:px-2 prose-code:py-1 prose-blockquote:border-l-4 prose-blockquote:border-primary/60 prose-blockquote:bg-muted/40 prose-blockquote:py-2 prose-blockquote:rounded-md prose-blockquote:my-2 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 transition-colors">
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  post.content ||
                                  '<span class="text-muted-foreground">Your post content will appear here...</span>',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
