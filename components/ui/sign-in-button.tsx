import Link from "next/link";
import { Suspense } from "react";
import { getUserId } from "@/actions/utils";
import { Button } from "@/components/ui/button";

async function SignInButtonInner() {
	const userId = await getUserId();

	if (userId) return null;

	return (
		<div className="flex gap-2">
			<Link href="/auth/sign-up">
				<Button variant="secondary">Sign Up</Button>
			</Link>
			<Link href="/auth/login">
				<Button>Sign In</Button>
			</Link>
		</div>
	);
}

export function SignInButton() {
	return (
		<Suspense fallback={null}>
			<SignInButtonInner />
		</Suspense>
	);
}
