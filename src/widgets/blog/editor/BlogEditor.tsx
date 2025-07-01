import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import { useEffect } from "react";
import "../../../styles/BlogNewPage.css";

const lowlight = createLowlight();
lowlight.register({ js, ts });

interface BlogEditorProps {
  title: string;
  content: string;
  onTitleChange: (v: string) => void;
  onContentChange: (v: string) => void;
  onSubmit: () => void;
  buttonText?: string;
  disabled?: boolean;
}

export function BlogEditor({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  buttonText = "Publish",
  disabled,
}: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({ placeholder: "Write your post..." }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
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
                editor.isActive("italic") ? "bg-primary/20 text-primary" : ""
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <i>I</i>
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-semibold line-through transition-colors duration-150 ${
                editor.isActive("strike") ? "bg-primary/20 text-primary" : ""
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
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Blockquote"
            >
              &#8220;
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded-lg bg-background/80 hover:bg-primary/10 text-base font-semibold transition-colors duration-150 ${
                editor.isActive("codeBlock") ? "bg-primary/20 text-primary" : ""
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
                if (url) editor.chain().focus().toggleLink({ href: url }).run();
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
          onChange={(e) => onTitleChange(e.target.value)}
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
          onClick={onSubmit}
          disabled={disabled}
          variant="default"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
