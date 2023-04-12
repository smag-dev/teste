import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
  id: string;
}

class Token {
  generateToken(user: any) {
    //const payload = { email: user.id };
    //const accessToken = jwt.sign(payload,String(process.env.JWT_ACCESS_SECRET_KEY),{ expiresIn: "1h" });
    /* para testar expirar em 1 minuto */
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
      id: user.id,
    };
    const accessToken = jwt.sign(
      payload,
      String(process.env.JWT_ACCESS_SECRET_KEY)
    );
    return { accessToken };
  }

  validateAccessToken(token: string) {
    try {
      const userPayload = jwt.verify(
        token,
        String(process.env.JWT_ACCESS_SECRET_KEY)
      );
      return userPayload as TokenPayload;
    } catch (e) {
      return null;
    }
  }
}

export default new Token();
