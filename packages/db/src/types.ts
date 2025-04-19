import type { z } from "zod";

import type {
  selectUserSchema,
  insertUserSchema,
} from "./actions/auth.actions";

export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type { PostgresError } from "postgres";
