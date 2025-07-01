import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useBlogStore } from "@/stores";
import { Sparkles, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "../../components/ui/ThemeToggle";
import { motion } from "framer-motion";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import { createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import "../../styles/BlogNewPage.css";
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

const lowlight = createLowlight();
lowlight.register({ js, ts });

export function BlogNewPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const addPost = useBlogStore((s) => s.addPost);
  const navigate = useNavigate();

  const [avatar] = useState(
    () => AVATARS[Math.floor(Math.random() * AVATARS.length)]
  );

  // Tiptap editor setup
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({ placeholder: "Write your post..." }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  function handlePublish() {
    if (!title.trim() || !content.trim()) return;
    addPost({ title, content });
    navigate("/blog");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-x-hidden">
      <AnimatedBlogBackground />
      <div className="relative z-10 max-w-2xl w-full mx-auto pt-6 pb-12 px-2 sm:px-0">
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
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Compose Post
          </h1>
        </div>
        {/* Form */}
        <Card className="shadow-2xl border border-border/80 mb-10 bg-black/70 backdrop-blur-md rounded-2xl">
          <CardContent className="pt-8 pb-8 px-5 sm:px-8 space-y-6">
            {/* Tiptap Toolbar */}
            {editor && (
              <div className="flex flex-wrap gap-2 mb-3 p-2 bg-muted/60 rounded-xl shadow-inner border border-border/40">
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-semibold transition-colors duration-150 ${
                    editor.isActive("bold") ? "bg-primary/20 text-primary" : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  title="Bold"
                >
                  <b>B</b>
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-semibold italic transition-colors duration-150 ${
                    editor.isActive("italic")
                      ? "bg-primary/20 text-primary"
                      : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  title="Italic"
                >
                  <i>I</i>
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-semibold line-through transition-colors duration-150 ${
                    editor.isActive("strike")
                      ? "bg-primary/20 text-primary"
                      : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  title="Strikethrough"
                >
                  S
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-mono transition-colors duration-150 ${
                    editor.isActive("code") ? "bg-primary/20 text-primary" : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  title="Inline Code"
                >
                  {"< >"}
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-semibold transition-colors duration-150 ${
                    editor.isActive("blockquote")
                      ? "bg-primary/20 text-primary"
                      : ""
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  title="Blockquote"
                >
                  &#8220;
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-semibold transition-colors duration-150 ${
                    editor.isActive("codeBlock")
                      ? "bg-primary/20 text-primary"
                      : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  title="Code Block"
                >
                  &#123;&#125;
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-semibold underline transition-colors duration-150 ${
                    editor.isActive("link") ? "bg-primary/20 text-primary" : ""
                  }`}
                  onClick={() => {
                    const url = prompt("Enter URL");
                    if (url)
                      editor.chain().focus().toggleLink({ href: url }).run();
                  }}
                  title="Link"
                >
                  &#128279;
                </button>
              </div>
            )}
            <input
              className="w-full border-none outline-none bg-background/80 text-2xl font-extrabold mb-3 focus:ring-2 focus:ring-primary/40 transition-all rounded-xl px-4 py-3 placeholder:text-lg placeholder:font-normal shadow-inner"
              placeholder="Title (e.g. Markdown Demo Post)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
            />
            {editor && (
              <div className="rounded-xl bg-background/90 transition-all min-h-[140px] shadow-inner">
                <EditorContent
                  editor={editor}
                  className="p-4 font-sans text-base min-h-[120px] outline-none rounded-xl border-none focus:ring-0 focus:border-none"
                />
              </div>
            )}
            <Button
              className="w-full py-3 rounded-xl mt-2 text-base bg-white text-black font-normal border border-border shadow-sm hover:bg-muted transition-all duration-150"
              onClick={handlePublish}
              disabled={!title.trim() || !content.trim()}
              variant="default"
            >
              Publish
            </Button>
          </CardContent>
        </Card>
        {/* Live Preview */}
        <div className="mb-2 text-sm text-muted-foreground font-medium pl-1">
          Live Preview
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-4 p-6 sm:p-7 bg-black/95 border border-border/90 rounded-2xl shadow-2xl items-start">
            {/* Avatar */}
            <img
              src={avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-md mt-1"
            />
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Username, timestamp */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-base text-white">
                  @ubulu_user
                </span>
                <span className="text-xs text-muted-foreground">
                  · {formatDate()}
                </span>
              </div>
              {/* Title as main tweet */}
              <div className="text-2xl font-extrabold leading-tight mb-2 mt-1 break-words bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent drop-shadow-md">
                {title || "Your post title will appear here..."}
              </div>
              {/* Tiptap content as tweet body */}
              <div className="prose prose-base max-w-none text-foreground/90 mt-2 mb-0 markdown-fine prose-pre:bg-background/80 prose-pre:rounded-lg prose-pre:p-3 prose-code:bg-muted prose-code:rounded prose-code:px-2 prose-code:py-1 prose-blockquote:border-l-4 prose-blockquote:border-primary/60 prose-blockquote:bg-muted/40 prose-blockquote:py-2 prose-blockquote:rounded-md prose-blockquote:my-2 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 transition-colors">
                {editor && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        content ||
                        '<span class="text-muted-foreground">Your post content will appear here...</span>',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
