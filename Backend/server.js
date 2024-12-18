const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/users");
const classRoutes = require("./routes/class");
const studentRoutes = require("./routes/students");
const importRoute = require("./routes/import");

const app = express();
const port = 22222;
app.use(cors());
app.use(express.json());

app.use('/api/', userRoutes);
app.use('/api/class', classRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/import', importRoute);


mongoose.connect('mongodb+srv://ScolarVinci:QJTBPX9FCINs0J4c@miseensituationdev.8gghw.mongodb.net/?retryWrites=true&w=majority&appName=MiseEnSituationDev')
    .then(() => {
        console.log("Connexion à MongoDB réussie");
        app.listen(port, () => console.log("Serveur démarré sur le port:", port));
    })
    .catch((error) => console.error("Erreur de connexion à MongoDB :", error));
