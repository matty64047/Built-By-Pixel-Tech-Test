"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/logout";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
	const router = useRouter();

	const logout = async () => {
		await logoutAction();
		router.push("/auth/login");
	};

	return <Button onClick={logout}>Logout</Button>;
}
