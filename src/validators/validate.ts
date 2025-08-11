import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

// Generic validator wrapper
const validate = (rules: ValidationChain[]) => [
  ...rules,
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateSignup = validate([
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isString().withMessage("Password must be a string")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match")
       .isString().withMessage("Password must be a string"),
    body("roleId")
    .notEmpty()
    .withMessage("Role Id is required")
    .isInt({ min: 1 })
    .withMessage("Role Id must be a integer"),
]);

export const validateLogin = validate([
  body("email").isEmail().withMessage("Valid email is required"),
 body("password")
    .isString().withMessage("Password must be a string")
    .notEmpty().withMessage("Password is required"),
]);


// ✅ Refresh token validation
export const validateRefreshToken = validate([
  body("refreshToken")
    .isString().withMessage("Refresh token must be a string")
    .notEmpty().withMessage("Refresh token is required"),
]);

// ✅ Forgot password validation
export const validateForgotPassword = validate([
  body("email").isEmail().withMessage("Valid email is required"),
]);

// ✅ Reset password validation
export const validateResetPassword = validate([
  body("token")
    .isString().withMessage("Token must be a string")
    .notEmpty().withMessage("Token is required"),
  body("newPassword")
    .isString().withMessage("New password must be a string")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .isString().withMessage("Confirm password must be a string")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Passwords must match"),
]);

// ✅ Validate token param (for GET)
// export const validateTokenParam = validate([
//   param("token")
//     .isString().withMessage("Token must be a string")
//     .notEmpty().withMessage("Token is required"),
// ]);