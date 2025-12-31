import { cookies } from "next/headers";

export const AUTH_TOKEN_COOKIE = "auth_token";
export const USER_ID_COOKIE = "user_id";
export const AUTH_TOKEN_COOKIE_EXPIRY = "auth_token_expiry";
const SECURE = process.env.NODE_ENV === "production";

export async function setAuthTokenCookie(
	userId: string,
	authToken: string,
	authTokenExpiry: string,
) {
	(await cookies()).set({
		name: USER_ID_COOKIE,
		value: userId,
		path: "/",
		httpOnly: true,
		secure: SECURE,
		sameSite: "lax",
	});
	(await cookies()).set({
		name: AUTH_TOKEN_COOKIE,
		value: authToken,
		path: "/",
		httpOnly: true,
		secure: SECURE,
		sameSite: "lax",
	});

	(await cookies()).set({
		name: AUTH_TOKEN_COOKIE_EXPIRY,
		value: authTokenExpiry,
		path: "/",
		httpOnly: true,
		secure: SECURE,
		sameSite: "lax",
	});
}

export async function getAuthToken(): Promise<string | undefined> {
	return (await cookies()).get(AUTH_TOKEN_COOKIE)?.value;
}

export async function getUserId(): Promise<string | undefined> {
	return (await cookies()).get(USER_ID_COOKIE)?.value;
}

export async function deleteAuthTokenCookie(): Promise<boolean> {
	(await cookies()).delete(AUTH_TOKEN_COOKIE);
	(await cookies()).delete(USER_ID_COOKIE);
	(await cookies()).delete(AUTH_TOKEN_COOKIE_EXPIRY);
	return true;
}
