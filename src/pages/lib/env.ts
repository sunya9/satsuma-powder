const requireEnv = (key: string) => {
  const value = process.env[key]
  if(!value) throw new Error(`Require env: ${key}`)
  return value
}

const loadEnv = () => {
  const url = requireEnv("GHOST_URL")
  const key = requireEnv("GHOST_KEY")
  return {
    url,
    key
  } as const
}


export const env = loadEnv()
