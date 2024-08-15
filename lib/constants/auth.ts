import { NEXT_API_BASE_URL } from "./generic"

// Components url
export const LOGIN_URL = "/login"
export const SIGNUP_URL = "/signup"
export const LOGOUT_URL = "/logout"
export const VERIFY_ACCOUNT_URL = "/verify"
export const FORGOT_PASSWORD_URL = "/forgot"
export const RESET_PASSWORD_URL = "/reset"

// API urls
export const AUTH_BASE_URL = "/auth"
export const AUTH_API_BASE_URL = NEXT_API_BASE_URL + AUTH_BASE_URL
export const SIGNUP_API = AUTH_API_BASE_URL + "/signup"
export const AUTH_LOGIN_URL = AUTH_BASE_URL + "/login/"
export const RESET_API = AUTH_API_BASE_URL + "/reset"
export const FORGOT_API = AUTH_API_BASE_URL + "/forgot"
export const VERIFY_API = AUTH_API_BASE_URL + "/verify"
export const RESEND_API = AUTH_API_BASE_URL + "/resend"
export const AUTH_REFRESH_TOKEN_URL = AUTH_BASE_URL + "/token/refresh/"

export const AuthRoles = {

    superadmin: "superadmin",
    organizer: "organizer",
    volunteer: "volunteer",
    Xorganizer: "x-organizer",
    Xvolunteer: "x-volunteer",
    xsubOrganizer: "x-sub-organizer",
    attendee: "attendee"
}

export const GameTypes = {
    'odd_one_out': 'Odd One Out',
    'geo_artwork': 'Geo Artwork',
    'guess_the_art': 'Guess the Art'
}