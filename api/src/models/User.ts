import crypto from "crypto";
import { getRandomBytes } from "../utils";

export class User {
  static async encodePassword(rawPassword: string): Promise<string> {
    const salt = "crypto_salt";
    const hashedPassword = await User.hashPassword(rawPassword, salt);

    const hashedPasswordString = hashedPassword.toString("utf-8");

    return `${salt}:${hashedPasswordString}`;
  }

  static decodePassword(encodedPassword: string): {
    salt: any;
    hashedPassword: string;
  } {
    const [salt, hashedPassword] = encodedPassword.split(":");

    return {
      salt,
      hashedPassword,
    };
  }

  static hashPassword(rawPassword: string, salt: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        rawPassword,
        salt,
        5000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            reject(err);
          }

          resolve(hashedPassword);
        }
      );
    });
  }
}
