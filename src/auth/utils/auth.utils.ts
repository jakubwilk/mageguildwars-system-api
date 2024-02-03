export const DEFAULT_ACCESS_OPTIONS = {
  httpOnly: true,
  expires: new Date(Date.now() + 21600000),
}

export const DEFAULT_REFRESH_OPTIONS = {
  httpOnly: true,
  expires: new Date(Date.now() + 604800000),
}
