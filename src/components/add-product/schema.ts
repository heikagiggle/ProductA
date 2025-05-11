import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty("Product title is required"),
  description: z.string().nonempty("Product description is required"),
  images: z.array(z.string()).optional(),
  price: z.string(),
  discount: z.string().nullable().optional(),
  stock: z.string().optional(),
  variants: z
    .array(
      z.object({
        size: z.enum(["Small", "Medium", "Large"]),
        color: z.enum(["red", "white", "black"]),
        additionalPrice: z
          .number()
          .min(0, "Additional price must be a non-negative number"),
      })
    )
    .min(1, "Add at least one variant"),
});

export type ProductData = z.infer<typeof ProductSchema>;
