import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Truck, Headset, Leaf, Smile, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Perk = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const perks: Perk[] = [
  {
    title: "Free Shipping",
    description: "We offer free shipping on all orders over $100.",
    Icon: Truck,
  },
  {
    title: "24/7 Support",
    description: "We offer 24/7 support for all of our customers.",
    Icon: Headset,
  },
  {
    title: "Money Back Guarantee",
    description: "We offer a 30 day money back guarantee on all orders.",
    Icon: Leaf,
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <h1 className="text-4xl font-bold sm:text-6xl">
            The biggest E-commerce platform on{" "}
            <span className="text-primary">Blida</span>.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            We are the biggest e-commerce platform in Blida, we offer the best
            products at the best prices.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              Shop Now &rarr;
            </Link>
          </div>
        </div>
        {/* TODO: Products List */}
      </MaxWidthWrapper>

      <Separator className="mx-auto mb-8 max-w-3xl" />

      <section className="py-2">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk, index) => (
              <div
                key={perk.title}
                className={cn(
                  "text-center md:flex md:items-center md:text-left lg:block lg:text-center",
                  {
                    "sm:max-lg:col-span-2 md:mx-auto":
                      index === perks.length - 1,
                  },
                )}
              >
                <div className="flex justify-center md:flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {<perk.Icon className="h-1/3 w-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-secondary-foreground">
                    {perk.title}
                  </h3>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
