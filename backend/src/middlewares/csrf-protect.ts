import { doubleCsrf } from 'csrf-csrf'
import { CSRF_SECRET, CSRF_COOKIE_NAME } from '../config'

export const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } =
    doubleCsrf({
        getSecret: () => CSRF_SECRET,
        cookieName: CSRF_COOKIE_NAME,
        cookieOptions: { sameSite: false, secure: false }, // not ideal for production, development only
    })
