import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

const Admin = () => {
  const { id } = useParams();
  const [classesByTeacher, setClassesByTeacher] = useState({});
  const [loading, setLoading] = useState(true);

  const formatTeacherName = (username) => {
    if (!username || username === "Pas de Prof") return "Non assigné";
    return username
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get(
          "http://88.160.225.9:22222/api/class/"
        );
        const groupedClasses = data.classes.reduce((acc, currentClass) => {
          const teacherUsername = currentClass.prof?.username || "Non assigné";
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
          <p className="text-center text-gray-600">Chargement des classes...</p>
        ) : (
          <div className="p-5 max-w-4xl mx-auto bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Liste des classes</h2>
            <div className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(classesByTeacher)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([teacher, promos]) => (
                  <div
                    key={teacher}
                    className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <h3 className="text-lg font-semibold mb-3 border-b border-blue-400 pb-2">
                      {formatTeacherName(teacher)}
                    </h3>
                    <ul className="space-y-2">
                      {promos
                        .sort((a, b) => a.promo.localeCompare(b.promo))
                        .map(({ promo, id }) => (
                          <li
                            key={id}
                            className="hover:translate-x-1 transition-transform"
                          >
                            <Link
                              to={`/dashboard/teacher/${id}`}
                              state={{ isAdmin: true }} // Pass admin status through state
                              className="text-white hover:text-blue-100 flex items-center"
                            >
                              <span className="mr-2">→</span>
                              {promo}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="mt-6 text-center">
          <NavLink
            to="repeater"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Élèves redoublants
          </NavLink>
          <NavLink
            to="import"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ml-4"
          >
            Importer un CSV
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Admin;
