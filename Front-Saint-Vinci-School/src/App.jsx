import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Login from "./pages/login/Login";
import Admin from "./pages/dashboard/Admin";
import Teacher from "./pages/dashboard/teacher";
import Signup from "./pages/signup/Signup";
import UploadImportForm from "./pages/import";
import ResetPassword from "./pages/resetPassword";
import Repeater from "./pages/repeater";
import AddStudent from "./pages/addStudent";

const App = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/admin/:id/add-student"
          element={<AddStudent />}
        />
        <Route path="/:id/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard/teacher/:id" element={<Teacher />} />
        <Route
          path="/dashboard/admin/:id/import"
          element={<UploadImportForm />}
        />
        <Route path="/dashboard/admin/:id" element={<Admin />} />
        <Route path="/dashboard/admin/:id/repeater" element={<Repeater />} />
      </Routes>
    </Router>
  );
};

export default App;
