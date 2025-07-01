import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { UsersTablePage } from "./pages/UsersTablePage";
import { DynamicFormPage } from "./pages/DynamicFormPage";
import { BlogRoutes } from "./routes/BlogRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users-table" element={<UsersTablePage />} />
        <Route path="/dynamic-form" element={<DynamicFormPage />} />
        <Route path="/blog/*" element={<BlogRoutes />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
