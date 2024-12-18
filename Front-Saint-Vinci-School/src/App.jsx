import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Admin from "./pages/dashboard/Admin";
import Teacher from "./pages/dashboard/teacher";
import Signup from "./pages/signup/Signup";
import UploadImportForm from "./pages/import";
import ResetPassword from "./pages/resetPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard/teacher/:id" element={<Teacher />} />
        <Route path="/dashboard/admin/import" element={<UploadImportForm />} />
        <Route path="/dashboard/admin/:id" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
