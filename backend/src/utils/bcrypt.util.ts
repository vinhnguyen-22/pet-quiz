import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hash(password: string): Promise<any> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function compare(
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

export function generateAccessToken(payload: any) {
  const secretKey = process.env.JWT_SECRET || "74YLbq4%c!wU ";
  const expiresIn = process.env.JWT_EXPIRATION_TIME + "s";
  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
}

export function generateRefreshToken(payload: any) {
  const secretKeyRefreshToken =
    process.env.JWT_REFRESH_TOKEN_SECRET || "7jML9q4-c!s0";
  const expiresInForRefreshToken = 86400 + "s";
  return jwt.sign(payload, secretKeyRefreshToken, { expiresIn: "3d" });
}

export function verify(token: string): any {
  const secretKey = process.env.JWT_SECRET || "74YLbq4%c!wU ";
  return jwt.verify(token, secretKey);
}

export function getUserNameByToken(token: string): string {
  const decoded: any = jwt.decode(token);
  return decoded.username;
}
