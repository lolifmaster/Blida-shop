"use client";
import { trpc } from "@/trpc/client";
import { Check, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

type VerifyEmailProps = {
  token: string;
};

const VerifyEmail: FC<VerifyEmailProps> = ({ token }) => {
  const router = useRouter();
  const { isError, isLoading } = trpc.auth.verifyEmail.useQuery(
    {
      token: token,
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      },
    },
  );

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
    <div className="flex flex-col items-center gap-2 pt-24">
      <Check className="h-8 w-8 text-primary" />
      <h3 className="text-xl font-semibold">Email verified!</h3>
      <p className="text-sm text-muted-foreground">
        Well done! You are now ready to login ...
      </p>
    </div>
  );
};

export default VerifyEmail;
