import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const UploadImportForm = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
    setError(null);
    setUploadProgress(0);
  };

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
          {response?.profs && response.profs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-green-700 mt-8 mb-4">
                <span role="img" aria-label="warning" className="mr-2">
                  ⚠️
                </span>
                LOGIN PROFESSEURS (COPIEZ AVANT DE QUITTER !!!)
              </h2>
              {response.profs.map((prof, index) => (
                <div key={index} className="mt-4">
                  <div className="p-6 bg-gradient-to-r from-green-200 via-green-300 to-green-400 border-2 border-green-500 rounded-lg shadow-lg">
                    <div className="mb-4">
                      <span className="font-semibold text-green-800">
                        Nom d'utilisateur:
                      </span>
                      <span className="ml-2 text-green-900">
                        {prof.username}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-800">
                        Mot de passe:
                      </span>
                      <span className="ml-2 text-green-900">
                        {prof.password}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && <p className="mt-6 text-center text-red-600">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default UploadImportForm;
