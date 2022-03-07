export const env = {
  url: process.env.GHOST_URL!,
  key: process.env.GHOST_KEY!,
  adminKey: process.env.GHOST_ADMIN_KEY!,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
} as const;
