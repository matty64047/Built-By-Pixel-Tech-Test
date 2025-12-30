import { type NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "@/actions/utils";

export async function updateSession(request: NextRequest) {
	const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;

	if (!token && !request.nextUrl.pathname.startsWith("/auth")) {
		const url = request.nextUrl.clone();
		url.pathname = "/auth/login";
		return NextResponse.redirect(url);
	}

	if (token) {
		// const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		query: `
		//       query Me {
		//         me { id }
		//       }
		//     `,
		// 	}),
		// 	cache: "no-store",
		// });
		// const json = await res.json();
		// if (json.errors || !json.data?.me) {
		// 	const url = request.nextUrl.clone();
		// 	url.pathname = "/auth/login";
		// 	const redirect = NextResponse.redirect(url);
		// 	redirect.cookies.delete(AUTH_TOKEN_COOKIE);
		// 	return redirect;
		// }
	}

	return NextResponse.next({ request });
}
