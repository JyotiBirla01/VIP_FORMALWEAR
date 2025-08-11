// import { createToken } from "../services/jwt";
// import { Request, Response } from "express";
// import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcrypt";
// import User from "../models/user.model";


// export const signup = async (req: Request, res: Response) => {
//   try {
//     const { email, password, confirmPassword } = req.body;

//     // Manual confirmPassword check (in case validator misses it)
//     if (password !== confirmPassword) {
//       return res.status(400).json({ status: false, message: "Passwords do not match." });
//     }

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ status: false, message: "Email already exists." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//       const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10); 
//     const retriveId = uuidv4();

//     const user = await User.create({
//       email,
//       password: hashedPassword,
//      confirmPassword: hashedConfirmPassword,
//       retriveId,
//     });

// console.log("user>>>", user);

//     const payload = {
//       id: user.id,
//     //   name: user.name,
//       email: user.email,
//     //   roleId: user.roleId,
//       retriveId: user.retriveId,
//     };

//     const token = createToken(payload);

//     return res.status(201).json({
//       status: true,
//       message: "Signup successful",
//       data: { ...payload, token },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ status: false, message: "Internal Server Error" });
//   }
// };


// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ status: false, message: "Invalid email/password." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ status: false, message: "Invalid email/password." });
//     }

//     const retriveId = uuidv4();
//     user.retriveId = retriveId;
//     await user.save();

//     const payload = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       roleId: user.roleId,
//       retriveId: user.retriveId,
//     };

//     const token = createToken(payload);

//     return res.status(200).json({
//       status: true,
//       message: "Login successful",
//       data: { ...payload, token },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ status: false, message: "Internal Server Error" });
//   }
// };
// controllers/auth.controller.ts
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(400).json({ status: false, message: "Invalid email/password." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password || '');
//     if (!isMatch) {
//       return res.status(400).json({ status: false, message: "Invalid email/password." });
//     }

//     const retriveId = uuidv4();
//     user.retriveId = retriveId;
//     await user.save();
// if (!user.email || !user.retriveId) {
//   return res.status(500).json({ status: false, message: "User data incomplete." });
// }
//     const payload = {
//       id: user.id,
//       email: user.email,
//       roleId: user.roleId,
//       roleName: user.roleName,
//       retriveId: user.retriveId,
//     };

//     const token = createToken(payload);

//     return res.status(200).json({
//       status: true,
//       message: "Login successful",
//       data: { ...payload, token },
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ status: false, message: "Internal Server Error" });
//   }
// };


import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import Role from "../models/role.model";
import { generateAccessToken, generatePasswordResetToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../services/jwt";
import { passwordResetEmail } from "../utils/email.templates";
import { sendEmail } from "../services/email.service";
import { hashPassword, validatePasswordStrength } from "../utils/password.utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword, roleId } = req.body;

    if (!email || !password || !confirmPassword || !roleId) {
      return res.status(400).json({ status: false, message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ status: false, message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "Email already exists." });
    }

    // Fetch or create the role
    const [role] = await Role.findOrCreate({
      where: { id: roleId },
      defaults: { id: roleId },
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const retriveId = uuidv4();

    const user = await User.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Usually not stored, but keeping for your structure
      retriveId,
      roleId: role.id,
      roleName: role.name
    });
if (!user.email || !user.retriveId) {
  return res.status(500).json({ status: false, message: "User data incomplete." });
}
    const payload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      // roleName: user.roleName,
      // retriveId: user.retriveId,
    };

    // const token = generateAccessToken(payload);

    return res.status(201).json({
      status: true,
      message: "Signup successful",
      data: { ...payload },
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof password !== 'string') {
      return res.status(400).json({ status: false, message: "Email and password are required." });
    }

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'roleId', 'roleName', 'retriveId'], // ✅ Fix: explicitly select password
    });

    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid email/password." });
    }

    // ✅ Fix: Check if password is missing or invalid
    if (!user.password || typeof user.password !== 'string') {
      return res.status(500).json({ status: false, message: "User has no valid password stored." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Invalid email/password." });
    }
if (!user.email) {
  return res.status(500).json({ status: false, message: "User email missing." });
}
    const retriveId = uuidv4();
    user.retriveId = retriveId;
    await user.save();

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
      message: "Login successful",
      data: {
        user: payload,
        accessToken,
        refreshToken
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};



export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ status: false, message: "Refresh token required" });
    }

    const decoded = verifyRefreshToken(refreshToken);
  const { exp, iat, ...cleanPayload } = decoded;
    const newAccessToken = generateAccessToken(cleanPayload);

    return res.status(200).json({
      status: true,
      message: "Access token refreshed",
      accessToken: newAccessToken
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(403).json({ status: false, message: "Invalid refresh token" });
  }
};




export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "Email is required." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // For security, don't reveal if email doesn't exist
      return res.status(200).json({
        status: true,
        message:
          "If this email exists in our system, you'll receive a password reset link.",
      });
    }
    // Add explicit check for email
    if (!user.email) {
      return res.status(500).json({
        status: false,
        message: "User account has no email address",
      });
    }
    
    const resetToken = generatePasswordResetToken(user.id, user.email);
    user.resetToken = resetToken;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const emailSent = await sendEmail(passwordResetEmail(email, resetLink));

    if (!emailSent) {
      return res
        .status(500)
        .json({ status: false, message: "Failed to send reset email." });
    }

    return res.status(200).json({
      status: true,
      message: "Password reset email sent if the email exists in our system.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Passwords do not match." });
    }

    const passwordCheck = validatePasswordStrength(newPassword);
    if (!passwordCheck.valid) {
      return res.status(400).json({
        status: false,
        message:
          passwordCheck.message ||
          "Password does not meet strength requirements",
      });
    }

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid or expired token." });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User not found." });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;
    user.resetToken = null;
    user.retriveId = uuidv4();
    await user.save();

    return res.status(200).json({
      status: true,
      message:
        "Password reset successful. You can now login with your new password.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

export const validateResetToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res
        .status(400)
        .json({ status: false, message: "Token is required." });
    }

    try {
      verifyAccessToken(token);
      return res.status(200).json({ status: true, message: "Token is valid." });
    } catch (err) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid or expired token." });
    }
  } catch (err) {
    console.error("Validate token error:", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};