import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { successResponse, errorResponse, authResponse } from "#u/response.js";

import User from "#m/user.model.js";

/**
 * @description Function for authentication user
 * @param {object} req
 * @param {object} res
 * @returns {object} json response
 */
export async function login(req, res) {
  const bodyReq = req.body;
  if (!bodyReq.username || !bodyReq.password) {
    return res
      .status(400)
      .json(
        authResponse(false, "Username or password is required", null, null)
      );
  }
  try {
    const user = await User.findOne({ username: bodyReq.username });
    if (!user) {
      return res
        .status(404)
        .json(authResponse(false, "User not found", null, null));
    }
    const passwordIsValid = bcryptjs.compareSync(
      bodyReq.password,
      user.password
    );
    if (!passwordIsValid) {
      return res
        .status(401)
        .json(authResponse(false, "Password is invalid", null, null));
    }
    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWTSECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).json(authResponse(true, "User is logged in", token));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
}

/**
 * @description Function for register new user
 * @param {object} req
 * @param {object} res
 * @returns {object} json response
 */

export async function register(req, res) {
  const bodyReq = req.body;

  try {
    if (!bodyReq.username || !bodyReq.password || !bodyReq.name) {
      return res
        .status(400)
        .json(authResponse(false, "All fields are required", null, null));
    }
    const usernameAlreadyExist = await User.findOne({
      username: bodyReq.username,
    });
    if (usernameAlreadyExist) {
      return res
        .status(400)
        .json(authResponse(false, "Username already exist", null, null));
    }

    const hashedPassword = bcryptjs.hashSync(bodyReq.password, 8);
    const user = await User.create({
      name: bodyReq.name,
      username: bodyReq.username,
      password: hashedPassword,
    });
    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWTSECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).json(authResponse(true, "User is registered", token));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message, null));
  }
}
