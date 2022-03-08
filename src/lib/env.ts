const getEnvValue = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Must set environment variable. key: ${key}`);
  return value;
};

export const env = {
  url: getEnvValue("GHOST_URL"),
  key: getEnvValue("GHOST_KEY"),
  adminKey: getEnvValue("GHOST_ADMIN_KEY"),
  gaId: process.env.NEXT_PUBLIC_GA_ID,
} as const;
