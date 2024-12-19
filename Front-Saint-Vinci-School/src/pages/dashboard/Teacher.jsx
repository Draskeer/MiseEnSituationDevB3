import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header";

const Teacher = () => {
  const { id } = useParams();
  const location = useLocation();
  const [classe, setClasse] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const isAdmin = location.state?.isAdmin || false; // Get admin status from location state

  useEffect(() => {
    const fetchClasse = async () => {
      try {
        const { data } = await axios.get(
          `http://88.160.225.9:22222/api/class/${id}`
        );
        setClasse(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants:", error);
      }
    };
    fetchClasse();
  }, [id]);

  const handleStatusChange = async (student, studentIndex) => {
    if (!isAdmin) return; // Prevent non-admins from changing status

    setIsUpdating(true);
    try {
      await axios.put(
        `http://88.160.225.9:22222/api/students/validating/${student._id}`,
        {
          ...student,
          validatingClass: !student.validatingClass,
        }
      );
      setClasse((prevClasse) => {
        const updatedStudents = prevClasse.eleves.map((s, index) =>
          index === studentIndex
            ? { ...s, validatingClass: !s.validatingClass }
            : s
        );
        return { ...prevClasse, eleves: updatedStudents };
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Header isConnected isAdmin={isAdmin} />
      <div className="flex-grow p-5">
        <h1 className="mb-5 text-center text-xl font-bold">
          Tableau de bord de la classe de{" "}
          {classe
            ? `${classe.prof.username} (${classe.promo})`
            : "Chargement..."}
        </h1>
        {classe ? (
          <div className="p-5 max-w-4xl mx-auto bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Liste des élèves</h2>
            <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {classe.eleves.map((student, index) => (
                <li
                  key={student._id || index}
                  className="p-3 bg-green-500 text-white rounded-lg font-bold text-sm cursor-pointer transition-transform transform hover:scale-105 hover:bg-green-600"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-grow text-left pr-4">
                      {student.firstName} {student.lastName}
                    </div>
                    <button
                      onClick={
                        isAdmin
                          ? () => handleStatusChange(student, index)
                          : undefined
                      }
                      disabled={isUpdating || !isAdmin}
                      className={`
      ${student.validatingClass ? "bg-blue-500" : "bg-red-500"}
      ${
        isAdmin
          ? student.validatingClass
            ? "hover:bg-blue-600"
            : "hover:bg-red-600"
          : ""
      }
      ${!isAdmin ? "opacity-75 cursor-default" : "cursor-pointer"}
      text-xs font-normal text-white px-3 py-1 rounded-full transition-colors
    `}
                    >
                      {student.validatingClass ? "Valide" : "Redoublant"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Chargement des élèves...</p>
        )}
      </div>
    </>
  );
};

export default Teacher;
