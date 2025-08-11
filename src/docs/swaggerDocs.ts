/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication, OTP, and user account related APIs
 */


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summasry: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - roleId
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "Pass@123"
 *               confirmPassword:
 *                 type: string
 *                 example: "Pass@123"
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get access & refresh tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "Pass@123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5c..."
 *                 refreshToken:
 *                   type: string
 *                   example: "dGhpc2lzbXlyZWZyZXNodG9rZW4="
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "dGhpc2lzbXlyZWZyZXNodG9rZW4="
 *     responses:
 *       200:
 *         description: Access token refreshed
 *       401:
 *         description: Refresh token required
 *       403:
 *         description: Invalid refresh token
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset link to user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *     responses:
 *       200:
 *         description: Email sent if account exists
 *       500:
 *         description: Failed to send email
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: "reset-token-example"
 *               newPassword:
 *                 type: string
 *                 example: "NewPass@123"
 *               confirmPassword:
 *                 type: string
 *                 example: "NewPass@123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or mismatched passwords
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/validate-reset-token/{token}:
 *   get:
 *     summary: Validate password reset token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token to validate
 *     responses:
 *       200:
 *         description: Token is valid
 *       400:
 *         description: Token invalid or expired
 */
