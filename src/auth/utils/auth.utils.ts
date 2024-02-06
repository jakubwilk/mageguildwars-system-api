export const DEFAULT_REFRESH_OPTIONS = {
  httpOnly: true,
  expires: new Date(Date.now() + 604800000),
}

export const setAuthorizationHeader = (token: string) => {
  return { Authorization: `Bearer ${token}` }
}
