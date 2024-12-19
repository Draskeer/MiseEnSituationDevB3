import { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useState } from "react";

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

  return (
    <>
      <Header isConnected isAdmin />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-auto max-w-screen-lg">
        {students.map((student, index) => (
          <li
            key={index}
            className="flex flex-col items-start p-4 bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 w-full"
          >
            <div className="flex flex-col mb-2">
              <span className="text-lg font-semibold text-gray-800">
                {student.firstName} {student.lastName}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {student.classLevel}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Repeater;
