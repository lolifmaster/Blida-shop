import { Icons } from "@/components/Icons";
import SignInForm from "@/components/SignInForm";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  as?: string;
  origin?: string;
};

const page = () => {
  return (
    <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-pretty text-2xl font-bold">
            Log in to your account
          </h1>

          <Link
            href="/sign-up"
            className={buttonVariants({
              variant: "link",
              className: "group",
            })}
          >
            Don&apos;t have an account? Sign up
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default page;
