"use client";
import { trpc } from "@/trpc/client";
import { Loader2, LogIn, XCircle } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";

type VerifyEmailProps = {
  token: string;
};

const VerifyEmail: FC<VerifyEmailProps> = ({ token }) => {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({
    token: token,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2 pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <h3 className="text-xl font-semibold">this should not take long ..</h3>
        <p className="text-sm text-muted-foreground">
          Your account being verified, please wait.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2 pt-24">
        <XCircle className="h-8 w-8 text-destructive" />
        <h3 className="text-xl font-semibold">There was an error.</h3>
        <p className="text-sm text-muted-foreground">
          Your token is invalid or has expired.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative mb-4 h-60 w-60 text-muted-foreground">
        <LogIn className="absolute h-full w-full animate-bounce text-ring" />
        <h3 className="text-xl font-semibold">Email verified</h3>
        <p className="text-muted-foreground">
          You can now log in to your account.
        </p>
        <Link
          href="/login"
          className={buttonVariants({
            className: "ml-4",
          })}
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
