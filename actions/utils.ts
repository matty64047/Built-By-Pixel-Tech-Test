import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const AUTH_TOKEN_COOKIE = "auth_token";
const SECURE = process.env.NODE_ENV === "production";

export async function setAuthTokenCookie(authToken: string) {
	(await cookies()).set({
		name: AUTH_TOKEN_COOKIE,
		value: authToken,
		path: "/",
		httpOnly: true,
		secure: SECURE,
		sameSite: "lax",
	});
}

export async function getAuthToken(): Promise<string | undefined> {
	return (await cookies()).get(AUTH_TOKEN_COOKIE)?.value;
}

export async function getUserId() {
	const token = await getAuthToken();
	if (token) {
		const decoded = jwt.decode(token);
		return decoded.data._id;
	}
}

export async function deleteAuthTokenCookie() {
	(await cookies()).delete(AUTH_TOKEN_COOKIE);
}
