import jwt from "jsonwebtoken";
//eslint-disable-next-line

export async function createToken(username: string): Promise<any> {
  const secret: any = process.env.JWT_KEY;
  const token = jwt.sign({ username }, secret);
  return token;
}
