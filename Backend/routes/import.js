const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const csv = require("csv-parser");

const Class = require("../models/Class");
const Student = require("../models/Student");
const User = require("../models/User");

const uploadDirectory = path.join(__dirname, "../utils");
const filePath = path.join(uploadDirectory, "data.csv");

const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, "data.csv");
    },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Aucun fichier n'a été téléchargé." });
        }

        const profsMap = new Map();
        const classesMap = new Map();
        const studentsList = [];

        const rows = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (data) => {
                    const cleanedData = {};
                    for (const key in data) {
                        const cleanedKey = key.trim().replace(/\s+/g, " "); // Nettoie les clés
                        cleanedData[cleanedKey] = data[key];
                    }
                    rows.push(cleanedData);
                })
                .on("end", resolve)
                .on("error", reject);
        });

        for (const row of rows) {
            const {
                "Nom Professeur": profName,
                "Niveau": classLevel,
                "Prénom Élève": studentFirstName,
                "Nom Élève": studentLastName,
            } = row;

            if (!profName || !studentFirstName || !studentLastName || !classLevel) {
                console.warn("Ligne ignorée : certaines colonnes sont manquantes", row);
                continue;
            }

            let prof;
            if (!profsMap.has(profName)) {
                const password = generatePassword();
                const hashedPassword = await bcrypt.hash(password, 10);
                prof = await User.create({
                    username: profName.toLowerCase().replace(/\s+/g, "."),
                    password: hashedPassword,
                    role: "Teacher",
                });
                prof.passwordPlain = password;
                profsMap.set(profName, prof);
            } else {
                prof = profsMap.get(profName);
            }

            const classKey = `${classLevel}-${profName}`;
            let currentClass;
            if (!classesMap.has(classKey)) {
                currentClass = await Class.create({
                    promo: classLevel,
                    prof: prof._id,
                    eleves: [],
                });
                classesMap.set(classKey, currentClass);
            } else {
                currentClass = classesMap.get(classKey);
            }

            const student = await Student.create({
                firstName: studentFirstName,
                lastName: studentLastName,
                classLevel,
                teacher: prof.username,
            });

            studentsList.push(student);
            currentClass.eleves.push(student._id);
            await currentClass.save();
        }

        const createdProfs = Array.from(profsMap.values()).map((prof) => ({
            username: prof.username,
            password: prof.passwordPlain,
        }));

        const createdClasses = Array.from(classesMap.values());
        const createdStudents = studentsList;

        res.status(201).json({
            message: "Fichier uploadé et importé avec succès.",
            profs: createdProfs,
            classes: createdClasses,
            students: createdStudents,
        });
    } catch (error) {
        console.error("Erreur pendant l'upload et l'importation :", error);
        res.status(500).json({ error: "Une erreur est survenue pendant le traitement du fichier." });
    }
});

module.exports = router;