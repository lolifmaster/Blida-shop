import { CollectionConfig } from "payload/types";
import { User } from "../payload-types";

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user?.role !== "admin",
  },
  upload: {
    staticDir: "/product_files",
    staticURL: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  access: {
    read: async ({ req }) => {
      const user = req.user as User;
      if (!req.user) return false;
      if (user.role === "admin") return true;
      const { docs: products } = await req.payload.find({
        collection: "products",
        depth: 0,
        where: {
          user: {
            equals: user.id,
          },
        },
      });

      const ownProductFileIds = products
        .map((product) => product.product_files)
        .flat();

      const { docs: orders } = await req.payload.find({
        collection: "orders",
        depth: 0,
        where: {
          user: {
            equals: user.id,
          },
        },
      });

      const purchasedProductFileIds = orders
        .map((order) => {
          return order.products.map((product) => {
            if (typeof product === "string")
              return req.payload.logger.error(
                "Expected product to be an object",
              );
            return typeof product.product_files === "string"
              ? product.product_files
              : product.product_files.id;
          });
        })
        .flat();

      return {
        id: {
          in: [...ownProductFileIds, ...purchasedProductFileIds],
        },
      };
    },
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: {
        condition: () => false,
      },
      required: true,
    },
  ],
};
