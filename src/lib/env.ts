const getEnvValue = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Must set environment variable. key: ${key}`);
  return value;
};

export const env = {
  get url() {
    return getEnvValue("GHOST_URL");
  },
  get key() {
    return getEnvValue("GHOST_KEY");
  },
  get adminKey() {
    return getEnvValue("GHOST_ADMIN_KEY");
  },
  get gaId() {
    return process.env.NEXT_PUBLIC_GA_ID || "";
  },
} as const;
