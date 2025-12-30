import { cookies } from "next/headers";

export const AUTH_TOKEN_COOKIE = "auth_token";
export const AUTH_TOKEN_COOKIE_EXPIRY = "auth_token_expiry";
const SECURE = process.env.NODE_ENV === "production";

export async function setAuthTokenCookie(
	authToken: string,
	authTokenExpiry: string,
) {
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

export async function getAuthTokenCookie(): Promise<string | undefined> {
	return (await cookies()).get(AUTH_TOKEN_COOKIE)?.value;
}

export async function deleteAuthTokenCookie(): Promise<boolean> {
	await setAuthTokenCookie("", "");
	return true;
}
