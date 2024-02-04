import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const router = useRouter();
  // const signOut = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );
  //     if (!res.ok) throw new Error("Failed to sign out");

  //     toast.success("Signed out successfully");

  //     router.push("/sign-in");
  //     router.refresh();
  //   } catch {
  //     toast.error("Failed to sign out. Please try again.");
  //   }
  // };
  const mutation = useMutation(
    () => {
      return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        toast.success("Signed out successfully");
        router.push("/sign-in");
        router.refresh();
      },
      onError: () => {
        toast.error("Failed to sign out. Please try again.");
      },
    },
  );

  return mutation;
};
