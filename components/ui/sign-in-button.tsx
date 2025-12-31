import { Button, type ButtonProps } from "@/components/ui/button";
import { getUserId } from "@/actions/utils";
import Link from "next/link";

interface SignInButtonProps extends ButtonProps {}

export async function SignInButton(props: SignInButtonProps) {
  const userId = await getUserId();
  if (!userId) {
    return (
      <Link  className="ml-auto" href="/auth/login" passHref>
        <Button {...props}>Sign In</ Button>
      </Link>
    );
  }
  return null;
}