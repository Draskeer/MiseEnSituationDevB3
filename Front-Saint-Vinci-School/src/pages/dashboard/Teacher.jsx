import { useEffect, useState } from "react";
import axios from "axios";
import "./teacher.css";
import { useParams } from "react-router-dom";

const Teacher = () => {
  const { id } = useParams();
  const [classe, setClasse] = useState(null);

  useEffect(() => {
    const fetchClasse = async () => {
      try {
        const { data } = await axios(
          `http://88.160.225.9:22222/api/class/${id}`
        );
        setClasse(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants:", error);
      }
    };

    fetchClasse();
  }, [id]);

  return (
    <div className="teacher-dashboard">
      <h1>
        Tableau de bord de la classe de{" "}
        {classe ? `${classe.prof.username} (${classe.promo})` : "Chargement..."}
      </h1>
      {classe ? (
        <div className="students">
          <h2>Liste des élèves :</h2>
          <ul>
            {classe.eleves.map((student, index) => (
              <li key={index} className="student">
                {student.firstName} {student.lastName}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement des élèves...</p>
      )}
    </div>
  );
};

export default Teacher;
