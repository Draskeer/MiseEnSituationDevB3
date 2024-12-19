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
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          username,
          password,
        }
      );

      if (data.isLogin) {
        if (data.isFirstConnection && !data.isAdmin) {
          navigate(`/${data.Id}/reset-password`);
          return;
        }

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
    <div className="flex flex-col min-h-screen flex items-center justify-center">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="login p-6 max-w-md w-full bg-white rounded-lg shadow-lg">
        <form onSubmit={submit}>
          <h2 className="text-2xl font-bold mb-6 text-center">Se connecter</h2>

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
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
