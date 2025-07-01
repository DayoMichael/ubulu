import { create } from "zustand";

export type Post = {
  id: number;
  title: string;
  content: string;
};

interface BlogState {
  posts: Post[];
  addPost: (post: Omit<Post, "id">) => void;
  updatePost: (id: number, post: Omit<Post, "id">) => void;
  deletePost: (id: number) => void;
}

let nextId = 3;

export const useBlogStore = create<BlogState>((set) => ({
  posts: [
    {
      id: 1,
      title: "First Blog Post",
      content: "# Hello World\nThis is the **first** post!",
    },
    {
      id: 2,
      title: "Second Post",
      content: "## Another Post\nMarkdown _works_ here.",
    },
  ],
  addPost: (post) =>
    set((state) => ({
      posts: [{ ...post, id: nextId++ }, ...state.posts],
    })),
  updatePost: (id, post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? { ...p, ...post } : p)),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
}));
