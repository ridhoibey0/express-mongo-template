// create router
import { Router } from "express";
import authRoutes from "#r/auth.routes.js";
const routes = Router();

routes.get("/", (req, res) => {
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
          website: "https://ridhoibey0.github.io",
        },
      },
    ],
  });
});

routes.use("/auth", authRoutes);
export default routes;
