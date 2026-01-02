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

export async function getUserId(): Promise<string | null> {
	const token = await getAuthToken();
	if (!token) return null;

	try {
		const decoded = jwt.decode(token);
		if (decoded && typeof decoded === "object" && "data" in decoded) {
			const data = (decoded as any).data;
			if (data && typeof data === "object" && "_id" in data) {
				return data._id as string;
			}
		}
	} catch (err) {
		console.error("Failed to decode JWT:", err);
	}

	return null;
}

export async function deleteAuthTokenCookie() {
	(await cookies()).delete(AUTH_TOKEN_COOKIE);
}
