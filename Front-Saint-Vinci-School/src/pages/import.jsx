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
        `${import.meta.env.VITE_BACKEND_URL}/api/import`,
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
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Importer
            </button>
          </form>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <p className="text-center mt-4 text-gray-600">
              Progression : {uploadProgress}%
            </p>
          )}
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
          {error && <p className="mt-6 text-center text-red-600">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default UploadImportForm;
