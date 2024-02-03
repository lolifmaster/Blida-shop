"use client";
import { cn } from "@/lib/utils";
import {
  AuthCredentials,
  AuthCredentialsValidator,
} from "@/validators/account-credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import { Mulish } from "next/font/google";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation();

  const submit = ({ email, password }: AuthCredentials) => {
    mutate({ email, password });
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
          </div>

          <Button>Sign up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
