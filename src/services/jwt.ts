import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'access-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

// Payload interface
interface TokenPayload {
  id: number;
  roleName: string;
  email: string;
  roleId: number;
  retriveId: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

// Password Reset Token Payload interface
interface ResetTokenPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}


// Access Token - expires in 2 days
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' }); // 2 days
};

// Refresh Token - expires in 30 days
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
};

// Password Reset Token - expires in 1 hour
export const generatePasswordResetToken = (userId: number, email: string): string => {
  const payload: ResetTokenPayload = { id: userId, email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Verify Access Token
export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, JWT_SECRET) as TokenPayload;

// Verify Refresh Token
export const verifyRefreshToken = (token: string): TokenPayload =>
  jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;

