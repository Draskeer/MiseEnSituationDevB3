const Error401 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-6xl font-extrabold text-red-500">401</h1>
        <p className="text-2xl text-gray-700 mt-4">
          Erreur 401 - Accès non autorisé
        </p>
        <p className="text-lg text-gray-500 mt-2">
          Vous n'avez pas l'autorisation d'accéder à cette page. Vérifiez vos
          informations d'identification ou contactez l'administrateur.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          Retour à la page d'accueil
        </a>
      </div>
    </div>
  );
};

export default Error401;
