import { Icons } from "@/components/Icons";
import SignUpForm from "@/components/SignUpForm";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-pretty text-2xl font-bold">
            Create an account to get started
          </h1>

          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "link",
              className: "group",
            })}
          >
            Have an account? Sign in
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
