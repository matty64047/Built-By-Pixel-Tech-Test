import Link from "next/link";
import { Suspense } from "react";
import { getUserId } from "@/actions/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

interface SignInButtonProps extends ButtonProps {}

async function SignInButtonInner(props: SignInButtonProps) {
	const userId = await getUserId();

	if (userId) return null;

	return (
		<Link className="ml-auto" href="/auth/login">
			<Button {...props}>Sign In</Button>
		</Link>
	);
}

export function SignInButton(props: SignInButtonProps) {
	return (
		<Suspense fallback={null}>
			<SignInButtonInner {...props} />
		</Suspense>
	);
}
