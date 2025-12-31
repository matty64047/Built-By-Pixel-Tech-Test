"use server";

import { deleteAuthTokenCookie } from "@/actions/utils";

export async function logoutAction() {
	await deleteAuthTokenCookie();
	return { success: true };
}
