import { z } from "zod";

const nameSchema = z
  .string()
  .min(3)
  .regex(/^[a-zA-Z\s]*$/, {
    message: "Special characters not allowed.",
  });
const phoneSchema = z
  .string()
  .min(10)
  .regex(/^(69\d{8}|2\d{9})$/, {
    message: "Enter a valid number.",
  });
export const addRecallSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
});
