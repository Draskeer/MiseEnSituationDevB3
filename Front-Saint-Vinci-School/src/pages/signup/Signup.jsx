import { useState } from "react";
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://88.160.225.9:22222/api/signup", {
        username,
        password,
        role,
      });
      setMessage("Account created successfully");
    } catch (error) {
      setMessage("User already exists", error);
    }
  };

  return (
    <div className="signup">
      {message && <p>{message}</p>}
      <form onSubmit={submit}>
        <h2>Créer un compte</h2>
        <span>Nom d'utilisateur</span>
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
        <span>Rôle</span>
        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="Admin">Administrateur</option>
          <option value="Teacher">Professeur</option>
        </select>
        <a href="/forgot-password">Mot de passe oublié ?</a>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
