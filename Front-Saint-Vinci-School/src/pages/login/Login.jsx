import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://88.160.225.9:22222/api/login", {
        username,
        password,
      });

      if (data.isLogin) {
        if (data.isAdmin) {
          navigate(`/dashboard/admin/${data.Id}`);
        } else {
          navigate(`/dashboard/teacher/${data.Id}`);
        }
      }
    } catch (error) {
      setError("Invalid credentials", error);
    }
  };

  return (
    <div className="login">
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <h2>Se connecter</h2>
        <span>Nom d&apos;utilisateur</span>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span>Mot de passe</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/forgot-password">Mot de passe oublié ?</a>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
