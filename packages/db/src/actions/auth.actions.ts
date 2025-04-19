import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { user } from "./../schema/auth.schema";

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user, {
  email: z.string().email(),
});

const UsersQuerySchema = z.object({
  search: z.string().optional(),
});

export const getUsersQuerySchema = UsersQuerySchema.merge(
  z.object({
    sortBy: z.enum(["createdAt", "firstName"]).optional().default("createdAt"),
    page: z.coerce.number().optional(),
  })
);

export const getUsersCountQuerySchema = UsersQuerySchema;
