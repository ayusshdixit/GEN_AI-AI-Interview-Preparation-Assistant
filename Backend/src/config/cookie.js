const isProd = process.env.NODE_ENV === "production"

/**
 * Cookie options for the auth token.
 * In production the frontend (GitHub Pages) and backend (Render) are on different
 * sites, so the cookie must be SameSite=None and Secure.
 */
const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
}

module.exports = cookieOptions