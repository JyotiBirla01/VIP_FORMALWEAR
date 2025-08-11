import { Router } from 'express';
import { validateLogin, validateSignup } from '../validators/validate';
import { forgotPassword, login, refreshAccessToken, resetPassword, signup, validateResetToken } from '../controllers/auth.controller';
import { facebookLogin, googleLogin } from '../controllers/socialAuth.controller';


const router = Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);


router.post("/refresh-token", refreshAccessToken);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/validate-reset-token/:token", validateResetToken)
export default router;
