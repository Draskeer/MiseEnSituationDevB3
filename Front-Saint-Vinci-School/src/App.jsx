import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Teacher from "./pages/dashboard/Teacher";
import Header from "./components/header";
import Signup from "./pages/signup/Signup";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/teacher" element={<Teacher />} />
      </Routes>
    </Router>
  );
};

export default App;
