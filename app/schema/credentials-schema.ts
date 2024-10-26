import { z } from "zod";

// Define email schema
export const emailSchema = z.string().email("Invalid email format");

// Define password schema (adjust the requirements as needed)
export const passwordSchema = z.string()
  .min(6, "Password must be at least 6 characters long")
  .max(20, "Password must be at most 20 characters long")
  .regex(/[a-zA-Z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");
