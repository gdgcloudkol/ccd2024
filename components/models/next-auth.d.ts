import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { LoginData, UserData, UserProfileData } from "./login/datatype";

declare module "next-auth" {
    interface Session {
        params: object;
        access?: string;
        error?: "RefreshAccessTokenError"
        user: UserData;
    }

    interface User extends LoginData {

    }

}

declare module "next-auth/jwt" {
    interface JWT {
        access?: string;
        refresh?: string;
        expires_at: number;
        error?: "RefreshAccessTokenError"
        token: object;
        user: object;
    }
}

