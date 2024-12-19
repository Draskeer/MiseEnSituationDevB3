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
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid gap-6">
              {Object.entries(classesByTeacher).map(([teacherUsername, classes]) => (
                <div key={teacherUsername} className="border rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-3">
                    {formatTeacherName(teacherUsername)}
                  </h2>
                  <ul className="space-y-2">
                    {classes.map(({ promo }, index) => (
                      <li key={index} className="bg-blue-500 rounded p-2">
                        <Link
                          to={`/dashboard/teacher/${id}`}
                          state={{ isAdmin: true }}
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
        </div>
      </div>
    </>
  );
};

export default Admin;