import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "#config/connection.js";
import routes from "#r/index.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect();
app.get("/", (req, res) => {
  res.json({
    name: "Exempli Gratia Quiz API",
    version: "1.0.0",
    description: "API for Exempli Gratia Quiz App",
    creators: [
      {
        name: "Ridho Azkia Azhar",
        city: "Tasikmalaya",
        contact: {
          instagram: "https://instagram.com/ridhoibey",
          linkkedIn: "https://linkedin.com/in/ridhoazkiaa",
          github: "https:://github.com/ridhoibey0",
          email: "ridhoazkiaa@gmail.com",
          website: "https://ridhoazkiaa.my.id",
        },
      },
    ],
  });
});
app.use("/api/v1", routes);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
