export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const passwordResetEmail = (
  email: string,
  resetLink: string
): EmailOptions => ({
  to: email,
  subject: "VIP Formal Wear - Password Reset",
  html: `
      <p>You requested a password reset for your VIP Formal Wear account.</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  text: `Password reset link: ${resetLink}`,
});

export const welcomeEmail = (email: string, name: string): EmailOptions => ({
  to: email,
  subject: "Welcome to VIP Formal Wear",
  html: `
      <p>Hello ${name},</p>
      <p>Welcome to VIP Formal Wear! Your account has been successfully created.</p>
      <p>Start browsing our collection of formal wear now!</p>
    `,
});

// Add more email templates as needed
