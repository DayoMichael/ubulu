import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useBlogStore } from "../../stores/blog/blogStore";
import { ArrowLeft, Sparkles } from "lucide-react";
import { BlogEditor } from "../../widgets/blog/editor/BlogEditor";
import { motion } from "framer-motion";
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

export function BlogEditPage() {
  const { id } = useParams();
  const postId = Number(id);
  const post = useBlogStore((s) => s.posts.find((p) => p.id === postId));
  const updatePost = useBlogStore((s) => s.updatePost);
  const navigate = useNavigate();
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  // Stable avatar for the session
  const [avatar] = useState(
    () => AVATARS[Math.floor(Math.random() * AVATARS.length)]
  );

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center text-muted-foreground">
        Post not found.
      </div>
    );
  }

  function handleUpdate() {
    if (!title.trim() || !content.trim()) return;
    updatePost(postId, { title, content });
    navigate("/blog");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-x-hidden">
      <AnimatedBlogBackground />
      <div className="relative z-10 max-w-2xl w-full mx-auto pt-6 pb-12 px-2 sm:px-0">
        {/* Top bar: Back to Home + Theme Toggle */}
        <div className="flex items-center gap-2 mb-4 px-1 sm:px-0">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Sparkles className="w-6 h-6 text-primary animate-float" />
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Edit Post
          </h1>
        </div>
        {/* Editor */}
        <BlogEditor
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={handleUpdate}
          buttonText="Update"
          disabled={!title.trim() || !content.trim()}
        />

        <div className="mb-2 text-sm text-muted-foreground font-medium pl-1">
          Live Preview
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-4 p-6 sm:p-7 bg-black/95 border border-border/90 rounded-2xl shadow-2xl items-start">
            <img
              src={avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-md mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-base text-white">
                  @ubulu_user
                </span>
                <span className="text-xs text-muted-foreground">
                  · {formatDate()}
                </span>
              </div>
              <div className="text-2xl font-extrabold leading-tight mb-2 mt-1 break-words bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent drop-shadow-md">
                {title || "Your post title will appear here..."}
              </div>
              <div className="prose prose-base max-w-none text-foreground/90 mt-2 mb-0 markdown-fine prose-pre:bg-background/80 prose-pre:rounded-lg prose-pre:p-3 prose-code:bg-muted prose-code:rounded prose-code:px-2 prose-code:py-1 prose-blockquote:border-l-4 prose-blockquote:border-primary/60 prose-blockquote:bg-muted/40 prose-blockquote:py-2 prose-blockquote:rounded-md prose-blockquote:my-2 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 transition-colors">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      content ||
                      '<span class="text-muted-foreground">Your post content will appear here...</span>',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
