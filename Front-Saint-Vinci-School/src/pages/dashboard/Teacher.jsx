import "./teacher.css";

const classe = {
  promo: "CP",
  prof: "Mme Dupont",
  eleves: [
    "Jean",
    "Pierre",
    "Paul",
    "Jacques",
    "Marie",
    "Sophie",
    "Julie",
    "Lucie",
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Franck",
    "Gérard",
    "Hector",
    "Isabelle",
    "Jules",
    "Kévin",
    "Léa",
  ],
};

const Teacher = () => {
  return (
    <div className="teacher-dashboard">
      <h1>Tableau de bord</h1>
      <div className="class">
        {classe.eleves.map((eleve, index) => (
          <span key={index} className="student">{eleve}</span>
        ))}
      </div>
    </div>
  );
};

export default Teacher;
