export const getBool = (key) => import.meta.env[key] === 'true'

export const isBrowser = getBool('VITE_BROWSER_RUNTIME')
