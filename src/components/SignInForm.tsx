"use client";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import {
  AuthCredentials,
  AuthCredentialsValidator,
} from "@/validators/account-credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(AuthCredentialsValidator),
    mode: "onChange",
  });

  const { mutate: SignIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Welcome back!");
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/seller");
        return;
      }

      router.push("/");
    },

    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password");
        return;
      }

      toast.error("Something went wrong");
    },
  });

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsCustomer = () => {
    router.replace("/sign-in", undefined);
  };

  const submit = ({ email, password }: AuthCredentials) => {
    SignIn({ email, password });
  };
  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              className={cn({
                "focus-visible:ring-red-500": true,
              })}
              placeholder="Type your email"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              className={cn({
                "focus-visible:ring-red-500": true,
              })}
              placeholder="Type your password"
            />
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button disabled={isLoading}>Sign up</Button>
        </div>
      </form>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      {isSeller ? (
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={continueAsCustomer}
        >
          continue as a customer
        </Button>
      ) : (
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={continueAsSeller}
        >
          continue as a seller
        </Button>
      )}
    </div>
  );
};

export default SignUpForm;
