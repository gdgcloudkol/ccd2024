const CCD2024_BE_BASE_URL = 'https://ccd2024be-pc0d7b-qlscnb.gdgcloudkol.org';

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