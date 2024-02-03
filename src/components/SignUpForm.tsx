"use client";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import {
  AuthCredentials,
  AuthCredentialsValidator,
} from "@/validators/account-credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(AuthCredentialsValidator),
    mode: "onChange",
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        toast.error(error.message);
        return;
      }
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
      toast.error("Something went wrong. Please try again later.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const submit = ({ email, password }: AuthCredentials) => {
    mutate({ email, password });
  };
  console.log(errors);
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
    </div>
  );
};

export default SignUpForm;
