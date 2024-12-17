import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Teacher from "./pages/dashboard/teacher";
import Header from "./components/header";
import Signup from "./pages/signup/Signup";

const App = () => {
  return (
    <Router>
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/teacher/:username" element={<Teacher />} />
      </Routes>
    </Router>
  );
};

export default App;
