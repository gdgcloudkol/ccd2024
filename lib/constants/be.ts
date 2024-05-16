const CCD2024_BE_BASE_URL = process.env.API_BASE_URL;

export const SIGNNUP_DJANGO_URL = CCD2024_BE_BASE_URL + '/auth/registration/';
export const LOGIN_DJANGO_URL = CCD2024_BE_BASE_URL + '/auth/login/';
export const VERITY_EMAIL_DJANGO_URL = CCD2024_BE_BASE_URL + '/account-confirm-email/';
export const FORGOT_PASSWORD_DJANGO_URL = CCD2024_BE_BASE_URL + '/forgot';
export const RESET_PASSWORD_DJANGO_URL = CCD2024_BE_BASE_URL + '/auth/password/reset/confirm';
export const VERIFY_AUTH_DJANGO_URL = CCD2024_BE_BASE_URL + "/verify"
export const RESEND_DJANGO_URL = CCD2024_BE_BASE_URL + "/resend"
export const REFRESH_TOKEN_DJANGO_URL = CCD2024_BE_BASE_URL + "/token/refresh"
export const AUTH_USERS_DJANGO_URL = CCD2024_BE_BASE_URL + "/auth/user"
export const USERS_DJANGO_URL = CCD2024_BE_BASE_URL + "/users/profile/"


export const EVENTS_DJANGO_URL = CCD2024_BE_BASE_URL + "/events/"
export const EVENT_ATTENDEE_LIST_URL_SUFFIX = "/attendees/" //+param+suffix



export const ATTENDEES_DJANGO_URL = CCD2024_BE_BASE_URL + "/attendees/"
export const EVENT_ATTENDEE_UPDATE_URL_SUFFIX = "/update_status/" //+param+suffix
export const EVENT_ATTENDEE_INFORM_URL_SUFFIX = "/inform/"
export const EVENT_ATTENDEE_INFORM_ALL_URL = ATTENDEES_DJANGO_URL + "inform_all/"