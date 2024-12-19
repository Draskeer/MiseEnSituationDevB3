import axios from "axios";
import { ClassSelect } from "../components/ClassSelect";
import { useState } from "react";

const instialState = {
  firstName: "",
  lastName: "",
  classLevel: "1ère section maternelle",
};

const AddStudent = () => {
  const [student, setStudent] = useState(instialState);
  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://88.160.225.9:22222/api/students", student);
      setMessage("Élève ajouté avec succès");
    } catch (message) {
      setMessage("Erreur lors de l'ajout de l'élève", message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-lg">
        <form onSubmit={submit}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Ajouter un élève
          </h2>

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              required
              onChange={(e) =>
                setStudent((state) => ({ ...state, firstName: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              required
              onChange={(e) =>
                setStudent((state) => ({ ...state, lastName: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <ClassSelect
              value={student.classLevel}
              onChange={(e) =>
                setStudent((state) => ({
                  ...state,
                  classLevel: e.target.value,
                }))
              }
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
