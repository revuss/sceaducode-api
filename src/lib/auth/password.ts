import bcrypt from 'bcryptjs'; // Notice: default import
const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  if (!password.trim()) {
    throw new Error('Password is required');
  }

  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  if (!plainPassword?.trim()) {
    throw new Error('Password is required');
  }

  if (!hashedPassword?.trim()) {
    throw new Error('Hashed password is required');
  }

  return await bcrypt.compare(plainPassword, hashedPassword);
}
