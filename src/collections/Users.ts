import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `
          <div>
            <p>Click the link below to verify your email address.</p>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify your email</a>
          </div>
        `;
      },
    },
  },
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
