import { type NextRequest, NextResponse } from "next/server";
import {
	AUTH_TOKEN_COOKIE,
	AUTH_TOKEN_COOKIE_EXPIRY,
	USER_ID_COOKIE,
} from "@/actions/utils";

export async function updateSession(request: NextRequest) {
	const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
	const user_id = request.cookies.get(USER_ID_COOKIE)?.value;

	if (
		request.nextUrl.pathname !== "/tasks" &&
		request.nextUrl.pathname !== "/" &&
		!token &&
		!request.nextUrl.pathname.startsWith("/auth")
	) {
		const url = request.nextUrl.clone();
		url.pathname = "/auth/login";
		return NextResponse.redirect(url);
	}

	if (token) {
		const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				query: `
          query TaskList($userId: ID) {
            getUserTasks(user_id: $userId) {
              title
            }
          }
        `,
				variables: {
					userId: user_id,
				},
			}),
			cache: "no-store",
		});

		const json = await res.json();

		if (json.errors) {
			const url = request.nextUrl.clone();
			url.pathname = "/auth/login";
			const redirect = NextResponse.redirect(url);
			redirect.cookies.delete(USER_ID_COOKIE);
			redirect.cookies.delete(AUTH_TOKEN_COOKIE);
			redirect.cookies.delete(AUTH_TOKEN_COOKIE_EXPIRY);
			return redirect;
		}
	}

	return NextResponse.next({ request });
}
