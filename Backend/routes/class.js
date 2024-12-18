const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

router.get("/:id", async (req, res) => {
    try {
        const profId = req.params.id;

        const classInfo = await Class.findOne({ prof: profId })
            .populate("prof", "username")
            .populate("eleves", "firstName lastName validatingClass");

        if (!classInfo) {
            return res.status(404).json({ message: "Aucune classe trouvée pour ce professeur." });
        }

        res.status(200).json({
            message: "Informations de la classe récupérées avec succès.",
            data: classInfo
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des informations de la classe :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

module.exports = router;