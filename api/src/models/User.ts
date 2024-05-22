import crypto from 'crypto'
import { getRandomBytes } from '../utils'


export class User {
  static async encodePassword(rawPassword: string): Promise<string> {
    const salt = await getRandomBytes(32)
    const hashedPassword = await User.hashPassword(rawPassword, salt)


    // ### warning, hashedPassword is a buffer, not sure if this is the correct way to save to db
    return `${salt}:${hashedPassword}`
  }

  static decodePassword(encodedPassword: string): { salt: any, hashedPassword: string } {
    const [salt, hashedPassword] = encodedPassword.split(':')

    return {
      salt,
      hashedPassword
    }
  }

  static hashPassword(rawPassword: string, salt: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(rawPassword, salt, 5000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { 
          reject(err)
        }
  
        resolve(hashedPassword)
      });
    })
  }
}