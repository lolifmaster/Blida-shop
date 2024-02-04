import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFile";
import { Orders } from "./collections/Orders";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders],
  routes: {
    admin: "/sell",
  },

  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Blida-Shop",
      favicon: "/favicon.ico",
      ogImage: "/og-image.jpg",
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),

  rateLimit: {
    max: 2000,
  },

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
