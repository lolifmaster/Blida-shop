import { cn } from "@/lib/utils";
import { Croissant, LucideProps } from "lucide-react";

export const Icons = {
  logo: ({ className, ...props }: LucideProps) => (
    <Croissant className={cn("text-primary", className)} {...props} />
  ),
};
