import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";
import Role from "../models/role.model";
import { generateAccessToken, generateRefreshToken } from "../services/jwt";

// Common function to create/find user
const findOrCreateSocialUser = async (
  email: string,
  name: string,
  provider: string,
  providerId: string
) => {
  let user = await User.findOne({ where: { email } });

  if (!user) {
    // Assign default role
    const [role] = await Role.findOrCreate({
      where: { id: 2 }, // e.g., USER role
      defaults: { id: 2, name: "USER" },
    });

    user = await User.create({
      email,
      password: null as unknown as string,
      confirmPassword: null as unknown as string,
      roleId: role.id,
      roleName: role.name,
      retriveId: uuidv4(),
      provider,
      providerId,
    });
  }

  return user;
};

// Google Login Controller
export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { email, name, googleId } = req.body;

    if (!email || !googleId) {
      return res
        .status(400)
        .json({ status: false, message: "Google account data missing." });
    }

    const user = await findOrCreateSocialUser(email, name, "google", googleId);
if (!user.email || !user.retriveId) {
  throw new Error("User email or retriveId is missing");
}

    const payload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      roleName: user?.roleName,
      retriveId: user.retriveId,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return res.status(200).json({
      status: true,
      message: "Google login successful",
      data: { user: payload, accessToken, refreshToken },
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

// Facebook Login Controller
export const facebookLogin = async (req: Request, res: Response) => {
  try {
    const { email, name, facebookId } = req.body;

    if (!email || !facebookId) {
      return res
        .status(400)
        .json({ status: false, message: "Facebook account data missing." });
    }

    const user = await findOrCreateSocialUser(
      email,
      name,
      "facebook",
      facebookId
    );

    if (!user.email || !user.retriveId) {
      throw new Error("User email or retriveId is missing");
    }
    const payload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      roleName: user.roleName,
      retriveId: user.retriveId,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return res.status(200).json({
      status: true,
      message: "Facebook login successful",
      data: { user: payload, accessToken, refreshToken },
    });
  } catch (error) {
    console.error("Facebook login error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
