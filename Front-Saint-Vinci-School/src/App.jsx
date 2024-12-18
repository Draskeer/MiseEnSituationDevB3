import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Teacher from "./pages/dashboard/teacher";
import Signup from "./pages/signup/Signup";
import UploadImportForm from "./pages/import";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/teacher/:id" element={<Teacher />} />
        <Route path="/dashboard/admin/import" element={<UploadImportForm />} />
      </Routes>
    </Router>
  );
};

export default App;
