import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    create: () => true,
    read: () => true,
    update: ({ req }) => {
      if (req.user?.role === "admin") {
        return true;
      }
      return false;
    },
    delete: ({ req }) => {
      if (req.user?.role === "admin") {
        return true;
      }
      return false;
    },
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "user",
      admin: {
        condition: () => false,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
};
