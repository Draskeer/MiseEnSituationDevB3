import { useState } from "react";
import axios from "axios";

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
    <div className="flex flex-col min-h-screen flex items-center justify-center">
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="signup p-6 max-w-md w-full bg-white rounded-lg shadow-lg">
        <form onSubmit={submit}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Créer un compte
          </h2>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Nom d&apos;utilisateur
            </label>
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Rôle
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              id="role"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Admin">Administrateur</option>
              <option value="Teacher">Professeur</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
