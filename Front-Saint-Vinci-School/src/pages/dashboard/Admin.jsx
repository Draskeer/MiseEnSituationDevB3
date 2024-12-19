import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

const Admin = () => {
  const { id } = useParams();

  const [classesByTeacher, setClassesByTeacher] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get(
          "http://88.160.225.9:22222/api/class/"
        );
        const classes = data.classes;

        const groupedClasses = classes.reduce((acc, currentClass) => {
          const teacherUsername = currentClass.prof?.username || "Pas de Prof";
          if (!acc[teacherUsername]) {
            acc[teacherUsername] = [];
          }
          acc[teacherUsername].push({
            promo: currentClass.promo,
            id: currentClass.prof._id,
          });
          return acc;
        }, {});

        setClassesByTeacher(groupedClasses);
      } catch (error) {
        console.error("Erreur lors de la récupération des classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <>
      <Header isConnected isAdmin />
      <div className="flex-grow p-5">
        <h1 className="mb-5 text-center text-xl font-bold">
          Tableau de bord Admin
        </h1>
        {loading ? (
          <p>Chargement des classes...</p>
        ) : (
          <div className="p-5 max-w-4xl mx-auto bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Liste des classes</h2>
            <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(classesByTeacher).map(([teacher, promos]) => (
                <li
                  key={teacher}
                  className="p-3 bg-blue-500 text-white rounded-lg font-bold text-sm transition-transform transform hover:scale-105 hover:bg-blue-600"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Classe de {teacher}
                    </h3>
                    <ul className="list-disc ml-4">
                      {promos.map(({ promo, id }) => (
                        <li key={id}>
                          <Link
                            to={`/dashboard/teacher/${id}`}
                            className="text-white underline hover:text-gray-300"
                          >
                            {promo}
                            {console.log(id)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <NavLink to="repeater">Éleves redoublant</NavLink>
      </div>
    </>
  );
};

export default Admin;
