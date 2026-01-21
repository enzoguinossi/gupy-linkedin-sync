import 'dotenv/config';

function requireEnvString(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }
  return value;
}

export const env = {
  GUPY_TOKEN: requireEnvString('GUPY_TOKEN'),
};
