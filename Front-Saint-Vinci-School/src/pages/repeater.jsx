import { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useState } from "react";
import { jsPDF } from "jspdf";

const Repeater = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchClasse = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/api/students/notValidating`
        );
        setStudents(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants:", error);
      }
    };

    fetchClasse();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(12);

    doc.text("Liste des étudiants redoublants", 20, 20);

    students.forEach((student, index) => {
      doc.text(
        `${index + 1}. ${student.firstName} ${student.lastName} - Classe: ${
          student.classLevel
        }`,
        20,
        30 + index * 10
      );
    });

    doc.save("eleves_redoublants.pdf");
  };

  return (
    <>
      <Header isConnected isAdmin />
      <div className="flex justify-between items-center mb-6 px-6 py-4 bg-gray-50 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">
          Élèves redoublants
        </h2>
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Télécharger PDF
        </button>
      </div>
      {students.length === 0 ? (
        <p className="self-center font-bold">Il n'y a pas de redoublants.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mx-auto max-w-screen-xl">
          {students.map((student, index) => (
            <li
              key={index}
              className="flex flex-col items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 w-full transform hover:scale-105"
            >
              <div className="flex flex-col mb-4">
                <span className="text-xl font-semibold text-gray-800">
                  {student.firstName} {student.lastName}
                </span>
                <span className="text-sm font-medium text-gray-500 mt-1">
                  Niveau : {student.classLevel}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Repeater;
