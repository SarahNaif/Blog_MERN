import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/Home/HomePage";
import "./App.css";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ArticleDetailPage from "./pages/Articles/ArticleDetailPage"
import ArticlesPage from "./pages/Articles/ArticlesPage";
import ResetEmail from "./pages/Auth/ResetEmail";
import ProfilePage from "./pages/Profile/ProfilePage";
import CreateArticlePage from "./pages/Articles/CreateArticlePage";
import ForgetPass from "./pages/Auth/ForgetPass";

function App() {
  return (
    <div className="font-work">
      <Routes>
        <Route index path="/" element={<HomePage />} />

        <Route path="/user/forget-password" element={<ForgetPass/>} />
        <Route path="/user/reset-password/:resetPasswordToken" element={<ResetEmail/>} />



        <Route path="/articles" element={<ArticlesPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<SignupPage/>} />
        

        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/new" element={<CreateArticlePage/>} />
        <Route path="/post/:id" element={<ArticleDetailPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App
