import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import Cart from "./Cart";
import { Icons } from "./Icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import UserAccountNav from "./UserAccountNav";

const NavBar = async () => {
  const nextCookies = cookies();
  const data = await getServerSideUser(nextCookies);
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-background">
      <header className="relative ">
        <MaxWidthWrapper>
          <div className="border-b border-border">
            <div className="flex h-16 items-center">
              {/* TODO: mobile navbar */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-8 w-8" />
                </Link>
              </div>

              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden flex-1 items-center justify-end space-x-6 lg:flex">
                  {data?.user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign In
                    </Link>
                  )}
                  {data?.user ? null : (
                    <Separator
                      orientation="vertical"
                      className="h-6"
                      aria-hidden="true"
                    />
                  )}

                  {data?.user ? (
                    <UserAccountNav user={data?.user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign Up
                    </Link>
                  )}

                  {data?.user ? (
                    <Separator
                      orientation="vertical"
                      className="h-6"
                      aria-hidden="true"
                    />
                  ) : null}

                  {data?.user ? null : (
                    <div className="flex lg:ml-6">
                      <Separator
                        orientation="vertical"
                        className="h-6"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default NavBar;
