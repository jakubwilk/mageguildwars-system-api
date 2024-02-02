export const getEnvVariable = (variable: string | undefined): string => {
  return process.env[variable as string] || ''
}
