import jwt from "jsonwebtoken";
import authconfig from "#config/authconfig.js";
import { errorResponse } from "#u/response.js";

export function verifyToken(req, res, next) {
  try {
    let authorizationHeader = req.header("Authorization");
    if (authorizationHeader) {
      let bearerToken = authorizationHeader.split(" ");
      if (bearerToken[0] === "Bearer" && bearerToken[1]) {
        const decoded = jwt.verify(bearerToken[1], authconfig.secret);
        req.user = decoded;
        next();
      } else {
        return res.status(401).json(errorResponse("Token Must Be Bearer!"));
      }
    } else {
      return res.status(401).json(errorResponse("LOGIN NEEDED!"));
    }
  } catch (error) {
    res.status(401).json(errorResponse("PROBLEM : " + error));
  }
}
