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
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/Admin"
import ManagePosts from "./pages/admin/sections/posts/ManagePosts"
import NewPost from "./pages/admin/sections/posts/NewPost"
import DashComments from "./pages/admin/sections/comments/DashComments"
import EditPost from "./pages/admin/sections/posts/EditPost";
function App() {
  return (
    <div className="font-work font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<ArticleDetailPage />} />

        <Route path="/user/forget-password" element={<ForgetPass/>} />
        <Route path="/user/reset-password/:resetPasswordToken" element={<ResetEmail/>} />



        <Route path="/articles" element={<ArticlesPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<SignupPage/>} />
        

        <Route path="/profile" element={<ProfilePage/>} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin/>} />
          <Route path="comments" element={<DashComments />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/manage" element={<ManagePosts />} />
        </Route>

        <Route path="/new" element={<CreateArticlePage/>} />
       
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App
