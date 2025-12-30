"use server";

import { deleteAuthTokenCookie } from "@/actions/utils";

export async function logoutAction() {
	deleteAuthTokenCookie();

	return { success: true };
}
