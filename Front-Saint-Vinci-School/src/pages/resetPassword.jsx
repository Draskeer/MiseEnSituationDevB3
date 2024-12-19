import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post(`http://88.160.225.9:22222/api/changePassword/${id}`, {
        oldPassword,
        newPassword,
      });
      setMessage("Mot de passe réinitialisé avec succès.");
      navigate(`/dashboard/teacher/${id}`);
    } catch (error) {
      setMessage(
        "Une erreur est survenue lors de la réinitialisation du mot de passe.",
        error
      );
    }
  };

  return (
    <div className=" flex flex-col min-h-screen flex items-center justify-center">
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="signup p-6 max-w-md w-full bg-white rounded-lg shadow-lg">
        <form onSubmit={submit}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Réinitialisation du mot de passe
          </h2>

          <div className="mb-4">
            <label
              htmlFor="old-password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Ancien mot de passe
            </label>
            <input
              type="password"
              name="old-password"
              value={oldPassword}
              required
              onChange={(e) => setOldPassword(e.target.value)}
              id="old-password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="new-password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              id="new-password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="confirm-password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
