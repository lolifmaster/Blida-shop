import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  apiRoute: publicProcedure.query(() => {
    return { message: "Hello, world!" };
  }),
});

export type AppRouter = typeof appRouter;
