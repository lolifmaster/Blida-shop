import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
const port = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.use((req, res) => nextHandler(req, res, payload));

  nextApp.prepare().then(() => {
    // payload.logger.info("Next.js server is running");

    app.listen(port, () => {
      // payload.logger.info(
      //   `Server is running on ${process.env.NEXT_PUBLIC_SERVER_URL}`,
      // );
    });
  });
};

start();
