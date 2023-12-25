const express = require("express");
const logger = require("morgan");
const cors = require("cors");

//
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
//

require("dotenv").config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// app.use(express.static("public"));
// const tempDir = path.join(__dirname, "temp");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
// });

// //мідлвара
// const upload = multer({
//   storage: multerConfig,
// });

// const contacts = [];

// const contactDir = path.join(__dirname, "public", "contact");

// app.post("/api/contacts", upload.single("avatar"), async (req, res) => {
//   console.log(req.body); //інофрмація про текстові поля запиту
//   console.log(req.file); //інформація про файл

//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(contactDir, originalname);
//   await fs.rename(tempUpload, resultUpload);

//   const avatar = path.join("contacts", originalname);
//   const newContact = {
//     id: nanoid(),
//     ...req.body,
//     avatar,
//   };

//   contacts.push(newContact);

//   res.status(201).json(newContact);
// });
// //якщо очікуємо кілька файлів - upload.array("avatar", кількість фалів)
// //якщо очікуємо кілька файлів в різних полях-
// // upload.fields([{name:"avatar", maxCount:1}, {name:"cover", maxCount:2}])
// //

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
