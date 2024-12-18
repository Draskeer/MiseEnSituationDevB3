import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const UploadImportForm = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Gère la sélection du fichier
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
    setError(null);
    setUploadProgress(0);
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Veuillez sélectionner un fichier CSV.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setError(null);
      setResponse(null);

      const res = await axios.post(
        "http://88.160.225.9:22222/api/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Une erreur est survenue lors de l'importation."
      );
    }
  };

  return (
    <>
      <Header isConnected />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Upload et Import de Fichier CSV
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Importer
          </button>
        </form>

        {/* Afficher la progression */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <p className="text-center mt-4 text-gray-600">
            Progression : {uploadProgress}%
          </p>
        )}

        {/* Afficher le succès */}
        {response && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md">
            <h3 className="font-semibold text-green-600">
              Importation réussie !
            </h3>
            <pre className="mt-2 text-green-700">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        {/* Afficher les erreurs */}
        {error && <p className="mt-6 text-center text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default UploadImportForm;
