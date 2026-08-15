import jwt from "jsonwebtoken";
//eslint-disable-next-line

export async function createToken(username: string): Promise<any> {
  const secret: any = process.env.JWT_KEY;
  // Los tokens deben caducar: sin expiresIn quedan válidos indefinidamente.
  const token = jwt.sign({ username }, secret, { expiresIn: "8h" });
  return token;
}
