import { useEffect, useState } from "react";
import axios from "axios";
import "./teacher.css";
import { useParams } from "react-router-dom";

const Teacher = () => {
  const { username } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios("http://88.160.225.9:22222/api/students");
        setStudents(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="teacher-dashboard">
      <h1>Tableau de bord de {username}</h1>
      <div className="class">
        {students.length === 0 ? (
          <p>Aucun étudiant trouvé.</p>
        ) : (
          <ul>
            {students.map(
              (student, index) =>
                student.teacher === username && (
                  <li key={index} className="student">
                    {student.firstName} {student.lastName}
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Teacher;
