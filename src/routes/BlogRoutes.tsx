import { Routes, Route, Navigate } from "react-router-dom";
import { BlogListPage } from "../pages/blog/BlogListPage";
import { BlogNewPage } from "../pages/blog/BlogNewPage";
import { BlogEditPage } from "../pages/blog/BlogEditPage";

export function BlogRoutes() {
  return (
    <Routes>
      <Route path="" element={<BlogListPage />} />
      <Route path="new" element={<BlogNewPage />} />
      <Route path="edit/:id" element={<BlogEditPage />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}
