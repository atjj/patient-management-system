import z from "zod";
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(50, "Bug title must be at most 32 characters."),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+?[1-9]\d{1,14}$/.test(phone),
      "Invalid phone number",
    ),
});
